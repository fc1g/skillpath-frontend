import {
	CoursesFiltersBar,
	CoursesSearchBar,
} from '@/app/(marketing)/_components';
import { CustomErrorBoundary, HeroSection } from '@/components/common';
import { CoursesList, CoursesListSkeleton } from '@/components/features';
import { Separator } from '@/components/ui';
import { buildCoursesPaginationQueryInput } from '@/lib/courses';
import { PreloadQuery } from '@/services/graphql/client';
import { GET_COURSES } from '@/services/graphql/courses';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { Suspense } from 'react';

type CoursesPageProps = {
	searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
	const currSearchParams = new URLSearchParams(await searchParams);

	const { limit, offset, category, level, search } =
		buildCoursesPaginationQueryInput(currSearchParams);

	const coursesPaginationQueryInput = {
		limit,
		offset,
		category,
		level: level?.toUpperCase(),
		search,
	};

	return (
		<>
			<HeroSection
				title="Browse All Courses"
				subtitle="Explore our comprehensive catalog of courses and find the perfect one
					for your learning journey"
			/>

			<CoursesSearchBar />

			<Separator className="my-8" />

			<CoursesFiltersBar />

			<section className="container mx-auto my-[clamp(2rem,4vw,3rem)] w-full px-4">
				<PreloadQuery
					query={GET_COURSES}
					variables={{ coursesPaginationQueryInput }}
				>
					<CustomErrorBoundary>
						<Suspense fallback={<CoursesListSkeleton limit={limit} />}>
							<CoursesList
								limit={limit}
								offset={offset}
								category={category}
								level={level}
								search={search}
							/>
						</Suspense>
					</CustomErrorBoundary>
				</PreloadQuery>
			</section>
		</>
	);
}
