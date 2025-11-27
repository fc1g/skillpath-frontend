'use client';

import { notFound, usePathname, useRouter } from 'next/navigation';

const validDashboardRoutes = ['profile', 'courses', 'assistant'] as const;

export type DashboardRoute = (typeof validDashboardRoutes)[number];

export function useDashboardTab() {
	const pathname = usePathname();
	const router = useRouter();

	const segments = pathname.split('/').filter(Boolean);
	const lastSegment = segments[segments.length - 1];

	const activeTab: DashboardRoute =
		lastSegment === 'dashboard' ? 'profile' : (lastSegment as DashboardRoute);

	if (!validDashboardRoutes.includes(activeTab)) {
		notFound();
	}

	const navigateToTab = (tab: string) => {
		if (!validDashboardRoutes.includes(tab as DashboardRoute)) {
			return;
		}

		if (tab === 'profile') {
			router.push('/dashboard');
		} else {
			router.push(`/dashboard/${tab}`);
		}
	};

	return {
		activeTab,
		navigateToTab,
	};
}
