'use client';

import {
	ActiveCourses,
	ActiveCoursesSkeleton,
	CompletedCourses,
	CompletedCoursesSkeleton,
} from './_components';
import { useMyCompletedCourses, useMyCourses } from '@/hooks';

export default function MyCoursesPage() {
	const {
		data: activeCourses,
		loading: loadingActiveCourses,
		error: errorActiveCourses,
	} = useMyCourses();
	const {
		data: completedCourses,
		loading: loadingCompletedCourses,
		error: errorCompletedCorses,
	} = useMyCompletedCourses();

	return (
		<>
			{(loadingActiveCourses || loadingCompletedCourses) && !activeCourses && (
				<ActiveCoursesSkeleton />
			)}
			{!errorActiveCourses && activeCourses && (
				<ActiveCourses courses={activeCourses.courseProgresses.items} />
			)}

			{(loadingActiveCourses || loadingCompletedCourses) &&
				!completedCourses && <CompletedCoursesSkeleton />}
			{!errorCompletedCorses && completedCourses && (
				<CompletedCourses courses={completedCourses.completedCourses.items} />
			)}
		</>
	);
}
