[@telgram-auth/server](../README.md) / AuthDataValidatorOptions

# Interface: AuthDataValidatorOptions

## Table of contents

### Properties

- [botToken](AuthDataValidatorOptions.md#bottoken)
- [subtleCrypto](AuthDataValidatorOptions.md#subtlecrypto)
- [encoder](AuthDataValidatorOptions.md#encoder)
- [inValidateDataAfter](AuthDataValidatorOptions.md#invalidatedataafter)
- [throwIfEmptyData](AuthDataValidatorOptions.md#throwifemptydata)

## Properties

### botToken

• **botToken**: `string`

The bot token to be used for validating the data

#### Defined in

[AuthDataValidator.ts:8](https://github.com/manzoorwanijk/telegram-auth/blob/bb906d2/packages/server/src/AuthDataValidator.ts#L8)

___

### subtleCrypto

• `Optional` **subtleCrypto**: [`SubtleCrypto`]( https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto )

The crypto object to be used for validating the data

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto

#### Defined in

[AuthDataValidator.ts:15](https://github.com/manzoorwanijk/telegram-auth/blob/bb906d2/packages/server/src/AuthDataValidator.ts#L15)

___

### encoder

• `Optional` **encoder**: [`TextEncoder`]( https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder )

The encoder to be used for encoding the data

#### Defined in

[AuthDataValidator.ts:20](https://github.com/manzoorwanijk/telegram-auth/blob/bb906d2/packages/server/src/AuthDataValidator.ts#L20)

___

### inValidateDataAfter

• `Optional` **inValidateDataAfter**: `number`

The time in seconds after which the data should be considered invalid

**`Default`**

86400 (1 day)

#### Defined in

[AuthDataValidator.ts:27](https://github.com/manzoorwanijk/telegram-auth/blob/bb906d2/packages/server/src/AuthDataValidator.ts#L27)

___

### throwIfEmptyData

• `Optional` **throwIfEmptyData**: `boolean`

Whether to throw an error if the data is empty/incomplete

**`Default`**

true

#### Defined in

[AuthDataValidator.ts:34](https://github.com/manzoorwanijk/telegram-auth/blob/bb906d2/packages/server/src/AuthDataValidator.ts#L34)
