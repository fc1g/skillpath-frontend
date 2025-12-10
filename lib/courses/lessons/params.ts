import { getLessonsStaticParams } from '@/services/graphql/courses/lessons';
import { getCoursesStaticParams } from '@/services/graphql/courses';

export async function generateStaticParams() {
	const [courseStaticParams, lessonsStaticParams] = await Promise.all([
		await getCoursesStaticParams(),
		await getLessonsStaticParams(),
	]);

	if (!courseStaticParams || !lessonsStaticParams) return [];
	if (!courseStaticParams.length || !lessonsStaticParams.length) return [];

	return lessonsStaticParams.flatMap(lesson => {
		const course = courseStaticParams.find(c => c.id === lesson.courseId);

		if (!course) return [];

		return {
			courseId: course.id,
			slug: course.slug,
			lessonId: lesson.id,
		};
	});
}
