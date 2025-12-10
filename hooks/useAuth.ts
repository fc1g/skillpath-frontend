'use client';

import { API_ROUTES, APP_ROUTES } from '@/constants/routes';
import {
	LoginInput,
	loginSchema,
	SignUpInput,
	signUpSchema,
} from '@/lib/validations';
import { useAuthStore, useCourseStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ProviderType, User } from '@/types/auth';
import { httpRequest } from '@/services/http';
import { parseAndValidate } from '@/services/utils';
import { toast } from 'sonner';

export const useAuth = () => {
	const router = useRouter();
	const setUser = useAuthStore(state => state.setUser);
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

		await httpRequest({
			path: API_ROUTES.AUTH.LOGIN,
			method: 'POST',
			body: parsed.data,
			type: 'client',
		});

		router.push(APP_ROUTES.HOME);
	};

	const signup = async (data: SignUpInput) => {
		const parsed = await parseAndValidate(data, signUpSchema);

		if (!parsed.ok) {
			toast.error(parsed.body.message);
			return;
		}

		await httpRequest({
			path: API_ROUTES.AUTH.SIGNUP,
			method: 'POST',
			body: {
				email: parsed.data.email,
				password: parsed.data.password,
			},
			type: 'client',
		});

		clearLastVisitedCourse();

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
		router.push(APP_ROUTES.LOGIN);
	};

	const refresh = async () => {
		await httpRequest({
			path: API_ROUTES.AUTH.REFRESH,
			method: 'POST',
			body: undefined,
			type: 'client',
		});

		router.push(APP_ROUTES.HOME);
	};

	const startOAuth = useCallback((provider: ProviderType) => {
		window.location.href = `/api/v1/oauth/${provider}`;
	}, []);

	const getMe = async () => {
		const responseBody = await httpRequest<User>({
			path: API_ROUTES.AUTH.ME,
			method: 'GET',
			body: undefined,
			type: 'client',
		});

		if (!responseBody.ok) {
			await logout();
			throw new Error(responseBody.body.message || 'Failed to fetch user');
		}

		setUser(responseBody.body);
	};

	return {
		login,
		signup,
		logout,
		refresh,
		startOAuth,
		getMe,
	};
};
