export type HttpRequestOptions = {
	path: string;
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body?: unknown;
	type?: 'client' | 'server';
};

export type BackendErrorBody = {
	message: string;
	error: string | string[];
	statusCode: number;
};

export type HttpSuccessResponse<T> = {
	ok: true;
	status: number;
	body: T;
	headers?: Headers;
	setCookies?: string[];
};

export type HttpFailureResponse = {
	ok: false;
	status: number;
	body: BackendErrorBody;
	headers?: Headers;
	setCookies?: string[];
};

export type HttpResponse<T> = HttpSuccessResponse<T> | HttpFailureResponse;
