import { getAdjacentStep } from '@/lib/courses';
import { Course } from '@/types/courses';
import StepNavBtn from './StepNavBtn';

type StepNavProps = {
	course: Course;
	currentStepId: string;
	type: 'lesson' | 'challenge';
};

export default function StepNav({ course, currentStepId, type }: StepNavProps) {
	const { prev, next } = getAdjacentStep(course, {
		type,
		id: currentStepId,
	});

	return (
		<div className="border-border border-t p-4">
			<div className="container mx-auto flex w-full max-w-4xl items-center justify-between">
				<StepNavBtn
					currentStep={{
						id: currentStepId,
						type,
					}}
					nextStep={{
						id: prev?.id,
						type: prev?.type,
					}}
					type="prev"
					courseId={course.id}
					slug={course.slug}
				/>
				<StepNavBtn
					currentStep={{
						id: currentStepId,
						type,
					}}
					nextStep={{
						id: next?.id,
						type: next?.type,
					}}
					type="next"
					courseId={course.id}
					slug={course.slug}
				/>
			</div>
		</div>
	);
}
