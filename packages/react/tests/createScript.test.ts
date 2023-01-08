import { createScript } from '../src/createScript';
import { CreateScriptOptions } from '../src/types';

describe('createScript', () => {
	const baseOptions = {
		botUsername: 'TestBot',
	} satisfies CreateScriptOptions;

	it('should create a script element with the correct attributes', () => {
		const options: CreateScriptOptions = {
			...baseOptions,
			buttonSize: 'small',
			cornerRadius: 5,
			lang: 'ar',
			requestAccess: 'write',
			showAvatar: false,
			widgetVersion: 22,
		};

		const script = createScript(options);
		expect(script.tagName).toEqual('SCRIPT');
		expect(script.async).toEqual(true);
		expect(script.src).toEqual('https://telegram.org/js/telegram-widget.js?22');
		expect(script.getAttribute('data-telegram-login')).toEqual(baseOptions.botUsername);
		expect(script.getAttribute('data-size')).toEqual('small');
		expect(script.getAttribute('data-radius')).toEqual('5');
		expect(script.getAttribute('data-request-access')).toEqual('write');
		expect(script.getAttribute('data-userpic')).toEqual('false');
		expect(script.getAttribute('data-lang')).toEqual('ar');
	});

	it('should set the auth callback URL if provided', () => {
		const options = {
			...baseOptions,
			authCallbackUrl: 'https://example.com/auth',
		};

		const script = createScript(options);
		expect(script.getAttribute('data-auth-url')).toEqual('https://example.com/auth');
	});

	it('should set the onauth attribute if onAuthCallback is provided', () => {
		const options = {
			...baseOptions,
			onAuthCallback: () => {},
		};

		const script = createScript(options);
		expect(script.getAttribute('data-onauth')).toEqual('TelegramAuthLogin.onAuthCallback(user)');
	});

	it('should use default values if options are not provided', () => {
		const script = createScript(baseOptions);
		expect(script.getAttribute('src')).toEqual('https://telegram.org/js/telegram-widget.js?21');
		expect(script.getAttribute('data-size')).toEqual('large');
		expect(script.getAttribute('data-request-access')).toEqual('write');
		expect(script.getAttribute('data-userpic')).toEqual('true');
		expect(script.getAttribute('data-lang')).toEqual('en');
	});

	it('should not set the data-auth-url attribute if authCallbackUrl is not provided', () => {
		const script = createScript(baseOptions);
		expect(script.hasAttribute('data-auth-url')).toEqual(false);
	});

	it('should not set the data-onauth attribute if onAuthCallback is not provided', () => {
		const script = createScript(baseOptions);
		expect(script.hasAttribute('data-onauth')).toEqual(false);
	});

	it('should not set the data-radius attribute if cornerRadius is not provided', () => {
		const script = createScript(baseOptions);
		expect(script.hasAttribute('data-radius')).toEqual(false);
	});

	it('should not set the data-radius attribute if cornerRadius is 0', () => {
		const options = {
			...baseOptions,
			cornerRadius: 0,
		};

		const script = createScript(options);
		expect(script.hasAttribute('data-radius')).toEqual(false);
	});

	it('should not set the data-request-access attribute if requestAccess is set to null', () => {
		const options = {
			...baseOptions,
			requestAccess: null,
		};

		const script = createScript(options);
		expect(script.hasAttribute('data-request-access')).toEqual(false);
	});
});
