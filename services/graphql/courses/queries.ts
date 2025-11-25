import { gql } from '@apollo/client';

export const GET_COURSES = gql`
	query GetCourses($coursesPaginationQueryInput: CoursesPaginationQueryInput!) {
		courses(coursesPaginationQueryInput: $coursesPaginationQueryInput) {
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
	query GetCoursesStaticParams {
		courses {
			id
			slug
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
