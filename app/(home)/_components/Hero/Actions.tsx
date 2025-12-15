'use client';

import { APP_ROUTES } from '@/constants/routes';
import ActionBtn from './ActionBtn';
import { useLastVisitedCourse } from '@/hooks';
import { LastVisitedItemType } from '@/types/progress';

export default function Actions() {
	const { data, loading, error } = useLastVisitedCourse();

	const getContinueLearningHref = () => {
		if (loading || !!error || !data) return null;

		const {
			lastVisitedCourse: {
				course: { id: courseId, slug },
				lastVisitedItemId,
				lastVisitedItemType,
			},
		} = data;

		const baseUrl = `${APP_ROUTES.COURSES}/${courseId}/${slug}/learn`;

		if (
			lastVisitedItemType &&
			lastVisitedItemType.toLowerCase() === LastVisitedItemType.LESSON
		) {
			return `${baseUrl}/lesson/${lastVisitedItemId}`;
		}

		if (
			lastVisitedItemType &&
			lastVisitedItemType.toLowerCase() === LastVisitedItemType.CHALLENGE
		) {
			return `${baseUrl}/challenge/${lastVisitedItemId}`;
		}

		return baseUrl;
	};

	const continueHref = getContinueLearningHref();

	return (
		<div className="flex flex-col items-center justify-center gap-4 px-2 sm:flex-row">
			{data && continueHref && (
				<ActionBtn
					label="Continue Learning"
					href={continueHref}
					variant="default"
				/>
			)}

			<ActionBtn
				label="Browse Courses"
				href={APP_ROUTES.COURSES}
				variant={loading || !!error || !data ? 'default' : 'outline'}
			/>
		</div>
	);
}
