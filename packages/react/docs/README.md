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

**`See`**

https://core.telegram.org/widgets/login

#### Defined in

[LoginButton.tsx:23](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/LoginButton.tsx#L23)

___

### createScript

▸ **createScript**(`options`): [`HTMLScriptElement`]( https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement )

It creates a script tag with the right attributes to load the Telegram widget

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`CreateScriptOptions`](interfaces/CreateScriptOptions.md) | The options to create the script. |

#### Returns

[`HTMLScriptElement`]( https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement )

A script element

**`See`**

https://core.telegram.org/widgets/login

#### Defined in

[createScript.ts:11](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/react/src/createScript.ts#L11)
