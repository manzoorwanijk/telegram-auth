import { renderToString } from 'react-dom/server';
import type { EntryContext, HandleDataRequestFunction } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	const markup = renderToString(<RemixServer context={remixContext} url={request.url} />);

	responseHeaders.set('Content-Type', 'text/html');

	return new Response('<!DOCTYPE html>' + markup, {
		status: responseStatusCode,
		headers: responseHeaders,
	});
}

export const handleDataRequest: HandleDataRequestFunction = (response: Response) => {
	response.headers.set('x-custom', 'yay!');
	return response;
};
