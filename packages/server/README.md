# @telgram-auth/server

`@telgram-auth/server` exports a TS/JS class ([`AuthDataValidator`](./docs/classes/AuthDataValidator.md)) to validate the data received from [Telegram Login Widget](https://core.telegram.org/widgets/login#checking-authorization).
It also exports some [utility functions](./docs/README.md#functions) to prepare the data for validation.

## Documentation

-   [Reference](./docs/README.md)

## Install

```sh
# npm
npm install @telgram-auth/server

# yarn
yarn add @telgram-auth/server

# with pnpm
pnpm add @telgram-auth/server
```

## Usage

```ts title=validate.ts
import { urlStrToAuthDataMap, AuthDataValidator } from '@telgram-auth/server';

// initialize the validator with your bot token
const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN });

// convert the data from the URL to a map
const data = urlStrToAuthDataMap(request.url);

try {
	// validate the data
	const user = await validator.validate(data);

	// The data is now valid and you can sign in the user.

	console.log(user);
} catch (error) {
	console.error(error);
}
```
