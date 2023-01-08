const baseConfig = require('@telegram-auth/jest/jest.config.dom');

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
	...baseConfig,
};

module.exports = config;
