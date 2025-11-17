import { HttpRequestOptions } from '@/services/http/http.types';

export function buildResponseHeaders({
	accessToken,
	cookies,
}: Pick<HttpRequestOptions, 'accessToken' | 'cookies'>): HeadersInit {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};

	if (accessToken) {
		headers.Authorization = `Bearer ${accessToken}`;
	}

	if (cookies) {
		headers.Cookie = cookies;
	}

	return headers;
}
