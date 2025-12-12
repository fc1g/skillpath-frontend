'use client';

import { useCourseStore } from '@/store';
import { useEffect } from 'react';
import { useDebouncedValue, useUpdateCourseProgress } from '@/hooks';

type CourseProgressTrackerProps = {
	courseId: string;
	slug: string;
	lessonId?: string;
	challengeId?: string;
};

export function CourseProgressTracker({
	courseId,
	slug,
	lessonId,
	challengeId,
}: CourseProgressTrackerProps) {
	const setLastVisitedCourse = useCourseStore(
		state => state.setLastVisitedCourse,
	);

	const { updateCourseProgress } = useUpdateCourseProgress();

	const lastVisitedItemId = lessonId || challengeId || null;
	const debouncedLastVisitedItemId = useDebouncedValue(lastVisitedItemId, 1000);

	useEffect(() => {
		setLastVisitedCourse({
			id: courseId,
			slug,
			lessonId,
			challengeId,
		});
	}, [courseId, slug, lessonId, challengeId, setLastVisitedCourse]);

	useEffect(() => {
		if (debouncedLastVisitedItemId) {
			updateCourseProgress({
				courseId,
				lastVisitedItemId: debouncedLastVisitedItemId,
				lastAccessedAt: new Date().toISOString(),
			}).catch(err => {
				console.error('Failed to update course progress:', err);
			});
		}
	}, [debouncedLastVisitedItemId, courseId, updateCourseProgress]);

	return null;
}
