import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { Box, Heading } from '@chakra-ui/react';

export default async function Home() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<Box>
				<Heading as="h1">Not logged in to see what is here</Heading>
			</Box>
		);
	}

	return (
		<Box>
			<Heading as="h1">You can see this because you are logged in.</Heading>
			<pre>{JSON.stringify(session.user, null, 2)}</pre>
		</Box>
	);
}
