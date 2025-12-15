import { gql } from '@apollo/client';

export const GET_CHALLENGES_STATIC_PARAMS = gql`
	query GetChallengesStaticParams(
		$paginationQueryInput: PaginationQueryInput!
	) {
		challenges(paginationQueryInput: $paginationQueryInput) {
			items {
				id
				courseId
			}
		}
	}
`;

export const GET_CHALLENGE_METADATA = gql`
	query GetChallengeMetadata($id: ID!) {
		challenge(id: $id) {
			title
			instructions
			requirements
			example
			difficulty
			language
		}
	}
`;

export const GET_CHALLENGE = gql`
	query GetChallenge($id: ID!) {
		challenge(id: $id) {
			id
			path
			title
			instructions
			requirements
			example
			templateCode
			difficulty
			language
			order
			expectedOutput
			expectedStructure
		}
	}
`;

export const GET_CHALLENGE_DRAFT = gql`
	query GetChallengeDraft($challengeId: ID!) {
		challengeDraft(challengeId: $challengeId) {
			code
		}
	}
`;
