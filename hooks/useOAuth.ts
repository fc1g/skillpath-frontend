import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { APP_ROUTES } from '@/constants/routes';
import { ProviderType } from '@/types/auth';
import { useQueryClient } from '@tanstack/react-query';
import { PROFILE_QUERY_KEY } from '@/hooks/queries';

export const useOAuth = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	useEffect(() => {
		const handleOAuthCallback = async (event: MessageEvent) => {
			if (event.origin !== window.location.origin || !event.data) {
				return;
			}

			const expectedState = sessionStorage.getItem('oauth_state');
			if (!expectedState) {
				console.warn('OAuth state not found, ignoring message');
				return;
			}

			if (event.data.state !== expectedState) {
				console.warn('OAuth state mismatch, ignoring message');
				return;
			}

			sessionStorage.removeItem('oauth_state');

			if (!event.data.ok || !event.data.user) {
				console.error('OAuth failed:', event.data.error);
				return;
			}

			queryClient.setQueryData(PROFILE_QUERY_KEY, event.data.user);
			router.push(APP_ROUTES.HOME);
		};

		window.addEventListener('message', handleOAuthCallback);
		return () => {
			window.removeEventListener('message', handleOAuthCallback);
		};
	}, [router, queryClient]);

	const startOAuth = (provider: ProviderType) => {
		const width = 500;
		const height = 600;
		const left = window.screen.width / 2 - width / 2;
		const top = window.screen.height / 2 - height / 2;

		const state = crypto.randomUUID();
		sessionStorage.setItem('oauth_state', state);

		window.open(
			`/api/v1/oauth/${provider}?state=${state}`,
			'OAuth Login',
			`width=${width},height=${height},left=${left},top=${top}`,
		);
	};

	return {
		startOAuth,
	};
};
