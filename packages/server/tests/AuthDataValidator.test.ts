import { AuthDataValidator } from '../src/AuthDataValidator';
import { objectToAuthDataMap } from '../src/utils';
import { TEST_BOT_TOKEN, getUserTestData, getWebAppTestData, testUserData } from './utils';

describe('AuthDataValidator', () => {
	let validator = new AuthDataValidator();

	beforeEach(() => {
		validator = new AuthDataValidator({ botToken: TEST_BOT_TOKEN });
	});

	let data: Record<string, string | number>, hash: string, user: typeof testUserData;

	it('should throw an error if bot token is empty', async () => {
		// set bot token to empty string
		validator.setBotToken('');

		await expect(validator.validate(new Map())).rejects.toThrow('Error! Bot token is required.');
	});

	it('should throw an error if incomplete auth data is provided', async () => {
		const errorMessage = 'Invalid! Incomplete data provided.';

		const cases: Array<Record<string, string | number>> = [
			{},
			{ id: 123 },
			{ id: 123, hash: 'xyz' },
			{ id: 123, auth_date: 12346 },
			{ auth_date: 12346, hash: 'xyz' },
			{ query_id: 12346, user: '{}' },
			{ query_id: 12346, hash: 'xyz' },
			{ user: '{}', hash: 'xyz' },
			testUserData,
			getUserTestData().data,
			getWebAppTestData().data,
		];

		for (const testCase of cases) {
			await expect(validator.validate(objectToAuthDataMap(testCase))).rejects.toThrow(errorMessage);
		}
	});

	it('should throw an error if auth data is invalid', async () => {
		const errorMessage = 'Unauthorized! Data could not be validated.';

		let result = validator.validate(objectToAuthDataMap({ ...getUserTestData().data, hash: 'xyz' }));
		await expect(result).rejects.toThrow(errorMessage);

		({ data, hash } = getUserTestData());

		// Passing the correct hash but tamper with login data
		result = validator.validate(objectToAuthDataMap({ ...data, hash, id: 123 }));
		await expect(result).rejects.toThrow(errorMessage);

		({ data, hash } = getWebAppTestData());
		// Passing the correct hash but tamper with web app data
		result = validator.validate(objectToAuthDataMap({ ...data, hash, query_id: 123 }));
		await expect(result).rejects.toThrow(errorMessage);

		({ data, hash } = getUserTestData());
		// Passing the correct data but invalid bot token
		validator.setBotToken(TEST_BOT_TOKEN + 'fake');
		result = validator.validate(objectToAuthDataMap({ ...data, hash }));
		await expect(result).rejects.toThrow(errorMessage);

		({ data, hash } = getWebAppTestData());
		result = validator.validate(objectToAuthDataMap({ ...data, hash }));
		await expect(result).rejects.toThrow(errorMessage);
	});

	it('should throw an error if auth data is expired, otherwise not', async () => {
		const errorMessage = 'Unauthorized! The data has expired.';

		({ data, hash } = getUserTestData({
			// Expire the auth data by 10 seconds
			auth_date: Math.floor(Date.now() / 1000) - (86400 + 10),
		}));

		let result = validator.validate(objectToAuthDataMap({ ...data, hash }));
		await expect(result).rejects.toThrow(errorMessage);

		// Should work with custom expiration time (2 days)
		validator.setInValidateDataAfter(86400 * 2);

		({ data, hash } = getUserTestData({
			// Set the auth date to 1+ day ago
			auth_date: Math.floor(Date.now() / 1000) - (86400 + 10),
		}));

		result = validator.validate(objectToAuthDataMap({ ...data, hash }));
		await expect(result).resolves.toEqual(data);

		({ data, hash } = getUserTestData({
			// Expire the auth data by 10 seconds for days expiration
			auth_date: Math.floor(Date.now() / 1000) - (86400 * 2 + 10),
		}));

		result = validator.validate(objectToAuthDataMap({ ...data, hash }));
		await expect(result).rejects.toThrow(errorMessage);
	});

	it('should return the login auth data if it is valid', async () => {
		({ data, hash } = getUserTestData());
		const result = await validator.validate(objectToAuthDataMap({ ...data, hash }));

		expect(result).toEqual(data);
	});

	it('should return the web app auth data if it is valid', async () => {
		const { data, hash } = getWebAppTestData();
		const result = await validator.validate(objectToAuthDataMap({ ...data, hash }));

		expect(result).toEqual(JSON.parse(data.user));
	});

	it('should throw an error if the user data is incomplete', async () => {
		const errorMessage = 'Error! The data is incomplete.';

		({ data, hash } = getWebAppTestData({
			// Set `id` to empty string
			id: '',
		}));

		let result = validator.validate(objectToAuthDataMap({ ...data, hash }));
		await expect(result).rejects.toThrow(errorMessage);

		// Should not throw if `throwIfEmptyData` is set to `false`
		validator.setThrowIfEmptyData(false);
		({ data, hash, user } = getWebAppTestData({
			// Set `id` to empty string
			id: '',
		}));
		result = validator.validate(objectToAuthDataMap({ ...data, hash }));

		await expect(result).resolves.toEqual(user);
	});
});
