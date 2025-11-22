import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from 'zustand/react';

type LastVisitedCourse = {
	id: string;
	slug: string;
}

type State = {
	lastVisitedCourse: LastVisitedCourse | null;
	hasHydratedCourse: boolean;
};

type Action = {
	setLastVisitedCourse: (lastVisitedCourse: LastVisitedCourse) => void;
	clearLastVisitedCourse: () => void;

	markHydratedCourse: () => void;
};

export const useCourseStore = create<State & Action>()(
	devtools(
		persist(
			set => ({
				lastVisitedCourse: null,
				hasHydratedCourse: false,

				setLastVisitedCourse: lastVisitedCourse =>
					set({ lastVisitedCourse: {...lastVisitedCourse} }),
				clearLastVisitedCourse: () => set({ lastVisitedCourse: null }),

				markHydratedCourse: () => set({ hasHydratedCourse: true }),
			}),
			{
				name: 'course',
				storage: createJSONStorage(() => localStorage),
				partialize: state => ({
					lastVisitedCourse: state.lastVisitedCourse,
				}),
				onRehydrateStorage: () => state => state?.markHydratedCourse(),
			},
		),
		{ name: 'course-store' },
	),
);

export const useLastVisitedCourse = () =>
	useCourseStore(state => state.lastVisitedCourse);
export const useHasHydratedCourse = () =>
	useCourseStore(state => state.hasHydratedCourse);
