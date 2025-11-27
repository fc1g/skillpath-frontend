import type { User } from '@/types/auth/user';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';

type State = {
	user: User | null;
	hasHydratedAuth: boolean;
};

type Action = {
	setUser: (user: User) => void;
	updateUser: (patch: Partial<User>) => void;
	clearSession: () => void;
	markHydratedAuth: () => void;
};

export const useAuthStore = create<State & Action>()(
	devtools(
		persist(
			set => ({
				user: null,
				hasHydratedAuth: false,

				setUser: user => set({ user }),
				updateUser: patch =>
					set(state =>
						state.user ? { user: { ...state.user, ...patch } } : state,
					),

				clearSession: () => set({ user: null }),

				markHydratedAuth: () => set({ hasHydratedAuth: true }),
			}),
			{
				name: 'auth',
				storage: createJSONStorage(() => sessionStorage),
				partialize: state => ({ user: state.user }),
				onRehydrateStorage: () => state => state?.markHydratedAuth(),
			},
		),
		{ name: 'auth-store' },
	),
);

export const useUser = () => useAuthStore(state => state.user);
export const useIsAuthenticated = () => useAuthStore(state => !!state.user);
export const useHasAuthHydrated = () =>
	useAuthStore(state => state.hasHydratedAuth);
