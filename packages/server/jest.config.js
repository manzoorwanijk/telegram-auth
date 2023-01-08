/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/tests/**/*.test.[jt]s?(x)'],
	testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
};

module.exports = config;
