import type { User } from '@/types/auth/user';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

type State = {
	user: User | null;
	status: AuthStatus;
	hasHydrated: boolean;
};

type Action = {
	setUser: (user: User) => void;
	updateUser: (patch: Partial<User>) => void;
	setStatus: (status: AuthStatus) => void;
	clearSession: () => void;
	markHydrated: () => void;
};

export const useAuthStore = create<State & Action>()(
	devtools(
		persist(
			set => ({
				user: null,
				hasHydrated: false,
				status: 'idle',

				setUser: user => set({ user }),
				updateUser: patch =>
					set(state =>
						state.user ? { user: { ...state.user, ...patch } } : state,
					),
				setStatus: status => set({ status }),

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
export const useStatus = () => useAuthStore(state => state.status);
export const useHasHydratedAuthStore = () =>
	useAuthStore(state => state.hasHydrated);
