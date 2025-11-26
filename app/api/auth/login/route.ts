import { LoginInput, loginSchema } from '@/lib/validations';
import { NextResponse } from 'next/server';
import { parseAndValidate } from '@/services/utils';
import { httpRequest } from '@/services/http';
import { createApiResponse } from '@/app/api/_helpers';

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

	return createApiResponse(backendResponse);
}
