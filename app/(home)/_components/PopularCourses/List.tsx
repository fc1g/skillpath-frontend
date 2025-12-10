'use client';

import { CourseCard } from '@/components/features';
import { usePopularCourses } from '@/hooks/useCourses';
import { DEFAULT_LIMIT } from '@/services/graphql/courses';
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui';

export default function List() {
	const popularCourses = usePopularCourses({ limit: DEFAULT_LIMIT, offset: 0 });

	if (!Array.isArray(popularCourses) || !popularCourses.length)
		return (
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<svg className="size-6">
							<use href="/icons/sprite.svg#course" />
						</svg>
					</EmptyMedia>
					<EmptyTitle>No popular courses found</EmptyTitle>
					<EmptyDescription>
						There are no popular courses at the moment.
					</EmptyDescription>
				</EmptyHeader>
			</Empty>
		);

	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
			{popularCourses.map(course => (
				<CourseCard data={course} key={course.id} />
			))}
		</div>
	);
}
