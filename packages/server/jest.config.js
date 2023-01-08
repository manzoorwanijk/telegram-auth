const baseConfig = require('@telegram-auth/jest/jest.config.node');

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
	...baseConfig,
};

module.exports = config;
