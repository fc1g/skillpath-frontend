import { AbstractEntity } from '@/types/base';
import { Quiz } from './quiz';

export type Lesson = {
	title: string;
	order: number;
	content: string;
	durationSeconds: number;
	quizzes: Quiz[];
} & AbstractEntity;
