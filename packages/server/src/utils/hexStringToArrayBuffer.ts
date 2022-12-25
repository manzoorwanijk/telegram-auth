/**
 * It takes a hex string and returns an array buffer
 *
 * @param {string} hexString - The hex string to convert to an array buffer.
 * @returns A Uint8Array of the hexString.
 */
export function hexStringToArrayBuffer(hexString: string) {
	return new Uint8Array(hexString.match(/[\da-f]{2}/gi)?.map((h) => parseInt(h, 16)) || []);
}
