import { getCoursesStaticParams } from '@/services/graphql/courses/actions';

export async function generateStaticParams() {
	const staticParams = await getCoursesStaticParams();

	if (!staticParams) return [];

	return staticParams.map(param => ({
		courseId: param.id,
		slug: param.slug,
	}));
}
