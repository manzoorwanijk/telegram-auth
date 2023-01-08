import { searchParamsToAuthDataMap } from '../src/utils/searchParamsToAuthDataMap';

describe('searchParamsToAuthDataMap', () => {
	test('should return a Map object with the correct entries', () => {
		const searchParams = new URLSearchParams('key1=value1&key2=value2');
		const expected = new Map([
			['key1', 'value1'],
			['key2', 'value2'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should return an empty Map object if the URLSearchParams object is empty', () => {
		const searchParams = new URLSearchParams('');
		const expected = new Map();
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle multiple values for the same key in the URLSearchParams object', () => {
		const searchParams = new URLSearchParams('key1=value1&key1=value2');
		const expected = new Map([
			['key1', 'value1'],
			['key1', 'value2'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should return a Map object with the correct entries when the URLSearchParams object has no values', () => {
		const searchParams = new URLSearchParams('key1&key2');
		const expected = new Map([
			['key1', ''],
			['key2', ''],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should return a Map object with the correct entries when the URLSearchParams object has no keys', () => {
		const searchParams = new URLSearchParams('=value1&=value2');
		const expected = new Map([
			['', 'value1'],
			['', 'value2'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should return a Map object with the correct entries when the URLSearchParams object has a mix of keys and values', () => {
		const searchParams = new URLSearchParams('key1=value1&key2');
		const expected = new Map([
			['key1', 'value1'],
			['key2', ''],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should return a Map object with the correct entries when the URLSearchParams object has duplicate keys', () => {
		const searchParams = new URLSearchParams('key1=value1&key1=value2');
		const expected = new Map([
			['key1', 'value1'],
			['key1', 'value2'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should return a Map object with the correct entries when the URLSearchParams object has multiple keys with the same name', () => {
		const searchParams = new URLSearchParams('key1=value1&key1=value2&key2=value3');
		const expected = new Map([
			['key1', 'value1'],
			['key1', 'value2'],
			['key2', 'value3'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle special/encoded characters in keys and values', () => {
		const searchParams = new URLSearchParams('key1=value%201&key2=value%202');
		const expected = new Map([
			['key1', 'value 1'],
			['key2', 'value 2'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle keys with spaces and special characters', () => {
		const searchParams = new URLSearchParams('my key1=value1&my%20key=value2&my-key=value3');
		const expected = new Map([
			['my key1', 'value1'],
			['my key', 'value2'],
			['my-key', 'value3'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle values with spaces and special characters', () => {
		const searchParams = new URLSearchParams('key1=my value&key2=my%20value&key3=my-value');
		const expected = new Map([
			['key1', 'my value'],
			['key2', 'my value'],
			['key3', 'my-value'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle multiple values for the same key with different spaces and special characters', () => {
		const searchParams = new URLSearchParams('key1=my value&key1=my%20value&key1=my-value');
		const expected = new Map([
			['key1', 'my value'],
			['key1', 'my%20value'],
			['key1', 'my-value'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle an empty value for a key', () => {
		const searchParams = new URLSearchParams('key1=&key2=value2');
		const expected = new Map([
			['key1', ''],
			['key2', 'value2'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle an empty key with a value', () => {
		const searchParams = new URLSearchParams('=value1&key2=value2');
		const expected = new Map([
			['', 'value1'],
			['key2', 'value2'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle an empty key and an empty value', () => {
		const searchParams = new URLSearchParams('=&key2=value2');
		const expected = new Map([
			['', ''],
			['key2', 'value2'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle multiple empty keys and values', () => {
		const searchParams = new URLSearchParams('=&=&key2=value2');
		const expected = new Map([
			['', ''],
			['', ''],
			['key2', 'value2'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle a mix of empty and non-empty keys and values', () => {
		const searchParams = new URLSearchParams('key1=value1&=&key2=&=value2');
		const expected = new Map([
			['key1', 'value1'],
			['', ''],
			['key2', ''],
			['', 'value2'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});

	test('should handle multiple keys and values with mixed spaces and special characters', () => {
		const searchParams = new URLSearchParams('key1=my value&key2=my%20value1&key3=my-value&key4=my_value');
		const expected = new Map([
			['key1', 'my value'],
			['key2', 'my value1'],
			['key3', 'my-value'],
			['key4', 'my_value'],
		]);
		const result = searchParamsToAuthDataMap(searchParams);
		expect(result).toEqual(expected);
	});
});
