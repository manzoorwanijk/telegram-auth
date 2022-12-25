import type { AuthDataMap } from './types';

/**
 * It takes a URLSearchParams object and returns auth data Map.
 * It's useful for parsing the URLSearchParams received from Telegram.
 *
 * @param {URLSearchParams} searchParams - URLSearchParams
 * @returns A new Map object with the entries from the searchParams object.
 */
export function searchParamsToAuthDataMap(searchParams: URLSearchParams): AuthDataMap {
	return new Map(searchParams.entries());
}
