# Telegram Auth

> [!WARNING]
>
> **Deprecated and unmaintained. This repository is archived.**
>
> These packages are deprecated in favour of Telegram's [OpenID Connect login](https://core.telegram.org/bots/telegram-login). Because Telegram now speaks plain OIDC, any OIDC client can talk to it directly — there is nothing left for `@telegram-auth/react` and `@telegram-auth/server` to do.
>
> **→ [Migration guide](./MIGRATION.md)**
>
> No further releases, bug fixes, or security updates will be published. Issues and pull requests are closed. Existing versions stay on npm so current installs keep working.

This was a mono-repo for the `@telegram-auth/*` packages:

- [`@telegram-auth/react`](./packages/react) - React component for the [Telegram Login Widget](https://core.telegram.org/widgets/login).
- [`@telegram-auth/server`](./packages/server) - TS/JS class to validate the data received from Telegram Login Widget.

## Where to go instead

| If you were using…                     | Use instead                                                                                                                                                                                       |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@telegram-auth/react` `<LoginButton>` | Telegram's login library, or your own button + an OIDC redirect — see [MIGRATION.md](./MIGRATION.md#2-replace-loginbutton-)                                                                       |
| `@telegram-auth/server` for login data | Verify the OIDC ID token — see [MIGRATION.md](./MIGRATION.md#3-replace-authdatavalidator)                                                                                                         |
| `@telegram-auth/server` for Mini Apps  | OIDC does **not** cover `initData` — see [Telegram's docs](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app). [Details](./MIGRATION.md#mini-apps-are-not-affected) |

Thanks to everyone who used, reported issues for, and contributed to these packages.
