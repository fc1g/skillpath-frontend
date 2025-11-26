import { httpRequest } from '@/services/http';
import { NextResponse } from 'next/server';
import { parseAndValidate } from '@/services/utils';
import { SignUpInput, signUpSchema } from '@/lib/validations';
import { createApiResponse } from '@/app/api/_helpers';

export async function POST(request: Request) {
	const parsedBody = await parseAndValidate<SignUpInput>(request, signUpSchema);

	if (!parsedBody.ok) {
		return NextResponse.json(parsedBody.body, { status: parsedBody.status });
	}

	const backendResponse = await httpRequest<{ accessToken: string }>({
		path: 'auth/signup',
		method: 'POST',
		body: {
			email: parsedBody.data.email,
			password: parsedBody.data.password,
		},
	});

	return createApiResponse(backendResponse);
}
