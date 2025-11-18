import { User } from '@/types';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from 'zustand/react';

type State = {
	user: User | null;
	hasHydrated: boolean;
};

type Action = {
	setUser: (user: User) => void;
	updateUser: (
		patch: Partial<Omit<User, 'id' | 'updatedAt' | 'createdAt'>>,
	) => void;
	clearSession: () => void;

	markHydrated: () => void;
};

export const useAuthStore = create<State & Action>()(
	devtools(
		persist(
			set => ({
				user: null,
				hasHydrated: false,

				setUser: user => set({ user }),
				updateUser: patch =>
					set(state =>
						state.user ? { user: { ...state.user, ...patch } } : state,
					),
				clearSession: () => set({ user: null }),

				markHydrated: () => set({ hasHydrated: true }),
			}),
			{
				name: 'auth',
				storage: createJSONStorage(() => sessionStorage),
				partialize: state => ({ user: state.user }),
				onRehydrateStorage: () => state => state?.markHydrated(),
			},
		),
		{ name: 'auth-store' },
	),
);

export const useUser = () => useAuthStore(state => state.user);
export const useIsAuthenticated = () => useAuthStore(state => !!state.user);
export const useHasHydrated = () => useAuthStore(state => state.hasHydrated);
