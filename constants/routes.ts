export const APP_ROUTES = {
	HOME: '/',
	COURSES: '/courses',
	LOGIN: '/login',
	SIGNUP: '/signup',
} as const;

export const API_ROUTES = {
	AUTH: {
		LOGIN: '/api/auth/login',
		SIGNUP: '/api/auth/signup',
		LOGOUT: '/api/auth/logout',
		REFRESH: '/api/auth/refresh',
	},
} as const;

export type AppRoute = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
export type ApiRoute = (typeof API_ROUTES)[keyof typeof API_ROUTES];
