# @telegram-auth/react

[`@telegram-auth/react`](https://www.npmjs.com/package/@telegram-auth/react) exports a React component ([LoginButton](./docs#loginbutton)) to render a Telegram Login button using [Telegram Login Widget](https://core.telegram.org/widgets/login).

## Documentation

- [Reference](./docs/README.md)

## Install

```sh
# npm
npm install @telegram-auth/react

# yarn
yarn add @telegram-auth/react

# with pnpm
pnpm add @telegram-auth/react
```

## Usage

### with `authCallbackUrl`

If you specify `authCallbackUrl`, the user will be redirected to the specified URL after the authentication process is completed. You must validate the data sent to the URL as query params before authorizing the user.

<!-- prettier-ignore -->
```tsx title=src/App.tsx
import { LoginButton } from '@telegram-auth/react';

function App() {
    return (
        <div className="App">
            <LoginButton
                botUsername={process.env.BOT_USERNAME}
                authCallbackUrl="/path/to/callback/url"
                buttonSize="large" // "large" | "medium" | "small"
                cornerRadius={5} // 0 - 20
                showAvatar={true} // true | false
                lang="en"
            />
        </div>
    );
}
```

### with `onAuthCallback`

<!-- prettier-ignore -->
```jsx title=src/App.jsx
import { LoginButton } from '@telegram-auth/react';

function App() {
    return (
        <div className="App">
            <LoginButton
                botUsername={process.env.BOT_USERNAME}
                onAuthCallback={(data) => {
                    console.log(data);
                    // call your backend here to validate the data and sign in the user
                }}
            />
        </div>
    );
}
```

## Validation

You can use [`@telegram-auth/server`](../server) server-side to validate the data.

<!-- prettier-ignore -->
```ts title=validate.ts
import { AuthDataValidator } from '@telegram-auth/server';
import { urlStrToAuthDataMap } from '@telegram-auth/server/utils';

const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN });

const data = urlStrToAuthDataMap(request.url);

try {
    const user = await validator.validate(data);

    // The data is now valid and you can sign in the user.

    console.log(user);
} catch (error) {
    console.error(error);
}
```
