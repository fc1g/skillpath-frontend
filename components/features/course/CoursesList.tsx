'use client';

import { EmptyList } from '@/components/common';
import { CourseCard } from '@/components/features';
import { useCourses } from '@/hooks/useCourses';
import { CourseLevel } from '@/types/courses';

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
	const courses = useCourses({ limit, offset, level, category, search });

	if (!Array.isArray(courses) || !courses.length)
		return <EmptyList message="No courses found" />;

	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
			{courses.map(course => (
				<CourseCard data={course} key={course.id} />
			))}
		</div>
	);
}
