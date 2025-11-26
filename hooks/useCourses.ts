import {
	CoursesPaginationQueryInput,
	GET_COURSE,
	GET_COURSES,
	GET_POPULAR_COURSES,
	PaginationQueryInput,
} from '@/services/graphql/courses';
import { Course } from '@/types/courses';
import { useSuspenseQuery } from '@apollo/client/react';

type CoursesWithTotal = {
	courses: {
		items: Course[];
		total: number;
	};
};

export const useCourses = ({
	limit,
	offset,
	category,
	level,
	search,
}: CoursesPaginationQueryInput): {
	items: Course[];
	total: number;
} => {
	const { data } = useSuspenseQuery<CoursesWithTotal>(GET_COURSES, {
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

export const useCourse = (id: string): Course => {
	const { data } = useSuspenseQuery<{ course: Course }>(GET_COURSE, {
		variables: {
			id,
		},
		fetchPolicy: 'cache-and-network',
	});

	return data.course;
};
