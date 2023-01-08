/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
	root: true,
	// This tells ESLint to load the config from the package `@telgram-auth/eslint-config`
	extends: ['@telgram-auth/eslint-config/base', '@telgram-auth/eslint-config/tests'],
};
