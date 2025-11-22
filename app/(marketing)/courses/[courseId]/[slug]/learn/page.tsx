import CourseLearnWrapper from './Wrapper';

type CourseLearnPageParams = {
	params: Promise<{
		courseId: string;
		slug: string;
	}>;
};

export default async function CourseLearnPage({ params }: CourseLearnPageParams) {
	const { courseId, slug } = await params;

	return (
		<CourseLearnWrapper courseId={courseId} slug={slug}/>
	);
}
