import { gql } from '@apollo/client';

export const CREATE_COURSE_PROGRESS = gql`
	mutation CreateCourseProgress(
		$createCourseProgressInput: CreateCourseProgressInput!
	) {
		createCourseProgress(
			createCourseProgressInput: $createCourseProgressInput
		) {
			status
		}
	}
`;

export const RATE_COURSE = gql`
	mutation RateCourse($createCourseRatingInput: CreateCourseRatingInput!) {
		rateCourse(createCourseRatingInput: $createCourseRatingInput) {
			userId
			courseId
			rating
		}
	}
`;

export const UPDATE_COURSE_PROGRESS = gql`
	mutation UpdateCourseProgress(
		$updateCourseProgressInput: UpdateCourseProgressInput!
	) {
		updateCourseProgress(
			updateCourseProgressInput: $updateCourseProgressInput
		) {
			status
			completedLessonsCount
			completedChallengesCount
			userId
			course {
				id
			}
			lastVisitedItemId
			lastAccessedAt
			completedAt
		}
	}
`;
