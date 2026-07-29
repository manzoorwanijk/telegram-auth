# Migrating off `@telegram-auth/*` to Telegram's OpenID Connect login

`@telegram-auth/react` and `@telegram-auth/server` are **deprecated** in favour of Telegram's [OpenID Connect login](https://core.telegram.org/bots/telegram-login). These packages wrap the iframe-based [Telegram Login Widget](https://core.telegram.org/widgets/login) and its bespoke data validation; the OIDC flow supersedes both.

Because Telegram now speaks plain OIDC, there is nothing left for these packages to do. The bespoke HMAC-over-a-sorted-key-list validation that `AuthDataValidator` existed to provide is replaced by a standard signed ID token.

The examples below use `fetch`, the Web Crypto API, and [`jose`](https://github.com/panva/jose) for the JWT verification:

```sh
npm install jose
```

Any JWKS-aware JWT library will do — `jose` is used here because it works across Node, edge runtimes and workers. Check your chosen library's own runtime requirements.

> [!IMPORTANT]
>
> **Mini App (`initData`) validation is _not_ covered by OIDC.** If you use `AuthDataValidator` to validate [data received via a Telegram Web App](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app) (the `user`/`hash` payload from `window.Telegram.WebApp.initData`), OIDC does not replace it — it is a different mechanism for a different surface. See [Mini Apps are not affected](#mini-apps-are-not-affected) below.

---

## Contents

- [What changes](#what-changes)
- [1. Get OIDC credentials from BotFather](#1-get-oidc-credentials-from-botfather)
- [2. Replace `<LoginButton />`](#2-replace-loginbutton-)
- [3. Replace `AuthDataValidator`](#3-replace-authdatavalidator)
- [4. Wiring it up](#4-wiring-it-up)
  - [Using an existing auth framework](#using-an-existing-auth-framework)
  - [Rolling it yourself](#rolling-it-yourself)
- [5. Map the old user fields to the new claims](#5-map-the-old-user-fields-to-the-new-claims)
- [Mini Apps are not affected](#mini-apps-are-not-affected)
- [Reference: endpoints and parameters](#reference-endpoints-and-parameters)

---

## What changes

| Legacy (these packages)                                        | Telegram OIDC                                                     |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| `<LoginButton botUsername="..." />` renders a Telegram iframe  | Telegram's login library, or your own button → redirect flow      |
| Identified by **bot username**                                 | Identified by **Client ID** + **Client Secret** (from BotFather)  |
| Auth data arrives as query params / a JS callback              | An **ID token (JWT)**, via the login library or a redirect `code` |
| `AuthDataValidator` recomputes an HMAC over sorted `key=value` | Verify the ID token's signature against Telegram's published keys |
| Trust anchor is your **bot token**                             | Trust anchor is Telegram's **JWKS**                               |
| Freshness via `auth_date` + `inValidateDataAfter`              | Freshness via standard `exp` / `iat` claims                       |
| Third-party iframe, no CSRF protection of its own              | Authorization Code Flow with **PKCE** (`S256`) + `state`          |

The practical upshot: you delete both dependencies, and either hand the flow to an auth framework you already run or implement the two routes in section 4 yourself.

## 1. Get OIDC credentials from BotFather

1. Open [@BotFather](https://t.me/BotFather).
2. `/mybots` → pick your bot → **Bot Settings** → **Web Login**.
3. Add every redirect URI your app will use (including local dev, e.g. `http://localhost:3000/auth/telegram/callback`). Telegram only redirects to registered URIs.
4. Copy the **Client ID** and **Client Secret** from that screen.

Then swap your environment variables:

```diff
-BOT_USERNAME=my_login_bot
-BOT_TOKEN=123456:AA...
+TELEGRAM_CLIENT_ID=123456
+TELEGRAM_CLIENT_SECRET=...
```

Keep `BOT_TOKEN` only if you still call the Bot API or validate Mini App `initData`; it is no longer part of the login flow.

## 2. Replace `<LoginButton />`

You have two options, and which one you want depends on how much of the flow you need to control.

### Option A — Telegram's own login library

Telegram ships a JS library that opens a login popup and hands you back an OIDC `id_token`. This is the closest analogue to `<LoginButton />`, and Telegram provides a customisation tool for the button itself. See [the login library docs](https://core.telegram.org/bots/telegram-login) for the script tag and button customiser.

```ts
/* `nonce` must come from your server: a random, single-use value it remembers,
   so it can check the `nonce` claim on the token it gets back. */
Telegram.Login.auth({ client_id: TELEGRAM_CLIENT_ID, scope: ['profile'], nonce }, (data) => {
	if (!data || !data.id_token) {
		return; // user dismissed the popup, or an error occurred
	}

	// Send `data.id_token` to your server and verify it there — see section 3.
});
```

The available methods are `Telegram.Login.init(options, callback)`, `Telegram.Login.open(callback)` and `Telegram.Login.auth(options, callback)`. `options` takes `client_id`, and optionally `scope` (`profile`, `phone`, `write`), `lang` and `nonce`.

> [!IMPORTANT]
>
> The token arrives in the browser, so it must still be verified server-side before you trust it — the same rule that applied to the old widget's callback data. Verify the `nonce` claim against the value your server issued, or a token obtained for another site can be replayed against yours.

### Option B — redirect flow

If you want the token never to touch the browser, use the standard Authorization Code flow: your button becomes an ordinary link to a route on your own server.

```diff
-import { LoginButton } from '@telegram-auth/react';
-
 export function TelegramLogin() {
-    return (
-        <LoginButton
-            botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME!}
-            onAuthCallback={(data) => {
-                // POST the data to your backend to validate it
-            }}
-        />
-    );
+    return <a href="/auth/telegram">Log in with Telegram</a>;
 }
```

Here the client never receives the user data at all — it arrives server-side at your callback route. Section 4 covers the two routes this needs.

Either way, the `buttonSize`, `cornerRadius`, `showAvatar` and `widgetVersion` props do not carry over; use Telegram's button customiser or style your own. `lang` has an equivalent in the login library's `lang` option.

## 3. Replace `AuthDataValidator`

Old: verify an HMAC over the query params, keyed by `sha256(botToken)`.

```ts
// before
import { AuthDataValidator } from '@telegram-auth/server';
import { urlStrToAuthDataMap } from '@telegram-auth/server/utils';

const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN });
const user = await validator.validate(urlStrToAuthDataMap(request.url));
```

New: exchange the authorization code for an ID token, then verify that token against Telegram's JWKS.

> [!NOTE]
>
> The snippets below show the shape of the flow, not a finished implementation. They leave out error handling, configuration validation, session management and storage — fill those in to your own standards, or let a library do it (see [section 4](#4-wiring-it-up)).

### Exchange the code for an ID token

The token endpoint authenticates your client with HTTP Basic. Telegram's documented request also carries `client_id` in the form body, so send both.

```ts
const ISSUER = 'https://oauth.telegram.org';

const res = await fetch(`${ISSUER}/token`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
	},
	body: new URLSearchParams({
		grant_type: 'authorization_code',
		code,
		redirect_uri: REDIRECT_URI,
		client_id: CLIENT_ID,
		code_verifier: codeVerifier, // the PKCE verifier you stashed before redirecting
	}),
});

const { id_token } = await res.json();
```

### Verify the ID token

This is the part that replaces `validate()`. Telegram has **no UserInfo endpoint** — the ID token is the whole profile, so there is no second request to make.

```ts
import * as jose from 'jose';

// Resolves and caches Telegram's signing keys.
const jwks = jose.createRemoteJWKSet(new URL(`${ISSUER}/.well-known/jwks.json`));

const { payload: user } = await jose.jwtVerify(id_token, jwks, {
	issuer: ISSUER,
	audience: CLIENT_ID, // your Bot ID
	/* RS256 is Telegram's default. If you changed it under
	   Login Widget > Advanced in @BotFather, list that instead. */
	algorithms: ['RS256'],
	requiredClaims: ['exp'],
});
```

That one call covers everything `AuthDataValidator` did, and the parts you previously had to write yourself: the signature check replaces the HMAC comparison, `issuer`/`audience` replace assertions you wrote by hand, and `exp` replaces `inValidateDataAfter`. `jwtVerify` throws on any failure, so a returned payload is a verified one.

Pass those options explicitly — `jose` only enforces what you ask it to. In particular `audience: undefined` skips the audience check rather than failing, so make sure that value is actually set, and `exp` is only enforced when present, hence `requiredClaims`.

If you used the login library from [option A](#option-a--telegrams-own-login-library), also check the `nonce` claim against the value your server issued, and reject the token if it does not match or has already been used.

## 4. Wiring it up

### Using an existing auth framework

If you already run an auth framework or identity provider, you probably need none of section 3's code. Most of them accept a generic OIDC provider configured with an issuer URL plus a client ID and secret, then handle discovery, PKCE, `state`, the token exchange and JWT verification for you. Consult your framework's own documentation for how to register one, and give it the values from the [reference table](#reference-endpoints-and-parameters) below.

Whatever callback URI the framework uses must be registered with BotFather (see section 1).

### Rolling it yourself

Two routes. The first builds the authorization URL and redirects to it:

```ts
import { base64url } from 'jose';

const verifier = base64url.encode(crypto.getRandomValues(new Uint8Array(32)));
const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier));
const state = base64url.encode(crypto.getRandomValues(new Uint8Array(16)));

const url = new URL(`${ISSUER}/auth`);
url.search = new URLSearchParams({
	response_type: 'code',
	client_id: CLIENT_ID,
	redirect_uri: REDIRECT_URI,
	scope: 'openid profile',
	state,
	code_challenge: base64url.encode(new Uint8Array(digest)),
	code_challenge_method: 'S256',
}).toString();

// Store `verifier` and `state`, then redirect the user to `url`.
```

The second handles Telegram's redirect back: read `code` and `state` from the query string, confirm `state` matches what you stored, then run the exchange and verification from [section 3](#3-replace-authdatavalidator) using the stored `verifier`.

A few things the sketch above leaves to you, all of which matter:

- **Store `verifier` and `state` server-side**, keyed to the browser session, and make them single-use — read and delete them together when the callback arrives.
- **Compare `state` before doing anything else.** It is the CSRF defence the legacy widget never had; check it before spending a token exchange on the request.
- **Give the pending login a short expiry** so an abandoned attempt cannot be completed later.

This is exactly the bookkeeping an OIDC library already does, which is why the previous section is the easier road unless you have a reason to avoid the dependency.

## 5. Map the old user fields to the new claims

`validate()` returned a `TelegramUserData`-shaped object. The ID token payload uses standard OIDC claim names:

| Legacy field | ID token claim                          | Notes                                                |
| ------------ | --------------------------------------- | ---------------------------------------------------- |
| `id`         | `sub` (also mirrored as `id`)           | Prefer `sub` — it is the standard subject identifier |
| `first_name` | `given_name`                            | `profile` scope                                      |
| `last_name`  | `family_name`                           | `profile` scope                                      |
| —            | `name`                                  | Full name; `profile` scope                           |
| `username`   | `preferred_username`                    | `profile` scope                                      |
| `photo_url`  | `picture`                               | `profile` scope                                      |
| `auth_date`  | `iat`                                   | Issued-at timestamp                                  |
| `hash`       | — (the JWT signature replaces it)       | Verified against the JWKS, not recomputed            |
| —            | `phone_number`, `phone_number_verified` | `phone` scope; requires explicit user consent        |

If you store Telegram IDs, note that `sub` is a string while the legacy `id` was a number — normalise on one before comparing against existing rows.

## Mini Apps are not affected

`AuthDataValidator` handled two unrelated things, and only one of them is superseded:

- **Login Widget data** (`id`, `auth_date`, `hash` query params) → replaced by OIDC, as above.
- **Mini App / Web App `initData`** (`user`, `hash`, keyed with `HMAC("WebAppData", botToken)`) → **not replaced.** Telegram's OIDC provider is for web sign-in; Mini Apps still hand your server a signed `initData` string to validate.

If you validate `initData`, follow the procedure in [Telegram's Mini Apps docs](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app). You will still need `BOT_TOKEN` for that path.

## Reference: endpoints and parameters

| Item                | Value                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Discovery           | `https://oauth.telegram.org/.well-known/openid-configuration`                                                                      |
| Issuer (`iss`)      | `https://oauth.telegram.org`                                                                                                       |
| Authorization       | `https://oauth.telegram.org/auth`                                                                                                  |
| Token               | `https://oauth.telegram.org/token`                                                                                                 |
| JWKS                | `https://oauth.telegram.org/.well-known/jwks.json`                                                                                 |
| UserInfo            | none — Telegram does not provide one                                                                                               |
| Response type       | `code`                                                                                                                             |
| PKCE method         | `S256`                                                                                                                             |
| Client auth (token) | HTTP Basic, `base64(client_id:client_secret)`                                                                                      |
| Audience (`aud`)    | your Bot ID                                                                                                                        |
| Signing algorithms  | `RS256` (default), `ES256`; `EdDSA` and `ES256K` for `openid` scope only. Configurable under Login Widget > Advanced in @BotFather |
| Scopes              | `openid` (required), `profile`, `phone`, `telegram:bot_access`                                                                     |

The examples above pin `RS256` and hardcode the endpoints for clarity. Reading them from the discovery document instead keeps you correct if Telegram moves anything.

Full details: [core.telegram.org/bots/telegram-login](https://core.telegram.org/bots/telegram-login).
