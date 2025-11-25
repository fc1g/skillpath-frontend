import { LoginInput, loginSchema } from '@/lib/validations';
import { NextResponse } from 'next/server';
import { parseAndValidate } from '@/services/utils';
import { httpRequest } from '@/services/http';

export async function POST(request: Request) {
	const parsedBody = await parseAndValidate<LoginInput>(request, loginSchema);

	if (!parsedBody.ok) {
		return NextResponse.json(parsedBody.body, { status: parsedBody.status });
	}

	const backendResponse = await httpRequest<{ accessToken: string }>({
		path: 'auth/login',
		method: 'POST',
		body: parsedBody.data,
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
			res.headers.append('set-cookie', cookie);
		}
	}

	return res;
}
