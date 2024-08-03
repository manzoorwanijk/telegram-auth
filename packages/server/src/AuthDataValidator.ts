import { hexStringToArrayBuffer } from './utils';
import type { AuthDataMap, TelegramUserData } from './utils';

export interface AuthDataValidatorOptions {
	/**
	 * The bot token to be used for validating the data.
	 *
	 * If you don't pass this here, you'll need to set it later using `setBotToken()`.
	 */
	botToken?: string;

	/**
	 * The crypto object to be used for validating the data
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto
	 */
	subtleCrypto?: SubtleCrypto;

	/**
	 * The encoder to be used for encoding the data
	 */
	encoder?: TextEncoder;

	/**
	 * The time in seconds after which the data should be considered invalid
	 *
	 * @default 86400 (1 day)
	 */
	inValidateDataAfter?: number;

	/**
	 * Whether to throw an error if the data is empty/incomplete
	 *
	 * @default true
	 */
	throwIfEmptyData?: boolean;
}

/**
 * Validates the data sent by Telegram Login Widget
 *
 * @see https://core.telegram.org/widgets/login#checking-authorization
 */
export class AuthDataValidator {
	protected botToken!: string;

	protected crypto!: SubtleCrypto;

	protected encoder!: TextEncoder;

	protected inValidateDataAfter!: number;

	protected throwIfEmptyData!: boolean;

	constructor({
		botToken = '',
		subtleCrypto,
		encoder,
		inValidateDataAfter = 86400,
		throwIfEmptyData = true,
	}: AuthDataValidatorOptions = {}) {
		this.setBotToken(botToken);
		this.setCrypto(this.assertValidCrypto(subtleCrypto));
		this.setEncoder(encoder || new TextEncoder());
		this.setInValidateDataAfter(inValidateDataAfter);
		this.setThrowIfEmptyData(throwIfEmptyData);
	}

	/**
	 * Ensure that we have a valid subtle crypto object
	 *
	 * @param {SubtleCrypto} [subtleCrypto] - The SubtleCrypto instance provided.
	 * @returns The subtle crypto object.
	 */
	protected assertValidCrypto(subtleCrypto?: SubtleCrypto) {
		const cryptoToUse =
			// prefer the one passed in
			subtleCrypto ||
			// then the one from the global scope (browser/(web)worker)
			(typeof crypto !== 'undefined' && crypto.subtle) ||
			// then the one from the nodejs crypto module
			require('crypto').webcrypto.subtle;

		if (!cryptoToUse) {
			throw new Error('Error! Subtle crypto is needed for validation.');
		}

		return cryptoToUse;
	}

	/**
	 * Sets the bot token to be used for validating the data
	 *
	 * @param {string} botToken The bot token to be used
	 */
	public setBotToken(botToken: string) {
		this.botToken = botToken;

		return this;
	}

	/**
	 * Sets the crypto to be used for validating the data
	 *
	 * @param {SubtleCrypto} subtleCrypto The crypto to be used
	 */
	public setCrypto(subtleCrypto: SubtleCrypto) {
		this.crypto = subtleCrypto;

		return this;
	}

	/**
	 * Sets the encoder to be used for encoding the data
	 *
	 * @param {TextEncoder} encoder The encoder to be used
	 */
	public setEncoder(encoder: TextEncoder) {
		this.encoder = encoder;

		return this;
	}

	/**
	 * This function sets the inValidateDataAfter property of the class
	 * which is the number of seconds after which the data is considered invalid.
	 *
	 * @param {number} inValidateDataAfter - The number of seconds after which the data is considered
	 * invalid.
	 */
	public setInValidateDataAfter(inValidateDataAfter: number) {
		this.inValidateDataAfter = inValidateDataAfter;

		return this;
	}

	/**
	 * This function sets the throwIfEmptyData property of the class.
	 *
	 * @param {boolean} throwIfEmptyData - Whether to throw an error if the data is empty/incomplete.
	 */
	public setThrowIfEmptyData(throwIfEmptyData: boolean) {
		this.throwIfEmptyData = throwIfEmptyData;

		return this;
	}

