import { HttpResponse } from '@/services/http';
import { NextResponse } from 'next/server';

export function createApiResponse<T>(
	backendResponse: HttpResponse<T>,
): NextResponse {
	let res: NextResponse;

	if (backendResponse.status === 204) {
		res = new NextResponse(null, { status: 204 });
	} else {
		res = NextResponse.json(backendResponse.body, {
			status: backendResponse.status,
		});
	}

	if (backendResponse.setCookies) {
		for (const cookie of backendResponse.setCookies) {
			res.headers.append('set-cookie', cookie);
		}
	}

	return res;
}

export function clearAuthCookies(response: NextResponse): void {
	response.cookies.set('refreshToken', '', {
		maxAge: 0,
		path: '/',
	});

	response.cookies.set('accessToken', '', {
		maxAge: 0,
		path: '/',
	});
}
