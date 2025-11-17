import type { ZodType } from 'zod';

type ParseSuccess<T> = {
	ok: true;
	data: T;
};

type ParseFailure = {
	ok: false;
	status: number;
	body: {
		message: string;
		error: string | string[];
		statusCode: number;
	};
};

export type ParseAndValidateResult<T> = ParseSuccess<T> | ParseFailure;

export async function parseAndValidate<T>(
	request: Request,
	schema: ZodType<T>,
): Promise<ParseAndValidateResult<T>> {
	try {
		const requestBody = await request.json();
		return {
			ok: true,
			data: schema.parse(requestBody),
		};
	} catch (err) {
		const message =
			err instanceof Error ? err.message : 'Please provide valid data';

		return {
			ok: false,
			status: 400,
			body: {
				message,
				error: message,
				statusCode: 400,
			},
		};
	}
}
