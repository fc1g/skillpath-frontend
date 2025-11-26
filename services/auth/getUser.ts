import { httpRequest } from '@/services/http';
import { User } from '@/types/auth';

export async function getUser(accessToken?: string) {
	if (!accessToken) {
		return null;
	}

	const backendResponse = await httpRequest<User>({
		path: 'users/me',
		method: 'GET',
		accessToken: accessToken,
	});
	if (!backendResponse.ok) {
		return null;
	}

	return backendResponse.body;
}
