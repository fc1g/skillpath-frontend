import { NextResponse } from 'next/server';
import { httpRequest } from '@/services/http/httpRequest';

export async function POST(request: Request) {
	const backendResponse = await httpRequest({
		path: 'auth/logout',
		method: 'POST',
		cookies: request.headers.get('cookie') ?? undefined,
	});

	if (!backendResponse.ok) {
		return NextResponse.json(backendResponse.body, {
			status: backendResponse.status,
		});
	}

	let res: NextResponse;

	if (backendResponse.status === 204) {
		res = new NextResponse(null, { status: 204 });
	} else {
		res = NextResponse.json(backendResponse.body || {}, {
			status: backendResponse.status,
		});
	}

	if (backendResponse.setCookies) {
		for (const cookie of backendResponse.setCookies) {
			res.headers.append('set-cookie', cookie);
		}
	}

	res.cookies.set('refreshToken', '', {
		maxAge: 0,
		path: '/',
	});

	res.cookies.set('accessToken', '', {
		maxAge: 0,
		path: '/',
	});

	return res;
}
