'use client';

import { EmptyList } from '@/components/common';
import { CourseCard } from '@/components/features';
import { usePopularCourses } from '@/hooks/useCourses';
import { DEFAULT_LIMIT } from '@/services/graphql/courses';

export default function PopularCoursesList() {
	const popularCourses = usePopularCourses({ limit: DEFAULT_LIMIT, offset: 0 });

	if (!Array.isArray(popularCourses) || !popularCourses.length)
		return <EmptyList message="No popular courses found" />;

	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
			{popularCourses.map(course => (
				<CourseCard data={course} key={course.id} />
			))}
		</div>
	);
}
