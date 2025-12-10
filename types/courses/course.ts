import { AbstractEntity } from '@/types/base';
import { Category } from './category';
import { Section } from './section';
import { Tag } from './tag';

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
	ratingsCount: number;
	studentsCount: number;
	lessonsCount: number;
	challengesCount: number;
	durationSeconds: number;
	tags: Tag[];
	categories: Category[];
	sections: Section[];
} & AbstractEntity;
