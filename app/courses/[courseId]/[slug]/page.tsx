import { generateMetadata, generateStaticParams } from '@/lib/courses';
import { getCourse } from '@/services/graphql/courses';
import { OverviewContent } from './_components';
import { notFound } from 'next/navigation';

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
	const course = await getCourse(courseId);
	if (!course) return notFound();

	return (
		<div className="container mx-auto px-4 py-12">
			<OverviewContent course={{ ...course, id: courseId, slug }} />
		</div>
	);
}
