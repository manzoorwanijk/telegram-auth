/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
	...require('./jest.config'),
	testEnvironment: 'jsdom',
};

module.exports = config;
