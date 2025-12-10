'use client';

import { useAuth } from '@/hooks';
import { useEffect } from 'react';
import { useHasAuthHydrated, useUser } from '@/store';
import { usePathname } from 'next/navigation';

export default function AuthBootstrap() {
	const pathname = usePathname();

	const { getMe } = useAuth();
	const user = useUser();
	const hasHydratedAuth = useHasAuthHydrated();

	useEffect(() => {
		if (!hasHydratedAuth) return;
		if (user || pathname.startsWith('/auth')) return;
		void getMe().catch(() => {});
	}, [getMe, user, pathname, hasHydratedAuth]);

	return null;
}
