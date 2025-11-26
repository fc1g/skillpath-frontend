import {
	generateMetadata,
	generateStaticParams,
	GET_COURSE,
} from '@/services/graphql/courses';
import { PreloadQuery } from '@/services/graphql/client';
import { ErrorBoundary } from '@/components/common';
import { Suspense } from 'react';
import {
	CourseOverviewContent,
	CourseOverviewSkeleton,
} from './_components';

type CourseOverviewPageParams = {
	params: Promise<{
		courseId: string;
		slug: string;
	}>;
};

export { generateMetadata, generateStaticParams };
export const revalidate = 60;

export default async function CourseOverviewPage({
	params,
}: CourseOverviewPageParams) {
	const { courseId, slug } = await params;

	return (
		<div className="container mx-auto px-4 py-12">
			<PreloadQuery query={GET_COURSE} variables={{ id: courseId }}>
				<ErrorBoundary>
					<Suspense fallback={<CourseOverviewSkeleton />}>
						<CourseOverviewContent id={courseId} slug={slug} />
					</Suspense>
				</ErrorBoundary>
			</PreloadQuery>
		</div>
	);
}
