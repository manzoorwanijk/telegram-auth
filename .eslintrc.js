/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	root: true,
	// This tells ESLint to load the config from the package `@telgram-auth/eslint-config`
	extends: ['@telegram-auth/eslint-config/recommended'],
};
