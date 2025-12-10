'use server';

import { catchAllQuery } from '@/services/utils';
import { Lesson } from '@/types/courses';
import { getClient } from '@/services/graphql/client';
import {
	GET_LESSON,
	GET_LESSON_METADATA,
	GET_LESSONS_STATIC_PARAMS,
} from './queries';
import { LessonMetadata, LessonsStaticParams } from './types';

const client = getClient();

export const getLessonsStaticParams = async () =>
	catchAllQuery<{ lessons: { items: LessonsStaticParams } }>(
		{
			query: GET_LESSONS_STATIC_PARAMS,
			variables: {
				paginationQueryInput: {},
			},
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => (data ? data.lessons.items : []));

export const getLessonMetadata = async (id: string) =>
	catchAllQuery<{ lesson: LessonMetadata }>(
		{
			query: GET_LESSON_METADATA,
			variables: { id },
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => (data ? data.lesson : data));

export const getLesson = async (id: string) =>
	catchAllQuery<{ lesson: Lesson }>(
		{
			query: GET_LESSON,
			variables: { id },
			fetchPolicy: 'no-cache',
		},
		client,
	).then(data => (data ? data.lesson : data));
