'use client';

import { useAuthStore } from '@/store';
import { User } from '@/types';
import { useEffect } from 'react';

type AuthBootstrapProps = {
	user: User | null;
};

export default function AuthBootstrap({ user }: AuthBootstrapProps) {
	const setUser = useAuthStore(state => state.setUser);
	const clearSession = useAuthStore(state => state.clearSession);

	useEffect(() => {
		if (user) {
			setUser(user);
		} else {
			clearSession();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
}
