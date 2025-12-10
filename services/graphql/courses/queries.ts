import { gql } from '@apollo/client';

export const GET_COURSES = gql`
	query GetCourses($coursesPaginationQueryInput: CoursesPaginationQueryInput!) {
		courses(coursesPaginationQueryInput: $coursesPaginationQueryInput) {
			items {
				id
				title
				subtitle
				slug
				level
				averageRating
				studentsCount
				durationSeconds
				tags {
					id
					name
				}
			}
			total
		}
	}
`;

export const GET_POPULAR_COURSES = gql`
	query GetPopularCourses($paginationQueryInput: PaginationQueryInput!) {
		popularCourses(paginationQueryInput: $paginationQueryInput) {
			id
			title
			subtitle
			slug
			level
			averageRating
			studentsCount
			durationSeconds
		}
	}
`;

export const GET_COURSES_STATIC_PARAMS = gql`
	query GetCoursesStaticParams(
		$coursesPaginationQueryInput: CoursesPaginationQueryInput!
	) {
		courses(coursesPaginationQueryInput: $coursesPaginationQueryInput) {
			items {
				id
				slug
			}
		}
	}
`;

export const GET_COURSE_METADATA = gql`
	query GetCourseMetadata($id: ID!) {
		course(id: $id) {
			title
			subtitle
			level
			tags {
				name
			}
			categories {
				name
			}
		}
	}
`;

export const GET_COURSE = gql`
	query GetCourse($id: ID!) {
		course(id: $id) {
			title
			subtitle
			description
			requirements
			learningOutcomes
			includedFeatures
			level
			averageRating
			ratingsCount
			studentsCount
			lessonsCount
			challengesCount
			durationSeconds
			tags {
				name
				slug
			}
			categories {
				name
				slug
			}
			sections {
				id
				title
				order
				lessons {
					id
					title
					order
					content
				}
				challenges {
					id
					title
					instructions
					requirements
					example
					difficulty
					order
					expectedOutput
					expectedStructure
				}
			}
		}
	}
`;

export const GET_COURSE_USER_RATING_AND_PROGRESS = gql`
	query GetCourseUserRatingAndProgress(
		$courseUserRatingAndProgressInput: CourseUserRatingAndProgressInput!
	) {
		courseUserRatingAndProgress(
			courseUserRatingAndProgressInput: $courseUserRatingAndProgressInput
		) {
			rating
			review
			progress {
				status
				completedLessonsCount
				completedChallengesCount
				userId
				courseId
				lastVisitedItemId
				lessonsProgresses {
					status
					lessonId
				}
				lastAccessedAt
				completedAt
			}
		}
	}
`;
