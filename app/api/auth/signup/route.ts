import { httpRequest } from '@/services/http/httpRequest';
import { NextResponse } from 'next/server';
import { parseAndValidate } from '@/lib/api/parse-and-validate-body';
import { SignUpInput, signUpSchema } from '@/lib/validations/auth.schema';

export async function POST(request: Request) {
	const parsedBody = await parseAndValidate<SignUpInput>(request, signUpSchema);

	if (!parsedBody.ok) {
		return NextResponse.json(parsedBody.body, { status: parsedBody.status });
	}

	const backendResponse = await httpRequest<{ accessToken: string }>({
		path: '/auth/signup',
		method: 'POST',
		body: {
			email: parsedBody.data.email,
			password: parsedBody.data.password,
		},
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
