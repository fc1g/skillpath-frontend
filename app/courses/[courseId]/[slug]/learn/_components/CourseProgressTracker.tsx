'use client';

import { useEffect, useMemo } from 'react';
import { useDebouncedValue, useUpdateCourseProgress } from '@/hooks';
import { LastVisitedItemType } from '@/types/progress';

type CourseProgressTrackerProps = {
	courseId: string;
	lessonId?: string;
	challengeId?: string;
};

export function CourseProgressTracker({
	courseId,
	lessonId,
	challengeId,
}: CourseProgressTrackerProps) {
	const { updateCourseProgress } = useUpdateCourseProgress();

	const lastVisitedItem = useMemo(() => {
		if (lessonId) {
			return {
				lastVisitedItemId: lessonId,
				lastVisitedItemType: LastVisitedItemType.LESSON.toUpperCase(),
			};
		}

		if (challengeId) {
			return {
				lastVisitedItemId: challengeId,
				lastVisitedItemType: LastVisitedItemType.CHALLENGE.toUpperCase(),
			};
		}

		return null;
	}, [lessonId, challengeId]);

	const debouncedLastVisitedItem = useDebouncedValue(lastVisitedItem, 1000);

	useEffect(() => {
		if (debouncedLastVisitedItem) {
			updateCourseProgress({
				courseId,
				lastVisitedItemId: debouncedLastVisitedItem.lastVisitedItemId,
				lastVisitedItemType: debouncedLastVisitedItem.lastVisitedItemType,
				lastAccessedAt: new Date().toISOString(),
			}).catch(err => {
				console.error('Failed to update course progress:', err);
			});
		}
	}, [debouncedLastVisitedItem, courseId, updateCourseProgress]);

	return null;
}
