import { CourseProgress } from './course-progress';

export enum LessonProgressStatus {
	NOT_STARTED = 'not-started',
	COMPLETED = 'completed',
}

export type LessonProgress = {
	status: LessonProgressStatus;
	courseProgress: CourseProgress;
	quizzesAttempts: unknown[];
	userId: string;
	lessonId: string;
};
