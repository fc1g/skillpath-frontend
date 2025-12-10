import { HttpRequestOptions, HttpResponse } from './types';
import { INTERNAL_API_URL, NEXT_PUBLIC_API_URL } from '@/config/env';

export async function httpRequest<T>({
	path,
	method,
	body,
	type = 'server',
}: HttpRequestOptions): Promise<HttpResponse<T>> {
	try {
		const res = await fetch(
			`${type === 'client' ? NEXT_PUBLIC_API_URL : INTERNAL_API_URL}/${path}`,
			{
				method,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: method === 'GET' || !body ? undefined : JSON.stringify(body),
				credentials: 'same-origin',
			},
		);

		let responseBody;

		if (res.status === 204) {
			responseBody = null;
		} else {
			responseBody = await res.json().catch(() => ({
				error: res?.statusText,
			}));
		}

		return {
			ok: res.ok,
			status: res.status,
			body: responseBody,
			headers: res.headers,
			...(res.ok && { setCookies: res.headers.getSetCookie() }),
		};
	} catch (err) {
		const message =
			err instanceof Error
				? err.message
				: 'Failed to connect to backend service';

		return {
			ok: false,
			status: 502,
			body: {
				message,
				error: message,
				statusCode: 502,
			},
		};
	}
}
