'use server';

import { getClient } from '@/services/graphql/client';
import {
	CourseMetadata,
	CoursesStaticParams,
	GET_COURSE_METADATA,
	GET_COURSES_STATIC_PARAMS,
} from '@/services/graphql/courses';
import { catchAllQuery } from '@/services/utils';

const client = getClient();

export const getCoursesStaticParams = async () =>
	catchAllQuery<{ coursesStaticParams: CoursesStaticParams }>(
		{
			query: GET_COURSES_STATIC_PARAMS,
			variables: {
				coursesPaginationQueryInput: {},
			},
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => data.coursesStaticParams);

export const getCourseMetadata = async (id: string) =>
	catchAllQuery<{ courseMetadata: CourseMetadata }>(
		{
			query: GET_COURSE_METADATA,
			variables: { id },
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => data.courseMetadata);
