import { HttpRequestOptions, HttpResponse } from './types';
import { getApiUrl } from '@/services/utils';

export async function httpRequest<T>({
	path,
	method,
	body,
	cookies,
}: HttpRequestOptions): Promise<HttpResponse<T>> {
	try {
		const res = await fetch(`${getApiUrl()}/${path}`, {
			method,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				...{
					Authorization: `Bearer ${cookies?.accessToken || ''}`,
				},
			},
			body: method === 'GET' || !body ? undefined : JSON.stringify(body),
			credentials: 'same-origin',
		});

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
