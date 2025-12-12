import { gql } from '@apollo/client';

export const CREATE_COURSE_PROGRESS = gql`
	mutation CreateCourseProgress(
		$createCourseProgressInput: CreateCourseProgressInput!
	) {
		createCourseProgress(
			createCourseProgressInput: $createCourseProgressInput
		) {
			status
			completedLessonsCount
			completedChallengesCount
			userId
			courseId
			lessonsProgresses {
				status
				userId
				lessonId
			}
			challengesAttempts {
				status
				submittedCode
				attempts
				testResults
				userId
				challengeId
				attemptedAt
				completedAt
			}
			lastAccessedAt
			completedAt
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
			courseId
			lastVisitedItemId
			lastAccessedAt
			completedAt
		}
	}
`;
