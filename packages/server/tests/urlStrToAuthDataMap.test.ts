import { urlStrToAuthDataMap } from '../src/utils/urlStrToAuthDataMap';

describe('urlStrToAuthDataMap', () => {
	it('should convert a URL string to a Map', () => {
		const urlStr = 'https://example.com/?key1=value1&key2=2';

		const map = urlStrToAuthDataMap(urlStr);

		expect(map.get('key1')).toBe('value1');
		expect(map.get('key2')).toBe('2');

		const expected = new Map([
			['key1', 'value1'],
			['key2', '2'],
		]);

		expect(urlStrToAuthDataMap(urlStr)).toEqual(expected);
	});

	it('should convert a URL string with a number as a key to a Map', () => {
		const urlStr = 'https://example.com/?1=value1';

		const map = urlStrToAuthDataMap(urlStr);

		expect(map.get('1')).toBe('value1');
	});

	it('should convert a URL string with a number as a value to a Map', () => {
		const urlStr = 'https://example.com/?key1=1';

		const map = urlStrToAuthDataMap(urlStr);

		expect(map.get('key1')).toBe('1');
	});

	it('should convert a URL string with a boolean as a value to a Map', () => {
		const urlStr = 'https://example.com/?key1=true';

		const map = urlStrToAuthDataMap(urlStr);

		expect(map.get('key1')).toBe('true');
	});

	it('should convert a URL string with a empty string as a value to a Map', () => {
		const urlStr = 'https://example.com/?key1=';

		const map = urlStrToAuthDataMap(urlStr);

		expect(map.get('key1')).toBe('');
	});

	test('should return an empty Map if the URL has no query parameters', () => {
		const urlStr = 'https://example.com';
		const expected = new Map();
		expect(urlStrToAuthDataMap(urlStr)).toEqual(expected);
	});

	test('should correctly parse multiple query parameters with the same key', () => {
		const urlStr = 'https://example.com?key=value1&key=value2';
		const expected = new Map([
			['key', 'value1'],
			['key', 'value2'],
		]);
		expect(urlStrToAuthDataMap(urlStr)).toEqual(expected);
	});

	test('should correctly handle URL-encoded query parameters', () => {
		const urlStr = 'https://example.com?key1=value%201&key2=value%202';
		const expected = new Map([
			['key1', 'value 1'],
			['key2', 'value 2'],
		]);
		expect(urlStrToAuthDataMap(urlStr)).toEqual(expected);
	});

	test('should throw an error if the URL string is invalid', () => {
		const urlStr = 'invalid-url';
		expect(() => urlStrToAuthDataMap(urlStr)).toThrow();
	});
});
