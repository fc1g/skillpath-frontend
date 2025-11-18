'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { User } from '@/types';

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
	}, []);

	return null;
}
