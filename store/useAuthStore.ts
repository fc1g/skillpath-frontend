import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from 'zustand/react';

type State = {
	accessToken: string | null;
};

type Action = {
	setSession: (accessToken: string) => void;
	clearSession: () => void;
	isAuthenticated: () => boolean;
};

export const useAuthStore = create<State & Action>()(
	devtools(
		persist(
			(set, get) => ({
				accessToken: null,

				setSession: (accessToken: string) => set({ accessToken }),
				clearSession: () => set({ accessToken: null }),

				isAuthenticated: () => !!get().accessToken,
			}),
			{
				name: 'auth',
				storage: createJSONStorage(() => sessionStorage),
			},
		),
	),
);
