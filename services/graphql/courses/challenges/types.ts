import { ChallengeDifficulty, ChallengeLanguage } from '@/types/courses';

export type ChallengesStaticParams = {
	id: string;
	courseId: string;
}[];

export type ChallengeMetadata = {
	title: string;
	instructions: string;
	requirements: string[];
	example: string;
	difficulty: ChallengeDifficulty;
	language: ChallengeLanguage;
};

export type CreateChallengeDraftInput = {
	challengeId: string;
	code: string;
};
