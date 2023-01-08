import { objectToAuthDataMap } from '../src/utils/objectToAuthDataMap';

describe('objectToAuthDataMap', () => {
	test('should return a Map object with the entries of the object passed in', () => {
		const data = { key1: 'value1', key2: 'value2' };
		const expected = new Map([
			['key1', 'value1'],
			['key2', 'value2'],
		]);
		expect(objectToAuthDataMap(data)).toEqual(expected);
	});

	test('should correctly handle values that are numbers', () => {
		const data = { key1: 'value1', key2: 2 };
		const expected = new Map<string, string | number>([
			['key1', 'value1'],
			['key2', 2],
		]);
		expect(objectToAuthDataMap(data)).toEqual(expected);
	});

	test('should return an empty Map if the object is empty', () => {
		const data = {};
		const expected = new Map();
		expect(objectToAuthDataMap(data)).toEqual(expected);
	});

	test('should throw an error if the object passed in is null or undefined', () => {
		// @ts-expect-error
		expect(() => objectToAuthDataMap(null)).toThrow();
		// @ts-expect-error
		expect(() => objectToAuthDataMap(undefined)).toThrow();
	});

	test('should correctly handle objects with duplicate keys', () => {
		// @ts-expect-error
		const data = { key1: 'value1', key2: 'value2', key1: 'value3' };
		const expected = new Map([
			['key1', 'value3'],
			['key2', 'value2'],
		]);
		expect(objectToAuthDataMap(data)).toEqual(expected);
	});

	test('should correctly handle objects with complex keys', () => {
		const data = { 'key 1': 'value1', 'key 2': 'value2' };
		const expected = new Map([
			['key 1', 'value1'],
			['key 2', 'value2'],
		]);
		expect(objectToAuthDataMap(data)).toEqual(expected);
	});
});
