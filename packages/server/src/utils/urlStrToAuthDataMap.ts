/**
 * It takes a URL string and returns auth data Map from the URL's query parameters.
 * It's useful for parsing the URL received from Telegram.
 *
 * @param {string} urlStr - The URL string to parse.
 * @returns A Map object with the key/value pairs from the URL's query string.
 */
export function urlStrToAuthDataMap(urlStr: string) {
	const url = new URL(urlStr);
	return new Map(url.searchParams.entries());
}
