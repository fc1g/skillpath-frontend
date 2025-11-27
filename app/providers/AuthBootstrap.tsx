'use client';

import { useAuth } from '@/hooks';
import { useEffect } from 'react';
import { useUser } from '@/store';

export default function AuthBootstrap() {
	const { getMe } = useAuth();
	const user = useUser();

	useEffect(() => {
		if (user) return;
		(async () => {
			await getMe();
		})();
	}, [getMe, user]);

	return null;
}
