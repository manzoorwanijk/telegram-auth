import { GetServerSidePropsContext } from 'next';
import { signIn, getCsrfToken, getProviders } from 'next-auth/react';
import { LoginButton } from '@telgram-auth/react';

const Signin = ({
	providers,
	csrfToken,
	botUsername,
}: {
	providers: Awaited<ReturnType<typeof getProviders>>;
	csrfToken?: string;
	botUsername: string;
}) => {
	return (
		<div style={{ overflow: 'hidden', position: 'relative' }}>
			<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
			{Object.values(providers || {}).map((provider) => {
				return (
					<div key={provider.name} style={{ display: 'flex', justifyContent: 'center' }}>
						{provider.id === 'telegram-login' ? (
							<>
								<LoginButton
									botUsername={botUsername}
									onAuthCallback={(data) => {
										signIn(provider.id, { callbackUrl: '/' }, data as any);
									}}
								/>
							</>
						) : (
							<>
								{/* Render other providers */}
								<button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
							</>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default Signin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const providers = await getProviders();
	const csrfToken = await getCsrfToken(context);
	const botUsername = process.env.BOT_USERNAME;
	return {
		props: {
			providers,
			csrfToken,
			botUsername,
		},
	};
}
