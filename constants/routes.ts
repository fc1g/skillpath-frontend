export const APP_ROUTES = {
	HOME: '/',
	COURSES: '/courses',
	LOGIN: '/auth/login',
	SIGNUP: '/auth/signup',
	RESET_PASSWORD: '/auth/reset-password',
	MY_COURSES: '/dashboard/courses',
	PROFILE: '/dashboard/profile',
	AI_ASSISTANT: '/dashboard/assistant',
} as const;

export const API_ROUTES = {
	AUTH: {
		LOGIN: 'auth/login',
		SIGNUP: 'auth/signup',
		LOGOUT: 'auth/logout',
		REFRESH: 'auth/refresh',
		ME: 'users/me',
	},
} as const;
