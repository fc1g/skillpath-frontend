import { AbstractEntity } from '@/types/base';

export type Tag = {
	name: string;
	slug: string;
} & AbstractEntity;
