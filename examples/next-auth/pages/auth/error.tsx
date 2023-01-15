import { Container, Center, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Error = () => {
	const router = useRouter();

	return (
		<Container h="100vh" display="flex" justifyContent="center">
			<Center flexDir="column" gap="2rem">
				<Alert
					status="error"
					variant="subtle"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					textAlign="center"
					height="200px"
				>
					<AlertIcon boxSize="40px" mr={0} />
					<AlertTitle mt={4} mb={1} fontSize="lg">
						Error!
					</AlertTitle>
					<AlertDescription maxWidth="sm">{router.query.error}</AlertDescription>
				</Alert>
				<Button
					variant="link"
					as="a"
					onClick={(e) => {
						e.preventDefault();
						router.push('/');
					}}
				>
					Home
				</Button>
			</Center>
		</Container>
	);
};

export default Error;
