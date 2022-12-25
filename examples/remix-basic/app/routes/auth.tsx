import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import { urlStrToAuthDataMap, AuthDataValidator } from '@telgram-auth/server';

import { getSession, commitSession } from '../sessions';

export async function loader({ request }: LoaderArgs) {
	const validator = new AuthDataValidator({ botToken: process.env.BOT_TOKEN || '' });

	const session = await getSession(request.headers.get('Cookie'));

	const data = urlStrToAuthDataMap(request.url);

	const user = await validator.validate(data);

	if (!user.id || !user.first_name) {
		session.flash('error', 'Incomplete data');

		// Redirect back to the login page with errors.
		return redirect('/login', {
			headers: {
				'Set-Cookie': await commitSession(session),
			},
		});
	}

	session.set('user', user);

	// Login succeeded, send them to the home page.
	return redirect('/', {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	});
}

export default function Login() {
	const { error } = useLoaderData();

	return <div>{error ? <div className="error">{error}</div> : null}</div>;
}
