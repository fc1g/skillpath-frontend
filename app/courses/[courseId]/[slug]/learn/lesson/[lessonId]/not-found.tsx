import { NotFound } from '@/app/courses/[courseId]/[slug]/_components';

export default function LessonNotFound() {
	return (
		<NotFound
			title="Lesson not found."
			subtitle="Sorry, we could not find the lesson you are looking for. It may have
						been removed or does not exist."
		/>
	);
}
