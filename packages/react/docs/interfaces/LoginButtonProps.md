[@telegram-auth/react](../README.md) / LoginButtonProps

# Interface: LoginButtonProps

## Hierarchy

- **`LoginButtonProps`**

  ↳ [`CreateScriptOptions`](CreateScriptOptions.md)

## Table of contents

### Properties

- [botUsername](LoginButtonProps.md#botusername)
- [authCallbackUrl](LoginButtonProps.md#authcallbackurl)
- [buttonSize](LoginButtonProps.md#buttonsize)
- [cornerRadius](LoginButtonProps.md#cornerradius)
- [lang](LoginButtonProps.md#lang)
- [onAuthCallback](LoginButtonProps.md#onauthcallback)
- [requestAccess](LoginButtonProps.md#requestaccess)
- [showAvatar](LoginButtonProps.md#showavatar)
- [widgetVersion](LoginButtonProps.md#widgetversion)

## Properties

### botUsername

• **botUsername**: `string`

The username of the bot that will be used to authenticate the user.

#### Defined in

[types.ts:25](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/types.ts#L25)

___

### authCallbackUrl

• `Optional` **authCallbackUrl**: `string`

The URL where the auth data from Telegram will be sent.

#### Defined in

[types.ts:20](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/types.ts#L20)

___

### buttonSize

• `Optional` **buttonSize**: ``"large"`` \| ``"medium"`` \| ``"small"``

The size of the button.

**`Default`**

```ts
'large'
```

#### Defined in

[types.ts:32](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/types.ts#L32)

___

### cornerRadius

• `Optional` **cornerRadius**: `number`

The radius of the button corners.

#### Defined in

[types.ts:37](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/types.ts#L37)

___

### lang

• `Optional` **lang**: `string`

The language of the button.

**`Default`**

```ts
"en"
```

#### Defined in

[types.ts:44](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/types.ts#L44)

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

#### Defined in

[types.ts:49](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/types.ts#L49)

___

### requestAccess

• `Optional` **requestAccess**: ``null`` \| ``"write"``

The access level that the bot will request.

**`Default`**

```ts
"write"
```

#### Defined in

[types.ts:56](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/types.ts#L56)

___

### showAvatar

• `Optional` **showAvatar**: `boolean`

Whether to show the user's avatar.

**`Default`**

```ts
true
```

#### Defined in

[types.ts:63](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/types.ts#L63)

___

### widgetVersion

• `Optional` **widgetVersion**: `string` \| `number`

The version of the Telegram widget to deal with browser caching.

#### Defined in

[types.ts:68](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/types.ts#L68)
