import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthDataValidator } from '@telegram-auth/server';
import { objectToAuthDataMap } from '@telegram-auth/server/utils';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'telegram-login',
			name: 'Telegram Login',
			credentials: {},
			async authorize(credentials, req) {
				const validator = new AuthDataValidator({ botToken: `${process.env.BOT_TOKEN}` });

				const data = objectToAuthDataMap(req.query || {});

				const user = await validator.validate(data);

				if (user.id && user.first_name) {
					return {
						id: user.id.toString(),
						name: [user.first_name, user.last_name || ''].join(' '),
						image: user.photo_url,
					};
				}

				return null;
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
		error: '/auth/error',
	},
};

export default NextAuth(authOptions);
