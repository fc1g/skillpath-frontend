import { NotFound } from '@/app/courses/[courseId]/[slug]/_components';

export default function ChallengeNotFound() {
	return (
		<NotFound
			title="Challenge not found."
			subtitle="Sorry, we could not find the challenge you are looking for. It may have
						been removed or does not exist."
		/>
	);
}
