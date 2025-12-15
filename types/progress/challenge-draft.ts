import { AbstractEntity } from '../base';

export type ChallengeDraft = {
	userId: string;
	challengeId: string;
	code: string;
} & AbstractEntity;
