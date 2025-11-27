import { httpRequest } from '@/services/http';
import { createApiResponse } from '@/app/api/_helpers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const backendResponse = await httpRequest<{ accessToken: string }>({
		path: 'auth/refresh',
		method: 'POST',
		cookies: request.headers.get('cookie') ?? undefined,
	});

	if (!backendResponse.ok && backendResponse.status === 401) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	return createApiResponse(backendResponse);
}
