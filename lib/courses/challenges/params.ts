import { getCoursesStaticParams } from '@/services/graphql/courses';
import { getChallengesStaticParams } from '@/services/graphql/courses/challenges';

export async function generateStaticParams() {
	const [courseStaticParams, challengesStaticParams] = await Promise.all([
		await getCoursesStaticParams(),
		await getChallengesStaticParams(),
	]);

	if (!courseStaticParams || !challengesStaticParams) return [];
	if (!courseStaticParams.length || !challengesStaticParams.length) return [];

	return challengesStaticParams.flatMap(challenge => {
		const course = courseStaticParams.find(c => c.id === challenge.courseId);

		if (!course) return [];

		return {
			courseId: course.id,
			slug: course.slug,
			challengeId: challenge.id,
		};
	});
}
