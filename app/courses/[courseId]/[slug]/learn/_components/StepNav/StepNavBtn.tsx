'use client';

import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useUpdateLessonProgress } from '@/hooks';
import { LessonProgressStatus } from '@/types/progress/lesson-progress';
import { APP_ROUTES } from '@/constants/routes';

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
	const { updateLessonProgress, loading, error } = useUpdateLessonProgress();
	// const {
	// 	updateCourseProgress,
	// 	loading: courseProgressLoading,
	// 	error: courseProgressError,
	// } = useUpdateCourseProgress();

	if (!nextStep.type || !nextStep.id) return <div></div>;

	const handleClick = async () => {
		if (type === 'next' && currentStep.type === 'lesson') {
			await updateLessonProgress({
				status: LessonProgressStatus.COMPLETED,
				lessonId: currentStep.id!,
				courseId,
			});
		}

		if (nextStep.id) {
			// await updateCourseProgress({
			// 	lastVisitedItemId: nextStep.id,
			// });
			router.push(
				`${APP_ROUTES.COURSES}/${courseId}/${slug}/learn/${nextStep.type}/${nextStep.id}`,
				{
					scroll: true,
				},
			);
		}
	};

	return (
		<Button
			className="mt-4"
			size="lg"
			variant={type === 'prev' ? 'ghost' : 'default'}
			disabled={!nextStep.id || loading || !!error}
			onClick={handleClick}
		>
			{type === 'prev' ? 'Previous' : 'Next'}
		</Button>
	);
}
