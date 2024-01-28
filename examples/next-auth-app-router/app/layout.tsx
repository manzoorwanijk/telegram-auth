import { ChakraProvider } from '@chakra-ui/react';

import type { Metadata } from 'next';
import { AuthProvider } from './auth-provider';
import { Info } from '../components/info';

export const metadata: Metadata = {
	title: 'Telegram Auth',
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProvider>
			<html lang="en">
				<body>
					<ChakraProvider>
						<Info botUsername={`${process.env.BOT_USERNAME}`} />
						<main>{children}</main>
					</ChakraProvider>
				</body>
			</html>
		</AuthProvider>
	);
}
