import { hexStringToArrayBuffer } from '../src/utils/hexStringToArrayBuffer';

describe('hexStringToArrayBuffer', () => {
	test('should return an empty Uint8Array for an empty hex string', () => {
		const hexString = '';
		const expected = new Uint8Array([]);
		const result = hexStringToArrayBuffer(hexString);
		expect(result).toEqual(expected);
	});

	test('should return the correct Uint8Array for a hex string with a single byte', () => {
		const hexString = '7f';
		const expected = new Uint8Array([127]);
		const result = hexStringToArrayBuffer(hexString);
		expect(result).toEqual(expected);
	});

	test('should return the correct Uint8Array for a hex string with multiple bytes', () => {
		const hexString = '7f00ff';
		const expected = new Uint8Array([127, 0, 255]);
		const result = hexStringToArrayBuffer(hexString);
		expect(result).toEqual(expected);
	});

	test('should return the correct Uint8Array for a hex string with lowercase characters', () => {
		const hexString = '7f00ff';
		const expected = new Uint8Array([127, 0, 255]);
		const result = hexStringToArrayBuffer(hexString);
		expect(result).toEqual(expected);
	});

	test('should return the correct Uint8Array for a hex string with mixed case characters', () => {
		const hexString = '7F00Ff';
		const expected = new Uint8Array([127, 0, 255]);
		const result = hexStringToArrayBuffer(hexString);
		expect(result).toEqual(expected);
	});

	test('should return the correct Uint8Array for a hex string with leading zeros', () => {
		const hexString = '007f00ff';
		const expected = new Uint8Array([0, 127, 0, 255]);
		const result = hexStringToArrayBuffer(hexString);
		expect(result).toEqual(expected);
	});

	test('should return the correct Uint8Array for a hex string with leading and trailing whitespace', () => {
		const hexString = '   7f00ff   ';
		const expected = new Uint8Array([127, 0, 255]);
		const result = hexStringToArrayBuffer(hexString);
		expect(result).toEqual(expected);
	});

	test('should return the correct Uint8Array for a hex string with multiple spaces between characters', () => {
		const hexString = '7f  00  ff';
		const expected = new Uint8Array([127, 0, 255]);
		const result = hexStringToArrayBuffer(hexString);
		expect(result).toEqual(expected);
	});

	test('should return the correct Uint8Array for a hex string with non-hex characters', () => {
		const hexString = '7f00ffzz';
		const expected = new Uint8Array([127, 0, 255]);
		const result = hexStringToArrayBuffer(hexString);
		expect(result).toEqual(expected);
	});

	test('should return the correct Uint8Array for a hex string with a mix of spaces, non-hex characters, and leading/trailing whitespace', () => {
		const hexString = '   7f00ffzz   ';
		const expected = new Uint8Array([127, 0, 255]);
		const result = hexStringToArrayBuffer(hexString);
		expect(result).toEqual(expected);
	});
});
