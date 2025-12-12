'use client';

import { useEffect } from 'react';
import { API_ROUTES, APP_ROUTES } from '@/constants/routes';
import {
	LoginInput,
	loginSchema,
	SignUpInput,
	signUpSchema,
} from '@/lib/validations';
import { useAuthStore, useCourseStore } from '@/store';
import { useRouter } from 'next/navigation';
import { ProviderType, User } from '@/types/auth';
import { httpRequest } from '@/services/http';
import { parseAndValidate } from '@/services/utils';
import { toast } from 'sonner';

export const useAuth = () => {
	const router = useRouter();
	const setUser = useAuthStore(state => state.setUser);
	const setStatus = useAuthStore(state => state.setStatus);
	const clearSession = useAuthStore(state => state.clearSession);
	const clearLastVisitedCourse = useCourseStore(
		state => state.clearLastVisitedCourse,
	);

	const login = async (credentials: LoginInput) => {
		const parsed = await parseAndValidate(credentials, loginSchema);

		if (!parsed.ok) {
			toast.error(parsed.body.message);
			return;
		}

		const response = await httpRequest<User>({
			path: API_ROUTES.AUTH.LOGIN,
			method: 'POST',
			body: parsed.data,
			type: 'client',
		});
		if (response.ok) {
			setUser(response.body);
			setStatus('authenticated');
		} else {
			setStatus('unauthenticated');
		}

		router.push(APP_ROUTES.HOME);
	};

	const signup = async (data: SignUpInput) => {
		const parsed = await parseAndValidate(data, signUpSchema);

		if (!parsed.ok) {
			toast.error(parsed.body.message);
			return;
		}

		const response = await httpRequest<User>({
			path: API_ROUTES.AUTH.SIGNUP,
			method: 'POST',
			body: {
				email: parsed.data.email,
				password: parsed.data.password,
			},
			type: 'client',
		});
		if (response.ok) {
			setUser(response.body);
			setStatus('authenticated');
		} else {
			setStatus('unauthenticated');
		}

		router.push(APP_ROUTES.HOME);
	};

	const logout = async () => {
		await httpRequest({
			path: API_ROUTES.AUTH.LOGOUT,
			method: 'POST',
			body: undefined,
			type: 'client',
		});

		clearSession();
		clearLastVisitedCourse();
		setStatus('unauthenticated');
	};

	const refresh = async () => {
		await httpRequest({
			path: API_ROUTES.AUTH.REFRESH,
			method: 'POST',
			body: undefined,
			type: 'client',
		});
	};

	const getMe = async () => {
		return await httpRequest<User>({
			path: API_ROUTES.AUTH.ME,
			method: 'GET',
			body: undefined,
			type: 'client',
		});
	};

	return {
		login,
		signup,
		logout,
		refresh,
		getMe,
	};
};

export const useOAuth = () => {
	const router = useRouter();
	const setUser = useAuthStore(state => state.setUser);
	const setStatus = useAuthStore(state => state.setStatus);

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
				setStatus('unauthenticated');
				return;
			}

			setUser(event.data.user);
			setStatus('authenticated');
			router.push(APP_ROUTES.HOME);
		};

		window.addEventListener('message', handleOAuthCallback);
		return () => {
			window.removeEventListener('message', handleOAuthCallback);
		};
	}, [router, setUser, setStatus]);

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
