import { COURSE_RATING_DECIMALS } from './constants';
import { Course } from '@/types/courses';

const SECONDS_IN_HOUR = 60 * 60;

export const formatRating = (
	value: number,
	decimals = COURSE_RATING_DECIMALS,
): string => {
	const fixed = value.toFixed(decimals);
	return fixed.replace(/\.?0+$/, '');
};

export const formatDuration = (value: number): string | number => {
	if (value < SECONDS_IN_HOUR) {
		return 'Less than an hour';
	}

	return Math.round(value / SECONDS_IN_HOUR);
};

type StepType = 'lesson' | 'challenge';

type StepRef = {
	type: StepType;
	id: string;
};

export const getAdjacentStep = (
	course: Course,
	current: StepRef,
): { prev: StepRef | null; next: StepRef | null } => {
	const sections = [...course.sections].sort((a, b) => a.order - b.order);

	const steps = sections.flatMap(section => {
		const lessonSteps = [...section.lessons]
			.sort((a, b) => a.order - b.order)
			.map(lesson => ({
				type: 'lesson' as const,
				id: lesson.id,
			}));

		const challengeSteps = [...section.challenges]
			.sort((a, b) => a.order - b.order)
			.map(challenge => ({
				type: 'challenge' as const,
				id: challenge.id,
			}));

		return [...lessonSteps, ...challengeSteps];
	});

	const currentIndex = steps.findIndex(
		step => step.id === current.id && step.type === current.type,
	);

	if (currentIndex === -1) return { prev: null, next: null };

	const prev =
		currentIndex > 0
			? {
					type: steps[currentIndex - 1].type,
					id: steps[currentIndex - 1].id,
				}
			: null;

	const next =
		currentIndex < steps.length - 1
			? {
					type: steps[currentIndex + 1].type,
					id: steps[currentIndex + 1].id,
				}
			: null;

	return { prev, next };
};
