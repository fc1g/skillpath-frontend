import { create } from 'zustand/react';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type State = {
	forgotPasswordEmail: string | null;
	forgotPasswordLastSentAt: number | null;

	hasHydrated: boolean;
};

type Action = {
	setForgotPasswordEmail: (email: string | null) => void;
	setForgotPasswordLastSentAt: (timestamp: number | null) => void;
	clearForgotPassword: () => void;

	markHydrated: () => void;
};

export const useAuthStore = create<State & Action>()(
	devtools(
		persist(
			set => ({
				forgotPasswordEmail: null,
				forgotPasswordLastSentAt: null,
				hasHydrated: false,

				setForgotPasswordEmail: email => set({ forgotPasswordEmail: email }),
				setForgotPasswordLastSentAt: timestamp =>
					set({ forgotPasswordLastSentAt: timestamp }),
				clearForgotPassword: () =>
					set({ forgotPasswordEmail: null, forgotPasswordLastSentAt: null }),
				markHydrated: () => set({ hasHydrated: true }),
			}),
			{
				name: 'auth',
				storage: createJSONStorage(() => sessionStorage),
				partialize: state => ({
					forgotPasswordEmail: state.forgotPasswordEmail,
					forgotPasswordLastSentAt: state.forgotPasswordLastSentAt,
				}),
				onRehydrateStorage: () => state => state?.markHydrated(),
			},
		),
		{ name: 'auth-store' },
	),
);

export const useForgotPasswordEmail = () =>
	useAuthStore(state => state.forgotPasswordEmail);
export const useHasHydratedAuthStore = () =>
	useAuthStore(state => state.hasHydrated);
