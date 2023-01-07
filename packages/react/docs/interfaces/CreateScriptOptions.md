[@telgram-auth/react](../README.md) / CreateScriptOptions

# Interface: CreateScriptOptions

The options to create the script.

## Hierarchy

- [`LoginButtonProps`](LoginButtonProps.md)

  ↳ **`CreateScriptOptions`**

## Table of contents

### Properties

- [botUsername](CreateScriptOptions.md#botusername)
- [authCallbackUrl](CreateScriptOptions.md#authcallbackurl)
- [buttonSize](CreateScriptOptions.md#buttonsize)
- [cornerRadius](CreateScriptOptions.md#cornerradius)
- [lang](CreateScriptOptions.md#lang)
- [onAuthCallback](CreateScriptOptions.md#onauthcallback)
- [requestAccess](CreateScriptOptions.md#requestaccess)
- [showAvatar](CreateScriptOptions.md#showavatar)
- [widgetVersion](CreateScriptOptions.md#widgetversion)

## Properties

### botUsername

• **botUsername**: `string`

The username of the bot that will be used to authenticate the user.

#### Inherited from

[LoginButtonProps](LoginButtonProps.md).[botUsername](LoginButtonProps.md#botusername)

#### Defined in

[types.ts:25](https://github.com/manzoorwanijk/telegram-auth/blob/7c2bc06/packages/react/src/types.ts#L25)

___

### authCallbackUrl

• `Optional` **authCallbackUrl**: `string`

The URL where the auth data from Telegram will be sent.

#### Inherited from

[LoginButtonProps](LoginButtonProps.md).[authCallbackUrl](LoginButtonProps.md#authcallbackurl)

#### Defined in

[types.ts:20](https://github.com/manzoorwanijk/telegram-auth/blob/7c2bc06/packages/react/src/types.ts#L20)

___

### buttonSize

• `Optional` **buttonSize**: ``"large"`` \| ``"medium"`` \| ``"small"``

The size of the button.

**`Default`**

'large'

#### Inherited from

[LoginButtonProps](LoginButtonProps.md).[buttonSize](LoginButtonProps.md#buttonsize)

#### Defined in

[types.ts:32](https://github.com/manzoorwanijk/telegram-auth/blob/7c2bc06/packages/react/src/types.ts#L32)

___

### cornerRadius

• `Optional` **cornerRadius**: `number`

The radius of the button corners.

#### Inherited from

[LoginButtonProps](LoginButtonProps.md).[cornerRadius](LoginButtonProps.md#cornerradius)

#### Defined in

[types.ts:37](https://github.com/manzoorwanijk/telegram-auth/blob/7c2bc06/packages/react/src/types.ts#L37)

___

### lang

• `Optional` **lang**: `string`

The language of the button.

**`Default`**

"en"

#### Inherited from

[LoginButtonProps](LoginButtonProps.md).[lang](LoginButtonProps.md#lang)

#### Defined in

[types.ts:44](https://github.com/manzoorwanijk/telegram-auth/blob/7c2bc06/packages/react/src/types.ts#L44)

___

### onAuthCallback

• `Optional` **onAuthCallback**: (`data`: [`TelegramAuthData`](TelegramAuthData.md)) => `void`

#### Type declaration

▸ (`data`): `void`

The callback function that will be called when the user is authenticated.

##### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`TelegramAuthData`](TelegramAuthData.md) |

##### Returns

`void`

#### Inherited from

[LoginButtonProps](LoginButtonProps.md).[onAuthCallback](LoginButtonProps.md#onauthcallback)

#### Defined in

[types.ts:49](https://github.com/manzoorwanijk/telegram-auth/blob/7c2bc06/packages/react/src/types.ts#L49)

___

### requestAccess

• `Optional` **requestAccess**: ``"write"``

The access level that the bot will request.

**`Default`**

"write"

#### Inherited from

[LoginButtonProps](LoginButtonProps.md).[requestAccess](LoginButtonProps.md#requestaccess)

#### Defined in

[types.ts:56](https://github.com/manzoorwanijk/telegram-auth/blob/7c2bc06/packages/react/src/types.ts#L56)

___

### showAvatar

• `Optional` **showAvatar**: `boolean`

Whether to show the user's avatar.

**`Default`**

true

#### Inherited from

[LoginButtonProps](LoginButtonProps.md).[showAvatar](LoginButtonProps.md#showavatar)

#### Defined in

[types.ts:63](https://github.com/manzoorwanijk/telegram-auth/blob/7c2bc06/packages/react/src/types.ts#L63)

___

### widgetVersion

• `Optional` **widgetVersion**: `number`

The version of the Telegram widget to deal with browser caching.

#### Inherited from

[LoginButtonProps](LoginButtonProps.md).[widgetVersion](LoginButtonProps.md#widgetversion)

#### Defined in

[types.ts:68](https://github.com/manzoorwanijk/telegram-auth/blob/7c2bc06/packages/react/src/types.ts#L68)
