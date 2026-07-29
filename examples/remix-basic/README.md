# @telegram-auth remix-basic example

> [!WARNING]
> **Deprecated.** This example uses the `@telegram-auth/*` packages, which are deprecated in favour of Telegram's [OpenID Connect login](https://core.telegram.org/bots/telegram-login).
>
> The equivalent is two routes — one that redirects to `https://oauth.telegram.org/auth` with PKCE, one that exchanges the code and verifies the ID token.
>
> **→ [Rolling it yourself](../../MIGRATION.md#rolling-it-yourself)** in the migration guide.
>
> Kept for reference only; it is not maintained.

-   [Remix Docs](https://remix.run/docs)

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

3. Go to the remix-basic example folder

    ```sh
    cd examples/remix-basic
    ```

4. Create a `.env` file by copying `.example.env` and update `BOT_TOKEN` and `BOT_USERNAME` with your bot's token and username that you got from [@BotFather](https://t.me/BotFather).

5. Start the dev server

    ```sh
    pnpm run dev
    ```

6. You may want to use [ngrok](https://ngrok.com/) to expose your local server to the internet.

    ```sh
    ngrok http 3000
    ```

    Don't forget to send `/setdomain` command to [@BotFather](https://t.me/BotFather) with the ngrok URL to fix the "Bot domain invalid" error.
