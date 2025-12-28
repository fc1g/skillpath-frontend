import {
	ErrorBoundary,
	HeroSection,
	HomeSearchBar,
	SearchBarSkeleton,
} from '@/components/common';
import { CoursesListSkeleton } from '@/components/features';
import { PreloadQuery } from '@/services/graphql/client';
import {
	DEFAULT_LIMIT,
	GET_POPULAR_COURSES,
	PaginationQueryInput,
} from '@/services/graphql/courses';
import { Suspense } from 'react';
import { Actions, PopularCoursesList } from './(home)/_components';
import { ContentLayout } from './_components';

export const revalidate = 0;

export default function Home() {
	const paginationQueryInput: PaginationQueryInput = {
		limit: DEFAULT_LIMIT,
		offset: 0,
	};

	return (
		<ContentLayout>
			<>
				<HeroSection
					title="Today is the day to change your life"
					subtitle="Master new skills with interactive courses designed by experts. Learn
					at your own pace, build real projects, and advance your career."
				>
					<Actions />
				</HeroSection>

				<Suspense fallback={<SearchBarSkeleton />}>
					<HomeSearchBar />
				</Suspense>

				<section className="container mx-auto my-[clamp(2rem,4vw,3rem)] w-full px-4">
					<h2 className="text-foreground mb-8 text-center text-3xl font-bold md:text-start">
						Popular Courses
					</h2>

					<PreloadQuery
						query={GET_POPULAR_COURSES}
						variables={{ paginationQueryInput }}
					>
						<ErrorBoundary>
							<Suspense
								fallback={<CoursesListSkeleton limit={DEFAULT_LIMIT} />}
							>
								<PopularCoursesList />
							</Suspense>
						</ErrorBoundary>
					</PreloadQuery>
				</section>
			</>
		</ContentLayout>
	);
}
