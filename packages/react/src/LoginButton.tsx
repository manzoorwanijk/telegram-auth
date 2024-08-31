import React, { useEffect, useRef } from 'react';
import { LoginButtonProps, TTelegramAuthLogin } from './types';
import { createScript } from './createScript';

/**
 * It takes an object with a bunch of properties and assigns it to the global variable
 * `TelegramAuthLogin`
 *
 * @param {TTelegramAuthLogin} options - The options to set on the global variable.
 */
function initTelegramAuthLogin(options: TTelegramAuthLogin) {
	window.TelegramAuthLogin = options;
}

/**
 * A React component that renders a Telegram login button.
 *
 * @see https://core.telegram.org/widgets/login
 *
 * @param {LoginButtonProps} props The props to pass to the component.
 * @returns A React component that renders the Telegram login button.
 */
export function LoginButton(props: LoginButtonProps) {
	const hiddenDivRef = useRef<HTMLDivElement>(null);
	const scriptRef = useRef<HTMLScriptElement>();

	useEffect(() => {
		// destroy the existing script element
		scriptRef.current?.remove();

		// init the global variable
		initTelegramAuthLogin({ onAuthCallback: props.onAuthCallback });

		// create a new script element and save it
		scriptRef.current = createScript(props);

		// add the script element to the DOM
		hiddenDivRef.current?.after(scriptRef.current);

		// Save siblings before unmount
		const siblings = hiddenDivRef.current?.parentElement?.children || [];

		return () => {
			// destroy the script element on unmount
			scriptRef.current?.remove();

			// We also need to remove the rendered iframe
			for (const element of siblings) {
				if (element instanceof HTMLIFrameElement && element.src.includes('oauth.telegram.org')) {
					element.remove();
					break;
				}
			}
		};
	}, [props]);

	return <div ref={hiddenDivRef} hidden />;
}
