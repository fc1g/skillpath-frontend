'use client';

import { useCourses } from '@/hooks/useCourses';
import { CourseLevel } from '@/types/courses';
import CourseCard from '../card/CourseCard';
import CoursePagination from '../pagination/CoursePagination';
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui';

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
		return (
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<svg className="size-6">
							<use href="/icons/sprite.svg#course" />
						</svg>
					</EmptyMedia>
					<EmptyTitle>No courses found</EmptyTitle>
					<EmptyDescription>Try changing your filters</EmptyDescription>
				</EmptyHeader>
			</Empty>
		);

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
