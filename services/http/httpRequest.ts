import { HttpRequestOptions, HttpResponse } from '@/services/http/http.types';
import { buildResponseHeaders } from '@/services/http/http.utils';

export async function httpRequest<T>({
	path,
	method,
	body,
	accessToken,
	cookies,
}: HttpRequestOptions): Promise<HttpResponse<T>> {
	const headers = buildResponseHeaders({ accessToken, cookies });

	try {
		const res = await fetch(`${process.env.API_BASE_URL}/${path}`, {
			method: method ?? 'GET',
			body: method === 'GET' || !body ? undefined : JSON.stringify(body),
			headers,
			credentials: 'include',
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
