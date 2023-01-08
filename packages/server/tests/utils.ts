import { createHash, createHmac } from 'crypto';

export const TEST_BOT_TOKEN = '123456789:abCdEfgHijKLmnopqRstUvWxYZ';

export function hashData(botToken: string, data: Record<string, string | number>, isWebAppData?: boolean): string {
	const dataStr = Object.entries(data)
		.map(([key, value]) => `${key}=${value}`)
		.sort()
		.join('\n');

	const hashOrHmac = isWebAppData ? createHmac('sha256', 'WebAppData') : createHash('sha256');

	const secretKey = hashOrHmac.update(botToken).digest();

	return createHmac('sha256', secretKey).update(dataStr).digest('hex');
}

// Data from Telegram login widget
export const testUserData = {
	id: 123456789,
	first_name: 'John',
	last_name: 'Doe',
	username: 'JohnDoe',
	photo_url: 'https://t.me/i/userpic/123456/username.jpg',
};

export function getUserTestData(userData?: Record<string, string | number>) {
	const data = {
		...testUserData,
		auth_date: Date.now(),
		...userData,
	};

	return {
		data,
		hash: hashData(TEST_BOT_TOKEN, data),
	};
}

export function getWebAppTestData(userData?: Record<string, string | number>, date?: number) {
	const user = {
		language_code: 'en',
		...testUserData,
		...userData,
	};
	const data = {
		query_id: 123456789,
		user: JSON.stringify(user),
		auth_date: date || Date.now(),
	};

	return {
		data,
		user,
		hash: hashData(TEST_BOT_TOKEN, data, true),
	};
}
