import { gql } from '@apollo/client';

export const UPDATE_LESSON_PROGRESS = gql`
	mutation UpdateLessonProgress(
		$updateLessonProgressInput: UpdateLessonProgressInput!
	) {
		updateLessonProgress(
			updateLessonProgressInput: $updateLessonProgressInput
		) {
			status
		}
	}
`;
