'use server';

import { getClient } from '@/services/graphql/client';
import { catchAllQuery } from '@/services/utils';
import { ChallengeMetadata, ChallengesStaticParams } from './types';
import {
	GET_CHALLENGE,
	GET_CHALLENGE_METADATA,
	GET_CHALLENGES_STATIC_PARAMS,
} from './queries';
import { Challenge } from '@/types/courses';

const client = getClient();

export const getChallengesStaticParams = async () =>
	catchAllQuery<{ challenges: { items: ChallengesStaticParams } }>(
		{
			query: GET_CHALLENGES_STATIC_PARAMS,
			variables: {
				paginationQueryInput: {},
			},
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => (data ? data.challenges.items : []));

export const getChallengeMetadata = async (id: string) =>
	catchAllQuery<{ challenge: ChallengeMetadata }>(
		{
			query: GET_CHALLENGE_METADATA,
			variables: { id },
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => (data ? data.challenge : data));

export const getChallenge = async (id: string) =>
	catchAllQuery<{ challenge: Challenge }>(
		{
			query: GET_CHALLENGE,
			variables: { id },
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => (data ? data.challenge : data));
