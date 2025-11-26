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
				durationHours
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
			durationHours
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
			durationHours
			tags {
				name
				slug
			}
			categories {
				name
				slug
			}
		}
	}
`;
