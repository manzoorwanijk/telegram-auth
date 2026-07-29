# @telegram-auth next-auth App Router Example

> [!WARNING]
>
> **Deprecated.** This example wires NextAuth.js to the `@telegram-auth/*` packages, which are deprecated in favour of Telegram's [OpenID Connect login](https://core.telegram.org/bots/telegram-login).
>
> Telegram publishes an OIDC discovery document, so the `AuthDataValidator` wiring this example demonstrates is no longer needed.
>
> **→ [Wiring it up](../../MIGRATION.md#4-wiring-it-up)** in the migration guide.
>
> Kept for reference only; it is not maintained.

- [NextAuth.js](https://next-auth.js.org/)

## Get Started

1. Clone the repository

   ```sh
   git clone https://github.com/manzoorwanijk/telegram-auth.git
   cd telegram-auth
   ```

2. Install and build dependencies

   ```sh
   pnpm install
   pnpm kick-off
   ```

3. Go to the "examples/next-auth-app-router" example folder

   ```sh
   cd examples/next-auth-app-router
   ```

4. Create a `.env.local` file by copying `.example.env.local` and update `BOT_TOKEN` and `BOT_USERNAME` with your bot's token and username that you got from [@BotFather](https://t.me/BotFather).

5. Start the dev server

   ```sh
   pnpm run dev
   ```

6. You may want to use [ngrok](https://ngrok.com/) to expose your local server to the internet.

   ```sh
   ngrok http 3000
   ```

   Copy the ngrok URL and update `NEXTAUTH_URL` in `.env.local` with it.

   Don't forget to send `/setdomain` command to [@BotFather](https://t.me/BotFather) with the ngrok URL to fix the "Bot domain invalid" error.
