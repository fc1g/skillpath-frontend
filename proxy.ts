import { NextRequest, NextResponse } from 'next/server';
import { APP_ROUTES } from '@/constants/routes';

export default function proxy(request: NextRequest) {
	const refreshToken = request.cookies.get('refreshToken')?.value;

	if (!refreshToken) {
		return NextResponse.redirect(new URL(APP_ROUTES.SIGNUP, request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|icons|login|signup).*)',
	],
};
