import { AbstractEntity } from '@/types/base';
import { Section } from './section';

export enum ChallengeDifficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard',
}

export enum ChallengeLanguage {
	JAVASCRIPT = 'javascript',
	TYPESCRIPT = 'typescript',
}

export type Challenge = {
	path: string;
	title: string;
	instructions: string;
	requirements: string[];
	example: string;
	templateCode: string;
	difficulty: ChallengeDifficulty;
	language: ChallengeLanguage;
	order: number;
	expectedOutput?: string | null;
	expectedStructure?: string | null;
	section: Section;
} & AbstractEntity;
