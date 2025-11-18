import { httpRequest } from '@/services/http/httpRequest';
import { User } from '@/types';

export async function getUser(accessToken?: string) {
	if (!accessToken) {
		return null;
	}

	const backendResponse = await httpRequest<User>({
		path: '/users/me',
		method: 'GET',
		accessToken: accessToken,
	});
	if (!backendResponse.ok) {
		return null;
	}

	return backendResponse.body;
}
