import type { AuthDataMap } from './types';

/**
 * It takes an object and returns auth data Map
 *
 * @param {Record<string, string | number>} data - The object to convert to a Map
 * @returns A new Map object with the entries of the object passed in.
 */
export function objectToAuthDataMap(data: Record<string, string | number>): AuthDataMap {
	return new Map(Object.entries(data));
}
