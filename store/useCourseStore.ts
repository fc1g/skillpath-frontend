import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from 'zustand/react';

type State = {
	lastVisitedCourseId: string | null;
	hasHydratedCourse: boolean;
};

type Action = {
	setLastVisitedCourseId: (courseId: string) => void;
	clearLastVisitedCourseId: () => void;

	markHydratedCourse: () => void;
};

export const useCourseStore = create<State & Action>()(
	devtools(
		persist(
			set => ({
				lastVisitedCourseId: null,
				hasHydratedCourse: false,

				setLastVisitedCourseId: courseId =>
					set({ lastVisitedCourseId: courseId }),
				clearLastVisitedCourseId: () => set({ lastVisitedCourseId: null }),

				markHydratedCourse: () => set({ hasHydratedCourse: true }),
			}),
			{
				name: 'course',
				storage: createJSONStorage(() => localStorage),
				partialize: state => ({
					lastVisitedCourseId: state.lastVisitedCourseId,
				}),
				onRehydrateStorage: () => state => state?.markHydratedCourse(),
			},
		),
		{ name: 'course-store' },
	),
);

export const useLastVisitedCourseId = () =>
	useCourseStore(state => state.lastVisitedCourseId);
export const useHasHydratedCourse = () =>
	useCourseStore(state => state.hasHydratedCourse);
