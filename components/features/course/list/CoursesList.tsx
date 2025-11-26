'use client';

import { EmptyList } from '@/components/common';
import { useCourses } from '@/hooks/useCourses';
import { CourseLevel } from '@/types/courses';
import { CourseCard, CoursePagination } from '@/components/features';

type CoursesListProps = {
	limit: number;
	offset: number;
	level?: CourseLevel;
	category?: string;
	search?: string;
};

export default function CoursesList({
	limit,
	offset,
	level,
	category,
	search,
}: CoursesListProps) {
	const { items, total } = useCourses({
		limit,
		offset,
		level,
		category,
		search,
	});

	if (!Array.isArray(items) || !items.length)
		return <EmptyList message="No courses found" />;

	return (
		<>
			<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
				{items.map(course => (
					<CourseCard data={course} key={course.id} />
				))}
			</div>

			<CoursePagination total={total} />
		</>
	);
}
