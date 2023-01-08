import React from 'react';
import { render } from '@testing-library/react';
import { LoginButton } from '../src/LoginButton';
import { LoginButtonProps } from '../src/types';

describe('LoginButton', () => {
	const baseProps = {
		botUsername: 'TestBot',
	};

	it('should add the script tag to the DOM', async () => {
		const { container } = render(<LoginButton {...baseProps} />);

		const script = container.querySelector('script');

		expect(script).not.toBeNull();

		expect(script).toBeInstanceOf(HTMLScriptElement);

		expect(script?.getAttribute('data-telegram-login')).toBe(baseProps.botUsername);
	});

	it('should set the default attributes for the script tag', async () => {
		// attributes with their default values
		const attributes = {
			src: 'https://telegram.org/js/telegram-widget.js?21',
			'data-size': 'large',
			'data-request-access': 'write',
			'data-userpic': 'true',
			'data-lang': 'en',
		};

		const { container } = render(<LoginButton {...baseProps} />);

		const script = container.querySelector('script');

		for (const [attribute, value] of Object.entries(attributes)) {
			expect(script?.getAttribute(attribute)).toBe(value);
		}
	});

	it('should set the passed attributes for the script tag', async () => {
		// props with their attributes and values
		const propsToAtts = [
			['botUsername', ['data-telegram-login', 'SomeTestBot']],
			['authCallbackUrl', ['data-auth-url', 'https://example.com/auth']],
			['buttonSize', ['data-size', 'medium']],
			['cornerRadius', ['data-radius', 10]],
			['lang', ['data-lang', 'ar']],
			['requestAccess', ['data-request-access', '']],
			['showAvatar', ['data-userpic', false]],
		] as const;

		const props = propsToAtts.reduce((acc, [prop, [, value]]) => ({ ...acc, [prop]: value }), baseProps);

		const { container } = render(<LoginButton {...props} widgetVersion={30} />);

		const script = container.querySelector('script');

		for (const [, [attr, value]] of propsToAtts) {
			expect(script?.getAttribute(attr)).toBe(`${value}`);
		}
		// widgetVersion should be added to the src attribute
		expect(script?.getAttribute('src')).toBe('https://telegram.org/js/telegram-widget.js?30');
	});

	it('should pass `onAuthCallback` to the script but prefer `authCallbackUrl` if passed', async () => {
		let result = render(<LoginButton {...baseProps} onAuthCallback={() => {}} />);

		let script = result.container.querySelector('script');

		expect(script?.getAttribute('data-auth-url')).toBeNull();
		expect(script?.getAttribute('data-onauth')).toBe('TelegramAuthLogin.onAuthCallback(user)');

		result = render(
			<LoginButton {...baseProps} authCallbackUrl="https://example.com/auth" onAuthCallback={() => {}} />
		);

		script = result.container.querySelector('script');

		expect(script?.getAttribute('data-auth-url')).toBe('https://example.com/auth');
		expect(script?.getAttribute('data-onauth')).toBeNull();
	});
});
