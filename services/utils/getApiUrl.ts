import { INTERNAL_API_URL, NEXT_PUBLIC_API_URL } from '@/config/env';

export const getApiUrl = () => {
	const isServer = typeof window === 'undefined';
	return isServer ? INTERNAL_API_URL : NEXT_PUBLIC_API_URL;
};
