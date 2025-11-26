import { httpRequest } from '@/services/http';
import { clearAuthCookies, createApiResponse } from '@/app/api/_helpers';

export async function POST(request: Request) {
	const backendResponse = await httpRequest({
		path: 'auth/logout',
		method: 'POST',
		cookies: request.headers.get('cookie') ?? undefined,
	});

	const res = createApiResponse(backendResponse);
	clearAuthCookies(res);

	return res;
}
