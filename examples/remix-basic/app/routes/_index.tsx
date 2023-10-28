import { json } from '@remix-run/node';
import { Link, Form } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/node';
import { getSession, commitSession } from '../sessions';
import type { TelegramAuthData } from '@telegram-auth/react';

export const loader: LoaderFunction = async ({ request }) => {
	const session = await getSession(request.headers.get('Cookie'));

	const user: TelegramAuthData = session.get('user');

	const data = { user };

	return json(data, {
		headers: {
			'Set-Cookie': await commitSession(session),
		},
	});
};

export default function Index() {
	const { user } = useLoaderData<typeof loader>();

	return (
		<div className="center">
			{user ? (
				<>
					<h1>Hello {user.first_name}</h1>
					<h4>You are logged in</h4>
					<Form action="/login" method="post">
						<button>Logout</button>
					</Form>
				</>
			) : (
				<>
					<h1>Hello</h1>
					<h4>You are not logged in</h4>
					<p>
						Go to <Link to="/login">Login page</Link> to login
					</p>
				</>
			)}
		</div>
	);
}
