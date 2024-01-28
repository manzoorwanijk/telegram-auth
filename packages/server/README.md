# @telegram-auth/server

_Zero dependency package to validate the data received from Telegram Login Widget or Web App, compatible with Node, serverless edge networks and web workers._

[`@telegram-auth/server`](https://www.npmjs.com/package/@telegram-auth/server) exports a TS/JS class ([`AuthDataValidator`](./docs/classes/AuthDataValidator.md)) to validate the data received from [Telegram Login Widget](https://core.telegram.org/widgets/login#checking-authorization) and [Telegram Web Apps](https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app).
It also exports some [utility functions](./docs/README.md#functions) to prepare the data for validation.

## Documentation

- [Reference](./docs/README.md)

## Install

```sh
# npm
npm install @telegram-auth/server

# yarn
yarn add @telegram-auth/server

# with pnpm
pnpm add @telegram-auth/server
```

## Usage

<!-- prettier-ignore -->
```ts title=validate.ts
import { AuthDataValidator } from '@telegram-auth/server';
import { urlStrToAuthDataMap } from '@telegram-auth/server/utils';

// initialize the validator with your bot token
const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN });

// convert the data from the URL to a map
const data = urlStrToAuthDataMap(request.url);

try {
    // validate the data by passing the map to the validator
    const user = await validator.validate(data);

    // The data is now valid and you can sign in the user.

    console.log(user);
} catch (error) {
    console.error(error);
}
```
