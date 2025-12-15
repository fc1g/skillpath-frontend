import { gql } from '@apollo/client';

export const UPDATE_CHALLENGE_DRAFT = gql`
	mutation UpdateChallengeDraft(
		$updateChallengeDraftInput: UpdateChallengeDraftInput!
	) {
		updateChallengeDraft(
			updateChallengeDraftInput: $updateChallengeDraftInput
		) {
			code
		}
	}
`;
