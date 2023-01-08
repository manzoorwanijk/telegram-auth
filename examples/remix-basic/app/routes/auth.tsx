import { redirect } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/node';
import { urlStrToAuthDataMap, AuthDataValidator } from '@telegram-auth/server';

import { getSession, commitSession } from '../sessions';

export async function loader({ request }: LoaderArgs) {
	const validator = new AuthDataValidator({ botToken: `${process.env.BOT_TOKEN}` });

	const session = await getSession(request.headers.get('Cookie'));

	const data = urlStrToAuthDataMap(request.url);

	try {
		const user = await validator.validate(data);

		session.set('user', user);
	} catch (error: any) {
		session.flash('error', error.message);

		// Redirect back to the login page with errors.
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	// Login succeeded, send them to the home page.
	return redirect('/', {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	});
}
