'use client';

import { Button } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useCourseRatingAndProgress, useUpdateLessonProgress } from '@/hooks';
import { LessonProgressStatus } from '@/types/progress/lesson-progress';
import { toast } from 'sonner';

type Step = {
	id?: string;
	type?: 'lesson' | 'challenge';
};

type StepNavBtnProps = {
	currentStep: Step;
	nextStep: Step;
	type: 'prev' | 'next';
	courseId: string;
	slug: string;
};

export default function StepNavBtn({
	currentStep,
	nextStep,
	type,
	courseId,
	slug,
}: StepNavBtnProps) {
	const router = useRouter();
	const {
		data: progressData,
		loading: loadingProgress,
		error: errorProgress,
	} = useCourseRatingAndProgress(courseId);
	const { updateLessonProgress, loading, error } =
		useUpdateLessonProgress(courseId);

	if ((type === 'prev' && !nextStep.type) || (type === 'prev' && !nextStep.id))
		return <div></div>;

	const handleClick = async () => {
		if (type === 'next' && currentStep.type === 'lesson') {
			await updateLessonProgress({
				status: LessonProgressStatus.COMPLETED,
				lessonId: currentStep.id!,
				courseId,
			});
		}

		if (nextStep.id) {
			router.push(
				`${APP_ROUTES.COURSES}/${courseId}/${slug}/learn/${nextStep.type}/${nextStep.id}`,
				{
					scroll: true,
				},
			);
		}

		const progress = progressData?.courseRatingAndProgress.progress;
		if (type === 'prev' || !progress) {
			return;
		}

		if (
			progress.course.lessonsCount + progress.course.challengesCount ===
			progress.completedLessonsCount + progress.completedChallengesCount
		) {
			toast.success('Congratulations! You have completed the course!');
		} else {
			toast.info(
				'In order to complete the course, you must complete all steps (lessons and challenges)',
			);
		}
	};

	return (
		<Button
			size="lg"
			variant={type === 'prev' ? 'ghost' : 'default'}
			disabled={loading || !!error || loadingProgress || !!errorProgress}
			onClick={handleClick}
		>
			{type === 'next' && nextStep.id
				? 'Next'
				: type === 'next' && !nextStep.id
					? 'Complete course'
					: 'Previous'}
		</Button>
	);
}
