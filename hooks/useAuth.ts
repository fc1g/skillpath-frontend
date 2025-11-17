'use client';

import { API_ROUTES, APP_ROUTES } from '@/constants/routes';
import { LoginInput, SignUpInput } from '@/lib/validations/auth.schema';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

async function authRequest<T>(
	url: string,
	payload: T,
	fallbackErrorMessage: string,
) {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
		credentials: 'include',
	});

	if (res.status === 204) {
		if (!res.ok) throw new Error(fallbackErrorMessage);
		return null;
	}

	const responseBody = await res.json();
	if (!res.ok) throw new Error(responseBody?.message || fallbackErrorMessage);

	return responseBody;
}

export const useAuth = () => {
	const isAuthenticated = useAuthStore(state => state.isAuthenticated);
	const setSession = useAuthStore(state => state.setSession);
	const router = useRouter();

	const login = async (credentials: LoginInput) => {
		const data = await authRequest<LoginInput>(
			API_ROUTES.AUTH.LOGIN,
			credentials,
			'Login failed',
		);

		const { accessToken } = data as { accessToken: string };
		setSession(accessToken);
		router.push(APP_ROUTES.HOME);
	};

	const signup = async (credentials: SignUpInput) => {
		const data = await authRequest<SignUpInput>(
			API_ROUTES.AUTH.SIGNUP,
			credentials,
			'Signup failed',
		);

		const { accessToken } = data as { accessToken: string };
		setSession(accessToken);
		router.push(APP_ROUTES.HOME);
	};

	const logout = async () => {
		await authRequest(API_ROUTES.AUTH.LOGOUT, undefined, 'Logout failed');
		router.push(APP_ROUTES.SIGNUP);
	};

	const refresh = async () => {
		const data = await authRequest(
			API_ROUTES.AUTH.REFRESH,
			undefined,
			'Failed to rotate tokens',
		);

		const { accessToken } = data as { accessToken: string };
		setSession(accessToken);
		router.push(APP_ROUTES.HOME);
	};

	const startOauth = useCallback((provider: 'github' | 'google') => {
		window.location.href = `/api/v1/oauth/${provider}`;
	}, []);

	return {
		isAuthenticated: isAuthenticated(),
		login,
		signup,
		logout,
		refresh,
		startOauth,
	};
};
