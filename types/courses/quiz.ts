import { AbstractEntity } from '@/types/base';

export enum QuizType {
	SINGLE_CHOICE = 'single-choice',
	MULTIPLE_CHOICE = 'multiple-choice',
}

export type Quiz = {
	question: string;
	type: QuizType;
	options: string[];
	correctOptionIndex: number;
	explanation?: string | null;
	order: number;
} & AbstractEntity;
