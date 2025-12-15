import { gql } from '@apollo/client';

export const GET_LESSONS_STATIC_PARAMS = gql`
	query GetLessonsStaticParams($paginationQueryInput: PaginationQueryInput!) {
		lessons(paginationQueryInput: $paginationQueryInput) {
			items {
				id
				courseId
			}
		}
	}
`;

export const GET_LESSON_METADATA = gql`
	query GetLessonMetadata($id: ID!) {
		lesson(id: $id) {
			title
			order
			durationSeconds
		}
	}
`;

export const GET_LESSON = gql`
	query GetLesson($id: ID!) {
		lesson(id: $id) {
			id
			title
			order
			content
			durationSeconds
			quizzes {
				id
				question
				type
				options
				correctOptionIndex
				explanation
				order
			}
		}
	}
`;
