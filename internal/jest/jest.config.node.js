/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
	...require('./jest.config'),
	testEnvironment: 'node',
};

module.exports = config;
