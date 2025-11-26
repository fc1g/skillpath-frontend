import { httpRequest } from '@/services/http';
import { createApiResponse } from '@/app/api/_helpers';

export async function POST(request: Request) {
	const backendResponse = await httpRequest<{ accessToken: string }>({
		path: 'auth/refresh',
		method: 'POST',
		cookies: request.headers.get('cookie') ?? undefined,
	});

	return createApiResponse(backendResponse);
}
