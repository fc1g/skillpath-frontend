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
		LOGIN: '/api/auth/login',
		SIGNUP: '/api/auth/signup',
		LOGOUT: '/api/auth/logout',
		REFRESH: '/api/auth/refresh',
		ME: '/api/auth/me',
	},
} as const;
