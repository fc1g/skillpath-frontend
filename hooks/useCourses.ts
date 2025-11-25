import {
	CoursesPaginationQueryInput,
	GET_COURSES,
	GET_POPULAR_COURSES,
	PaginationQueryInput,
} from '@/services/graphql/courses';
import { Course } from '@/types/courses';
import { useSuspenseQuery } from '@apollo/client/react';

export const useCourses = ({
	limit,
	offset,
	category,
	level,
	search,
}: CoursesPaginationQueryInput): Course[] => {
	const { data } = useSuspenseQuery<{
		courses: Course[];
	}>(GET_COURSES, {
		variables: {
			coursesPaginationQueryInput: {
				limit,
				offset,
				category,
				level: level?.toUpperCase(),
				search,
			},
		},
		fetchPolicy: 'cache-and-network',
	});

	return data.courses;
};

export const usePopularCourses = (
	paginationQueryInput: PaginationQueryInput,
): Course[] => {
	const { data } = useSuspenseQuery<{
		popularCourses: Course[];
	}>(GET_POPULAR_COURSES, {
		variables: {
			paginationQueryInput: {
				limit: paginationQueryInput.limit,
				offset: paginationQueryInput.offset,
			},
		},
		fetchPolicy: 'cache-and-network',
	});

	return data.popularCourses;
};
