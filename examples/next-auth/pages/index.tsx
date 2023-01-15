import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button, SkeletonText, Box } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function LoadingPlaceholder() {
	return (
		<Box padding="6" boxShadow="lg" bg="white">
			<SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
		</Box>
	);
}

export default function IndexPage() {
	const { data: session, status } = useSession();
	const loading = status === 'loading';
	const router = useRouter();

	if (loading) {
		return <LoadingPlaceholder />;
	}

	const isLoggedIn = !!session?.user;

	return (
		<Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
			{loading ? null : (
				<>
					{session?.user?.image ? (
						<Image
							objectFit="contain"
							maxW={{ base: '100%', sm: '200px' }}
							src={session?.user?.image}
							alt=""
						/>
					) : null}
					<Stack>
						<CardBody>
							<Heading size="md">Hello</Heading>

							<Text py="2">
								{session?.user ? (
									<>
										<Text as="i">You are signed in as</Text>&nbsp;
										<Text as="b">{session.user.email ?? session.user.name}</Text>
									</>
								) : (
									<Text as="i">You are not signed in</Text>
								)}
							</Text>
						</CardBody>
						<CardFooter>
							<Button
								variant="solid"
								colorScheme="blue"
								as="a"
								onClick={(e) => {
									e.preventDefault();
									if (isLoggedIn) {
										router.push('/api/auth/signout');
										signOut();
									} else {
										router.push('/api/auth/signin');
										signIn();
									}
								}}
							>
								{isLoggedIn ? 'Sign out' : 'Sign in'}
							</Button>
						</CardFooter>
					</Stack>
				</>
			)}
		</Card>
	);
}
