import { ErrorBoundary } from '@/components/common';
import { CoursesListSkeleton } from '@/components/features';
import { PreloadQuery } from '@/services/graphql/client';
import {
	DEFAULT_LIMIT,
	GET_POPULAR_COURSES,
	PaginationQueryInput,
} from '@/services/graphql/courses';
import { Suspense } from 'react';
import List from './List';

export default function Section() {
	const paginationQueryInput: PaginationQueryInput = {
		limit: DEFAULT_LIMIT,
		offset: 0,
	};

	return (
		<section className="container mx-auto my-[clamp(2rem,4vw,3rem)] w-full px-4">
			<h2 className="text-foreground mb-8 text-center text-3xl font-bold md:text-start">
				Popular Courses
			</h2>

			<PreloadQuery
				query={GET_POPULAR_COURSES}
				variables={{ paginationQueryInput }}
			>
				<ErrorBoundary>
					<Suspense fallback={<CoursesListSkeleton limit={DEFAULT_LIMIT} />}>
						<List />
					</Suspense>
				</ErrorBoundary>
			</PreloadQuery>
		</section>
	);
}
