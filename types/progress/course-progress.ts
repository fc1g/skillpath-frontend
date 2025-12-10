import { LessonProgress } from './lesson-progress';

export enum CourseProgressStatus {
	ENROLLED = 'enrolled',
	IN_PROGRESS = 'in-progress',
	COMPLETED = 'completed',
}

export type CourseProgress = {
	status: CourseProgressStatus;
	completedLessonsCount: number;
	completedChallengesCount: number;
	userId: string;
	courseId: string;
	lastVisitedItemId: string | null;
	lessonsProgresses: LessonProgress[];
	challengesProgresses: unknown[];
	lastAccessedAt: Date;
	completedAt: Date | null;
};
