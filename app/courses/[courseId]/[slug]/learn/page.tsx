import { generateMetadata, generateStaticParams } from '@/lib/courses';
import CourseLearnWrapper from './Wrapper';
import { getCourse } from '@/services/graphql/courses';
import { notFound } from 'next/navigation';

type CourseLearnPageParams = {
	params: Promise<{
		courseId: string;
		slug: string;
	}>;
};

export { generateMetadata, generateStaticParams };
export const revalidate = 60;

export default async function CourseLearnPage({
	params,
}: CourseLearnPageParams) {
	const { courseId, slug } = await params;
	const course = await getCourse(courseId);
	if (!course) return notFound();

	return <CourseLearnWrapper course={{ ...course, id: courseId, slug }} />;
}
