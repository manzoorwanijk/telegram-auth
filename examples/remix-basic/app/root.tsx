import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import styles from './style.css';

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<div id="root">
					<Outlet />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</div>
			</body>
		</html>
	);
}

export function links() {
	return [{ rel: 'stylesheet', href: styles }];
}
