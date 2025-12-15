import { COURSE_RATING_DECIMALS } from './constants';
import { Course, Section } from '@/types/courses';
import { CourseProgress } from '@/types/progress';
import { LessonProgressStatus } from '@/types/progress/lesson-progress';

const SECONDS_IN_HOUR = 60 * 60;

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

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

const isSameDay = (a: number, b: number) => {
	const da = new Date(a);
	const db = new Date(b);
	return (
		da.getFullYear() === db.getFullYear() &&
		da.getMonth() === db.getMonth() &&
		da.getDate() === db.getDate()
	);
};

const isYesterday = (date: number, now: number) => {
	const d = new Date(now);
	d.setDate(d.getDate() - 1);
	return isSameDay(date, d.getTime());
};

export const formatDate = (
	prefix: 'Last accessed' | 'Completed',
	date: number,
	now: number = Date.now(),
) => {
	if (!Number.isFinite(date)) return `${prefix}`;

	if (date > now) return `${prefix} just now`;

	const diff = now - date;

	if (isSameDay(date, now)) {
		if (diff < MINUTE) return `${prefix} just now`;

		if (diff < HOUR) {
			const minutes = Math.floor(diff / MINUTE);
			return `${prefix} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
		}

		if (diff < DAY) {
			const hours = Math.floor(diff / HOUR);
			return `${prefix} ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
		}

		return `${prefix} today`;
	}

	if (isYesterday(date, now)) return `${prefix} yesterday`;

	if (diff < DAY * 7) {
		const days = Math.floor(diff / DAY);
		return `${prefix} ${days} ${days === 1 ? 'day' : 'days'} ago`;
	}

	if (diff < DAY * 30) {
		const weeks = Math.floor(diff / (DAY * 7));
		return `${prefix} ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
	}

	return `${prefix} ${new Date(date).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	} as Intl.DateTimeFormatOptions)}`;
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

export const getInitialCourseLesson = (course: Course) => {
	const sections = [...course.sections]?.sort((a, b) => a.order - b.order);
	const firstSection = sections[0];

	if (!firstSection || !firstSection.lessons.length)
		return {
			section: null,
			lesson: null,
		};

	const lessons = [...firstSection.lessons]?.sort((a, b) => a.order - b.order);
	const firstLesson = lessons[0];

	return {
		section: firstSection,
		lesson: firstLesson,
	};
};

export const calculateSectionProgress = (
	section: Section,
	progress: CourseProgress,
) => {
	const lessonsCount = section.lessons.length;
	const challengesCount = section.challenges.length;

	const completedLessonsCount = progress.lessonsProgresses
		.filter(lessonProgress =>
			section.lessons
				.map(lesson => lesson.id)
				.includes(lessonProgress.lessonId),
		)
		.filter(
			lessonProgress =>
				lessonProgress.status?.toLowerCase() === LessonProgressStatus.COMPLETED,
		).length;

	const uncompletedCount =
		lessonsCount + challengesCount - completedLessonsCount;

	return {
		lessonsCount,
		challengesCount,
		completedLessonsCount,
		uncompletedCount,
	};
};
