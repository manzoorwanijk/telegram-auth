/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
	...require('./jest.config'),
	// CloudFlare worker (miniflare) environment
	testEnvironment: 'miniflare',
};

module.exports = config;
