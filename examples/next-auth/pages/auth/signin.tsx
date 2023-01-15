import { GetServerSidePropsContext } from 'next';
import { signIn, getCsrfToken, getProviders } from 'next-auth/react';
import { LoginButton } from '@telegram-auth/react';
import { Container, Center, Button, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Signin = ({
	providers,
	csrfToken,
	botUsername,
}: {
	providers: Awaited<ReturnType<typeof getProviders>>;
	csrfToken?: string;
	botUsername: string;
}) => {
	const router = useRouter();

	return (
		<Container h="100vh" display="flex" justifyContent="center">
			<Center flexDir="column" gap="2rem">
				<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				{Object.values(providers || {}).map((provider) => {
					return (
						<VStack key={provider.name}>
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
						</VStack>
					);
				})}
				<Button
					variant="solid"
					as="a"
					onClick={(e) => {
						e.preventDefault();
						router.push('/');
					}}
				>
					Goto home page
				</Button>
			</Center>
		</Container>
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
