'use client';

import { useAuth } from '@/hooks';
import { type ReactNode, useEffect } from 'react';
import { useAuthStore, useUser } from '@/store';

export default function AuthBootstrap({
	children,
}: Readonly<{ children: ReactNode }>) {
	const { getMe } = useAuth();
	const user = useUser();
	const status = useAuthStore(state => state.status);
	const setUser = useAuthStore(state => state.setUser);
	const clearSession = useAuthStore(state => state.clearSession);
	const setStatus = useAuthStore(state => state.setStatus);

	useEffect(() => {
		if (status !== 'idle' || user) return;

		setStatus('loading');

		void getMe()
			.then(res => {
				if (res.ok) {
					setUser(res.body);
					setStatus('authenticated');
				} else {
					clearSession();
					setStatus('unauthenticated');
				}
			})
			.catch(err => {
				console.error('💥', err);
				clearSession();
				setStatus('unauthenticated');
			});
	}, [getMe, status, user, setStatus, setUser, clearSession]);

	return children;
}
