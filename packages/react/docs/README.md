@telegram-auth/react

# @telegram-auth/react

## Table of contents

### Interfaces

- [TelegramAuthData](interfaces/TelegramAuthData.md)
- [LoginButtonProps](interfaces/LoginButtonProps.md)
- [CreateScriptOptions](interfaces/CreateScriptOptions.md)

### Functions

- [LoginButton](README.md#loginbutton)
- [createScript](README.md#createscript)

## Functions

### LoginButton

▸ **LoginButton**(`props`): `Element`

A React component that renders a Telegram login button.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`LoginButtonProps`](interfaces/LoginButtonProps.md) | The props to pass to the component. |

#### Returns

`Element`

A React component that renders the Telegram login button.

**`Deprecated`**

Unmaintained. Deprecated in favour of Telegram's OpenID Connect login. Replace
this with your own button that starts a standard OIDC redirect — see
https://github.com/manzoorwanijk/telegram-auth/blob/main/MIGRATION.md

**`See`**

 - https://core.telegram.org/bots/telegram-login
 - https://core.telegram.org/widgets/login

#### Defined in

[LoginButton.tsx:28](https://github.com/manzoorwanijk/telegram-auth/blob/6482f90eaa7cb44dc1c9ac0274a60c05b218e146/packages/react/src/LoginButton.tsx#L28)

___

### createScript

▸ **createScript**(`options`): [`HTMLScriptElement`]( https://developer.mozilla.org/docs/Web/API/HTMLScriptElement )

It creates a script tag with the right attributes to load the Telegram widget

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CreateScriptOptions`](interfaces/CreateScriptOptions.md) | The options to create the script. |

#### Returns

[`HTMLScriptElement`]( https://developer.mozilla.org/docs/Web/API/HTMLScriptElement )

A script element

**`Deprecated`**

Unmaintained. Deprecated in favour of Telegram's OpenID Connect login — see
https://github.com/manzoorwanijk/telegram-auth/blob/main/MIGRATION.md

**`See`**

 - https://core.telegram.org/bots/telegram-login
 - https://core.telegram.org/widgets/login

#### Defined in

[createScript.ts:15](https://github.com/manzoorwanijk/telegram-auth/blob/6482f90eaa7cb44dc1c9ac0274a60c05b218e146/packages/react/src/createScript.ts#L15)
