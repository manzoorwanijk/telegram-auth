const baseConfig = require('@telgram-auth/jest/jest.config.node');

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
	...baseConfig,
};

module.exports = config;
