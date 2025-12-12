import { getChallenge } from '@/services/graphql/courses/challenges';
import { notFound } from 'next/navigation';
import { ChallengeHeader, ChallengeInfoGrid, Workspace } from './_components';
import { getCourse } from '@/services/graphql/courses';
import {
	CourseProgressTracker,
	StepNav,
} from '@/app/courses/[courseId]/[slug]/learn/_components';

type ChallengePageProps = {
	params: Promise<{
		courseId: string;
		slug: string;
		challengeId: string;
	}>;
};

export {
	generateStaticParams,
	generateMetadata,
} from '@/lib/courses/challenges';
export const revalidate = 60;

export default async function ChallengePage({ params }: ChallengePageProps) {
	const { challengeId, courseId, slug } = await params;

	const [course, challenge] = await Promise.all([
		getCourse(courseId),
		getChallenge(challengeId),
	]);

	if (!challenge || !course) return notFound();

	const currentSection = course.sections.find(section =>
		section.challenges.find(challenge => challenge.id === challengeId),
	);

	if (!currentSection) return notFound();

	return (
		<div className="flex flex-1 flex-col gap-6 p-4 sm:p-8">
			<CourseProgressTracker
				courseId={courseId}
				slug={slug}
				challengeId={challengeId}
			/>

			<ChallengeHeader
				challengeTitle={challenge.title}
				sectionTitle={currentSection.title}
			/>

			<ChallengeInfoGrid challenge={challenge} />

			<Workspace challenge={challenge} />

			<StepNav
				course={{ ...course, id: courseId, slug }}
				currentStepId={challengeId}
				type="challenge"
			/>
		</div>
	);
}
