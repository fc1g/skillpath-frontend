import { AbstractEntity } from '@/types/base';
import { Category, Tag } from '@/types/courses';

export enum CourseLevel {
	BEGINNER = 'beginner',
	INTERMEDIATE = 'intermediate',
	ADVANCED = 'advanced',
}

export type Course = {
	title: string;
	subtitle: string;
	description: string;
	slug: string;
	requirements: string[];
	learningOutcomes: string[];
	includedFeatures: string[];
	level: keyof typeof CourseLevel;
	averageRating: number;
	studentsCount: number;
	lessonsCount: number;
	challengesCount: number;
	durationSeconds: number;
	durationHours: number;
	tags: Tag[];
	categories: Category[];
} & AbstractEntity;
