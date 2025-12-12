import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type Course = {
	id: string;
	slug: string;
	lessonId?: string;
	challengeId?: string;
};

type State = {
	lastVisitedCourse: Course | null;
	hasHydrated: boolean;
};

type Action = {
	setLastVisitedCourse: (course: Course) => void;
	updateLastVisitedCourse: (patch: Partial<Course>) => void;
	clearLastVisitedCourse: () => void;
	markHydrated: () => void;
};

export const useCourseStore = create<State & Action>()(
	devtools(
		persist(
			set => ({
				lastVisitedCourse: null,
				hasHydrated: false,

				setLastVisitedCourse: course => set({ lastVisitedCourse: course }),
				updateLastVisitedCourse: patch =>
					set(state =>
						state.lastVisitedCourse
							? { lastVisitedCourse: { ...state.lastVisitedCourse, ...patch } }
							: state,
					),

				clearLastVisitedCourse: () => set({ lastVisitedCourse: null }),

				markHydrated: () => set({ hasHydrated: true }),
			}),
			{
				name: 'course',
				storage: createJSONStorage(() => localStorage),
				partialize: state => ({
					lastVisitedCourse: state.lastVisitedCourse,
				}),
				onRehydrateStorage: () => state => state?.markHydrated(),
			},
		),
		{ name: 'course-store' },
	),
);

export const useLastVisitedCourse = () =>
	useCourseStore(state => state.lastVisitedCourse);
export const useClearLastVisitedCourse = () =>
	useCourseStore(state => state.clearLastVisitedCourse);
export const useHasHydratedCourseStore = () =>
	useCourseStore(state => state.hasHydrated);
