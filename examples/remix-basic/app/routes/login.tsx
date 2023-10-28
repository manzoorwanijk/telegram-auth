import { json, redirect } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { LoginButton } from '@telegram-auth/react';

import { getSession, commitSession, destroySession } from '../sessions';

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get('Cookie'));

	if (session.has('user')) {
		return redirect('/');
	}

	const botUsername = process.env.BOT_USERNAME || '';

	const data = { error: session.get('error'), botUsername };

	return json(data, {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	});
};

export const action: ActionFunction = async ({ request }) => {
	const session = await getSession(request.headers.get('Cookie'));

	return redirect('/', {
		headers: {
			'Set-Cookie': await destroySession(session),
		},
	});
};

export default function Login() {
	const { botUsername, error } = useLoaderData<typeof loader>();

	return (
		<div className="center">
			{error ? <div className="error">{error}</div> : null}
			<br />
			<div className="telegram-login">
				<LoginButton botUsername={botUsername} authCallbackUrl="/auth" />
			</div>
			<p>
				Go to <Link to="/">Home page</Link>
			</p>
		</div>
	);
}
