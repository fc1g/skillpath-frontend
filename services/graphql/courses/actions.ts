'use server';

import { getClient } from '../client';
import {
	GET_COURSE,
	GET_COURSE_METADATA,
	GET_COURSES_STATIC_PARAMS,
} from './queries';
import { CourseMetadata, CoursesStaticParams } from './types';
import { catchAllQuery } from '@/services/utils';
import { Course } from '@/types/courses';

const client = getClient();

export const getCoursesStaticParams = async () =>
	catchAllQuery<{ courses: { items: CoursesStaticParams } }>(
		{
			query: GET_COURSES_STATIC_PARAMS,
			variables: {
				coursesPaginationQueryInput: {},
			},
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => (data ? data.courses.items : []));

export const getCourseMetadata = async (id: string) =>
	catchAllQuery<{ course: CourseMetadata }>(
		{
			query: GET_COURSE_METADATA,
			variables: { id },
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => (data ? data.course : data));

export const getCourse = async (id: string) =>
	catchAllQuery<{ course: Course }>(
		{
			query: GET_COURSE,
			variables: { id },
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => (data ? data.course : data));
