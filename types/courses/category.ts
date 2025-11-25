import { AbstractEntity } from '@/types/base';

export type Category = {
	name: string;
	slug: string;
} & AbstractEntity;
