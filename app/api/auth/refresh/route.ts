import { httpRequest } from '@/services/http';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const backendResponse = await httpRequest<{ accessToken: string }>({
		path: 'auth/refresh',
		method: 'POST',
		cookies: request.headers.get('cookie') ?? undefined,
	});

	if (!backendResponse.ok) {
		return NextResponse.json(backendResponse.body, {
			status: backendResponse.status,
		});
	}

	const res = NextResponse.json(backendResponse.body, {
		status: backendResponse.status,
	});

	if (backendResponse.setCookies) {
		for (const cookie of backendResponse.setCookies) {
			res.headers.append('Set-Cookie', cookie);
		}
	}

	return res;
}
