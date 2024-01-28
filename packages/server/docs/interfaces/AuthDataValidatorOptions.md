[@telegram-auth/server](../README.md) / AuthDataValidatorOptions

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

• `Optional` **botToken**: `string`

The bot token to be used for validating the data.

If you don't pass this here, you'll need to set it later using `setBotToken()`.

#### Defined in

[AuthDataValidator.ts:10](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/server/src/AuthDataValidator.ts#L10)

___

### subtleCrypto

• `Optional` **subtleCrypto**: [`SubtleCrypto`]( https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto )

The crypto object to be used for validating the data

**`See`**

https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto

#### Defined in

[AuthDataValidator.ts:17](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/server/src/AuthDataValidator.ts#L17)

___

### encoder

• `Optional` **encoder**: [`TextEncoder`]( https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder )

The encoder to be used for encoding the data

#### Defined in

[AuthDataValidator.ts:22](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/server/src/AuthDataValidator.ts#L22)

___

### inValidateDataAfter

• `Optional` **inValidateDataAfter**: `number`

The time in seconds after which the data should be considered invalid

**`Default`**

```ts
86400 (1 day)
```

**`Default Value`**

```ts
86400 (1 day)
```

#### Defined in

[AuthDataValidator.ts:30](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/server/src/AuthDataValidator.ts#L30)

___

### throwIfEmptyData

• `Optional` **throwIfEmptyData**: `boolean`

Whether to throw an error if the data is empty/incomplete

**`Default`**

```ts
true
```

#### Defined in

[AuthDataValidator.ts:37](https://github.com/manzoorwanijk/telegram-auth/blob/5d7eb0c/packages/server/src/AuthDataValidator.ts#L37)
