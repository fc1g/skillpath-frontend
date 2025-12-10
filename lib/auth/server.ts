import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

export async function getServerUserId(): Promise<string | null> {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get('accessToken')?.value;

	if (!accessToken) return null;

	try {
		const decoded = jwtDecode<{ userId: string }>(accessToken);
		return decoded.userId;
	} catch {
		return null;
	}
}
