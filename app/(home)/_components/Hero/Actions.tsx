'use client';

import { APP_ROUTES } from '@/constants/routes';
import ActionBtn from './ActionBtn';
import { useHasHydratedCourseStore, useLastVisitedCourse } from '@/store';

export default function Actions() {
	const lastVisitedCourse = useLastVisitedCourse();
	const hasHydrated = useHasHydratedCourseStore();

	const getContinueLearningHref = () => {
		if (!lastVisitedCourse) return null;

		const baseUrl = `${APP_ROUTES.COURSES}/${lastVisitedCourse.id}/${lastVisitedCourse.slug}/learn`;

		if (lastVisitedCourse.lessonId) {
			return `${baseUrl}/lesson/${lastVisitedCourse.lessonId}`;
		}

		if (lastVisitedCourse.challengeId) {
			return `${baseUrl}/challenge/${lastVisitedCourse.challengeId}`;
		}

		return baseUrl;
	};

	const continueHref = getContinueLearningHref();

	return (
		<div className="flex flex-col items-center justify-center gap-4 px-2 sm:flex-row">
			{hasHydrated && continueHref && (
				<ActionBtn
					label="Continue Learning"
					href={continueHref}
					variant="default"
				/>
			)}

			<ActionBtn
				label="Browse Courses"
				href={APP_ROUTES.COURSES}
				variant={!lastVisitedCourse ? 'default' : 'outline'}
			/>
		</div>
	);
}
