@telegram-auth/server

# @telegram-auth/server

## Table of contents

### Interfaces

- [AuthDataValidatorOptions](interfaces/AuthDataValidatorOptions.md)
- [TelegramUserData](interfaces/TelegramUserData.md)

### Classes

- [AuthDataValidator](classes/AuthDataValidator.md)

### Functions

- [hexStringToArrayBuffer](README.md#hexstringtoarraybuffer)
- [searchParamsToAuthDataMap](README.md#searchparamstoauthdatamap)
- [objectToAuthDataMap](README.md#objecttoauthdatamap)
- [urlStrToAuthDataMap](README.md#urlstrtoauthdatamap)

### Type Aliases

- [AuthDataMap](README.md#authdatamap)

## Functions

### hexStringToArrayBuffer

▸ **hexStringToArrayBuffer**(`hexString`): [`Uint8Array`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array )

It takes a hex string and returns an array buffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hexString` | `string` | The hex string to convert to an array buffer. |

#### Returns

[`Uint8Array`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array )

A Uint8Array of the hexString.

#### Defined in

[utils/hexStringToArrayBuffer.ts:7](https://github.com/manzoorwanijk/telegram-auth/blob/063fb29/packages/server/src/utils/hexStringToArrayBuffer.ts#L7)

___

### searchParamsToAuthDataMap

▸ **searchParamsToAuthDataMap**(`searchParams`): [`AuthDataMap`](README.md#authdatamap)

It takes a URLSearchParams object and returns auth data Map.
It's useful for parsing the URLSearchParams received from Telegram.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchParams` | [`URLSearchParams`]( https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams ) | URLSearchParams |

#### Returns

[`AuthDataMap`](README.md#authdatamap)

A new Map object with the entries from the searchParams object.

#### Defined in

[utils/searchParamsToAuthDataMap.ts:10](https://github.com/manzoorwanijk/telegram-auth/blob/063fb29/packages/server/src/utils/searchParamsToAuthDataMap.ts#L10)

___

### objectToAuthDataMap

▸ **objectToAuthDataMap**(`data`): [`AuthDataMap`](README.md#authdatamap)

It takes an object and returns auth data Map

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Record`<`string`, `string` \| `number`\> | The object to convert to a Map |

#### Returns

[`AuthDataMap`](README.md#authdatamap)

A new Map object with the entries of the object passed in.

#### Defined in

[utils/objectToAuthDataMap.ts:9](https://github.com/manzoorwanijk/telegram-auth/blob/063fb29/packages/server/src/utils/objectToAuthDataMap.ts#L9)

___

### urlStrToAuthDataMap

▸ **urlStrToAuthDataMap**(`urlStr`): [`Map`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map )<`string`, `string`\>

It takes a URL string and returns auth data Map from the URL's query parameters.
It's useful for parsing the URL received from Telegram.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlStr` | `string` | The URL string to parse. |

#### Returns

[`Map`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map )<`string`, `string`\>

A Map object with the key/value pairs from the URL's query string.

#### Defined in

[utils/urlStrToAuthDataMap.ts:8](https://github.com/manzoorwanijk/telegram-auth/blob/063fb29/packages/server/src/utils/urlStrToAuthDataMap.ts#L8)

## Type Aliases

### AuthDataMap

Ƭ **AuthDataMap**: [`Map`]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map )<`string`, `string` \| `number`\>

Shape of the data to be passed AuthDataValidator.validate().

#### Defined in

[utils/types.ts:4](https://github.com/manzoorwanijk/telegram-auth/blob/063fb29/packages/server/src/utils/types.ts#L4)