	/**
	 * It takes a map of auth data received from Telegram, and returns the data if it's valid
	 *
	 * @see https://core.telegram.org/widgets/login#checking-authorization
	 *
	 * @param {AuthDataMap} authDataMap The data to be validated
	 * @returns The validated data.
	 */
	public async validate<T extends { id: number | string } = TelegramUserData>(authDataMap: AuthDataMap): Promise<T> {
		// Ensure the bot token is not empty
		this.assertBotToken();
		// Ensure the data is valid
		this.assertDataShape(authDataMap);

		// clone the data to avoid mutating the original
		const authData = new Map(authDataMap);

		const hashFromTelegram = authData.get('hash') || '';
		authData.delete('hash');

		const dataStr = this.getFinalDataStr(authData);

		const isWebAppData = authData.has('user');

		const signatureKey = await this.getSecretKey(isWebAppData);

		const signature = hexStringToArrayBuffer(hashFromTelegram.toString());

		/**
		 * Use crypto.verify() to guard against timing attacks.
		 * We could implement this by calling crypto.sign() and compare the strings
		 * but that is insecure, as string comparisons bail out on the first mismatch,
		 * which leaks information to potential attackers.
		 *
		 * @see https://en.wikipedia.org/wiki/Timing_attack
		 */
		const isDataValid = await this.crypto.verify('HMAC', signatureKey, signature, this.encoder.encode(dataStr));

		if (!isDataValid) {
			throw new Error('Unauthorized! Data could not be validated.');
		}

		// if the time is more than `this.inValidateDataAfter`, the request is invalid
		if (this.hasDataExpired(authData)) {
			throw new Error('Unauthorized! The data has expired.');
		}

		let data: T;

		if (isWebAppData) {
			data = authData.has('user') ? JSON.parse(authData.get('user')?.toString() || '{}') : {};
		} else {
			data = Object.fromEntries(authData.entries()) as T;
		}

		if (this.throwIfEmptyData && !data.id) {
			throw new Error('Error! The data is incomplete.');
		}

		return data;
	}

	/**
	 * Whether the data is expired or not as per the `inValidateDataAfter` property.
	 *
	 * @param {AuthDataMap} authData - AuthDataMap - The auth data that was passed.
	 * @returns A boolean value.
	 */
	protected hasDataExpired(authData: AuthDataMap) {
		const authDate = Number(authData.get('auth_date'));
		const now = Math.floor(Date.now() / 1000);
		const dataAge = now - authDate;

		return dataAge > this.inValidateDataAfter;
	}

	/**
	 * It checks if the bot token is set.
	 */
	protected assertBotToken() {
		if (!this.botToken) {
			throw new Error('Error! Bot token is required.');
		}
	}

	/**
	 * If the hash, auth_date, and id or user are not present, throw an error.
	 *
	 * @param {AuthDataMap} authDataMap - A Map object containing the data.
	 */
	protected assertDataShape(authDataMap: AuthDataMap) {
		const hash = authDataMap.get('hash');
		const auth_date = authDataMap.get('auth_date');
		const id_or_user = authDataMap.get('id') || authDataMap.get('user');

		if (!hash || !auth_date || !id_or_user) {
			throw new Error('Invalid! Incomplete data provided.');
		}
	}

	/**
	 * It takes a bot token and returns a secret key based on whether the data is from
	 * a normal Telegram login or from a web app.
	 *
	 * @param {boolean} [isWebAppData] whether the secret key is from Telegram web app.
	 * @returns A secret key
	 */
	protected async getSecretKey(isWebAppData?: boolean) {
		let secret: ArrayBuffer;

		if (isWebAppData) {
			/**
			 * @see https://core.telegram.org/bots/webapps#validating-data-received-via-the-web-app
			 */
			const secretKey = await this.crypto.importKey(
				'raw',
				this.encoder.encode('WebAppData'),
				{ name: 'HMAC', hash: 'SHA-256' },
				true,
				['sign', 'verify']
			);
			secret = await this.crypto.sign('HMAC', secretKey, this.encoder.encode(this.botToken));
		} else {
			/**
			 * @see https://core.telegram.org/widgets/login#checking-authorization
			 */
			secret = await this.crypto.digest('SHA-256', this.encoder.encode(this.botToken));
		}

		return await this.crypto.importKey('raw', secret, { name: 'HMAC', hash: 'SHA-256' }, true, ['sign', 'verify']);
	}

	/**
	 * It takes a map of key-value pairs, sorts the keys, and then joins the key-value pairs into a string
	 * with a new line between each pair.
	 *
	 * @param {AuthDataMap} authDataMap - The map of key-value pairs to be sorted and joined.
	 *
	 * @returns A string of the authDataMap keys and values, sorted alphabetically.
	 */
	protected getFinalDataStr(authDataMap: AuthDataMap) {
		const dataToCheck: Array<string> = [];

		for (const [key, value] of authDataMap.entries()) {
			dataToCheck.push(`${key}=${value}`);
		}
		dataToCheck.sort();

		return dataToCheck.join(`\n`);
	}
}
