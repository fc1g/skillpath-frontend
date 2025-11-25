'use client';

import { API_ROUTES, APP_ROUTES } from '@/constants/routes';
import { LoginInput, SignUpInput } from '@/lib/validations';
import { useAuthStore, useCourseStore } from '@/store';
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
	const clearSession = useAuthStore(state => state.clearSession);
	const clearLastVisitedCourse = useCourseStore(
		state => state.clearLastVisitedCourse,
	);
	const router = useRouter();

	const login = async (credentials: LoginInput) => {
		await authRequest<LoginInput>(
			API_ROUTES.AUTH.LOGIN,
			credentials,
			'Login failed',
		);

		router.push(APP_ROUTES.HOME);
	};

	const signup = async (credentials: SignUpInput) => {
		await authRequest<SignUpInput>(
			API_ROUTES.AUTH.SIGNUP,
			credentials,
			'Signup failed',
		);

		clearLastVisitedCourse();

		router.push(APP_ROUTES.HOME);
	};

	const logout = async () => {
		await authRequest(API_ROUTES.AUTH.LOGOUT, undefined, 'Logout failed');
		clearSession();
		router.push(APP_ROUTES.LOGIN);
	};

	const refresh = async () => {
		await authRequest(
			API_ROUTES.AUTH.REFRESH,
			undefined,
			'Failed to rotate tokens',
		);

		router.push(APP_ROUTES.HOME);
	};

	const startOauth = useCallback((provider: 'github' | 'google') => {
		window.location.href = `/api/v1/oauth/${provider}`;
	}, []);

	return {
		login,
		signup,
		logout,
		refresh,
		startOauth,
	};
};
