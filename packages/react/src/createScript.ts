import { CreateScriptOptions } from './types';

/**
 * It creates a script tag with the right attributes to load the Telegram widget
 *
 * @see https://core.telegram.org/widgets/login
 *
 * @param {CreateScriptOptions} options - The options to create the script.
 * @returns A script element
 */
export function createScript({
	authCallbackUrl,
	botUsername,
	buttonSize = 'large',
	cornerRadius,
	lang = 'en',
	onAuthCallback,
	requestAccess = 'write',
	showAvatar = true,
	widgetVersion = 21,
}: CreateScriptOptions): HTMLScriptElement {
	const script = document.createElement('script');

	script.async = true;

	script.src = `https://telegram.org/js/telegram-widget.js?${widgetVersion}`;
	script.setAttribute('data-telegram-login', botUsername);
	script.setAttribute('data-size', buttonSize);
	if (cornerRadius) {
		script.setAttribute('data-radius', `${cornerRadius}`);
	}
	if (requestAccess) {
		script.setAttribute('data-request-access', requestAccess);
	}
	script.setAttribute('data-userpic', JSON.stringify(Boolean(showAvatar)));
	script.setAttribute('data-lang', lang);

	if (authCallbackUrl) {
		script.setAttribute('data-auth-url', authCallbackUrl);
	} else if (onAuthCallback) {
		script.setAttribute('data-onauth', 'TelegramAuthLogin.onAuthCallback(user)');
	}

	return script;
}
