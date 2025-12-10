import { AbstractEntity } from '@/types/base';
import { Lesson } from './lesson';
import { Challenge } from './challenge';

export type Section = {
	title: string;
	order: number;
	lessons: Lesson[];
	challenges: Challenge[];
} & AbstractEntity;
