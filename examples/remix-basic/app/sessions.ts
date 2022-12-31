import { createCookieSessionStorage } from '@remix-run/node';

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
	cookie: {
		name: '__session',
		secrets: ['s3cret'],
		secure: true,
	},
});

export { getSession, commitSession, destroySession };
