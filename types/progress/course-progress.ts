import { LessonProgress } from './lesson-progress';
import { AbstractEntity } from '@/types/base';
import { Course } from '@/types/courses';

export enum CourseProgressStatus {
	ENROLLED = 'enrolled',
	IN_PROGRESS = 'in-progress',
	COMPLETED = 'completed',
}

export enum LastVisitedItemType {
	LESSON = 'lesson',
	CHALLENGE = 'challenge',
}

export type CourseProgress = {
	status: CourseProgressStatus;
	completedLessonsCount: number;
	completedChallengesCount: number;
	userId: string;
	course: Course;
	lastVisitedItemId: string | null;
	lastVisitedItemType: LastVisitedItemType | null;
	lessonsProgresses: LessonProgress[];
	challengesProgresses: unknown[];
	lastAccessedAt: number;
	completedAt: number | null;
} & AbstractEntity;
