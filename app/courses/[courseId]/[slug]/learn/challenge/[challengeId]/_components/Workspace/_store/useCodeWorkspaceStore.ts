import { create } from 'zustand/react';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type State = {
	drafts: Record<string, string>;

	hasHydrated: boolean;
};

type Action = {
	setDraft: (id: string, code: string) => void;
	clearDraft: (id: string) => void;

	markHydrated: () => void;
};

export const useCodeWorkspaceStore = create<State & Action>()(
	devtools(
		persist(
			set => ({
				drafts: {},
				hasHydrated: false,

				setDraft: (id, code) =>
					set(state => ({ drafts: { ...state.drafts, [id]: code } })),
				clearDraft: id =>
					set(state => {
						const { [id]: _, ...rest } = state.drafts;
						return { drafts: rest };
					}),

				markHydrated: () => set(() => ({ hasHydrated: true })),
			}),
			{
				name: 'code-drafts',
				storage: createJSONStorage(() => localStorage),
				partialize: state => ({ drafts: state.drafts }),
				onRehydrateStorage: () => state => state?.markHydrated(),
			},
		),
		{ name: 'code-workspace-store' },
	),
);

export const useDraft = (id: string) =>
	useCodeWorkspaceStore(state => state.drafts[id]);
export const useHasHydratedWorkspace = () =>
	useCodeWorkspaceStore(state => state.hasHydrated);
