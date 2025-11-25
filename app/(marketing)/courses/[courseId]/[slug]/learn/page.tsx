import {
	generateMetadata,
	generateStaticParams,
} from '@/services/graphql/courses';
import CourseLearnWrapper from './Wrapper';

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

	return <CourseLearnWrapper courseId={courseId} slug={slug} />;
}
