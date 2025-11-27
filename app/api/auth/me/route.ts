import { httpRequest } from '@/services/http';
import { User } from '@/types/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createApiResponse } from '@/app/api/_helpers';

export async function GET(request: Request) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('accessToken')?.value;

	if (!accessToken) {
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
	}

	const backendResponse = await httpRequest<{ user: User }>({
		path: 'users/me',
		method: 'GET',
		accessToken,
		cookies: request.headers.get('cookie') ?? undefined,
	});

	return createApiResponse(backendResponse);
}
