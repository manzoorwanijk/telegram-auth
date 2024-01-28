'use client';
import { Box, Button, Card, CardBody, CardFooter, Heading, Image, SkeletonText, Stack, Text } from '@chakra-ui/react';
import { LoginButton } from '@telegram-auth/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import type { User } from '../app/api/auth/[...nextauth]/route';

function LoadingPlaceholder() {
	return (
		<Box padding="6" boxShadow="lg" bg="white">
			<SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
		</Box>
	);
}

export function Info({ botUsername }: { botUsername: string }) {
	const { data: session, status } = useSession();

	if (status === 'loading') {
		return <LoadingPlaceholder />;
	}

	const user = session?.user as User;

	if (status === 'authenticated') {
		return (
			<Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
				{user?.image ? (
					<Image objectFit="contain" maxW={{ base: '100%', sm: '200px' }} src={user?.image} alt="" />
				) : null}
				<Stack>
					<CardBody>
						<Heading size="md">Hello</Heading>
						<Text as="i">You are signed in as</Text>&nbsp;
						<Text as="b">{user.name}</Text>
					</CardBody>
					<CardFooter>
						<Button
							variant="solid"
							colorScheme="blue"
							as="a"
							onClick={() => {
								signOut();
							}}
						>
							{'Sign out'}
						</Button>
					</CardFooter>
				</Stack>
			</Card>
		);
	}

	return (
		<Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
			<CardBody>
				<Heading size="md">Hello</Heading>

				<Text py="2">
					<Text as="i">You are not signed in</Text>
				</Text>
			</CardBody>
			<CardFooter>
				<LoginButton
					botUsername={botUsername}
					onAuthCallback={(data) => {
						signIn('telegram-login', { callbackUrl: '/' }, data as any);
					}}
				/>
			</CardFooter>
		</Card>
	);
}
