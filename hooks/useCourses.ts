import {
	CoursesPaginationQueryInput,
	CREATE_COURSE_PROGRESS,
	CreateCourseProgressInput,
	CreateCourseRatingInput,
	GET_COURSE_LAST_VISITED_ITEM_ID,
	GET_COURSE_RATING_AND_PROGRESS,
	GET_COURSES,
	GET_POPULAR_COURSES,
	PaginationQueryInput,
	RATE_COURSE,
	UPDATE_COURSE_PROGRESS,
	UpdateCourseProgressInput,
} from '@/services/graphql/courses';
import { UpdateLessonProgressInput } from '@/services/graphql/courses/lessons';
import { UPDATE_LESSON_PROGRESS } from '@/services/graphql/courses/lessons/mutations';
import { Course, CourseRating } from '@/types/courses';
import { CourseProgress } from '@/types/progress';
import { LessonProgress } from '@/types/progress/lesson-progress';
import { useMutation, useQuery, useSuspenseQuery } from '@apollo/client/react';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

type CoursesWithTotal = {
	courses: {
		items: Course[];
		total: number;
	};
};

export const useCourses = (
	coursesPaginationQueryInput: CoursesPaginationQueryInput,
): {
	items: Course[];
	total: number;
} => {
	const { data } = useSuspenseQuery<CoursesWithTotal>(GET_COURSES, {
		variables: {
			coursesPaginationQueryInput: {
				...coursesPaginationQueryInput,
				level: coursesPaginationQueryInput.level?.toUpperCase(),
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

export const useCreateCourseProgress = () => {
	const [mutate, { data, loading, error }] = useMutation<
		{ createCourseProgress: CourseProgress },
		{ createCourseProgressInput: CreateCourseProgressInput }
	>(CREATE_COURSE_PROGRESS);

	const createCourseProgress = (
		createCourseProgressInput: CreateCourseProgressInput,
	) =>
		mutate({
			variables: {
				createCourseProgressInput: {
					...createCourseProgressInput,
					status: createCourseProgressInput.status?.toUpperCase(),
				},
			},
		});

	return { createCourseProgress, data, loading, error };
};

export const useUpdateLessonProgress = () => {
	const [mutate, { data, loading, error }] = useMutation<{
		updateLessonProgress: LessonProgress;
	}>(UPDATE_LESSON_PROGRESS, {
		refetchQueries: [GET_COURSE_RATING_AND_PROGRESS],
		awaitRefetchQueries: true,
	});

	const updateLessonProgress = (
		updateLessonProgressInput: UpdateLessonProgressInput,
	) =>
		mutate({
			variables: {
				updateLessonProgressInput: {
					status: updateLessonProgressInput.status.toUpperCase(),
					lessonId: updateLessonProgressInput.lessonId,
					courseId: updateLessonProgressInput.courseId,
				},
			},
			fetchPolicy: 'network-only',
		});

	return { updateLessonProgress, data, loading, error };
};

export const useCourseRatingAndProgress = (courseId: string) => {
	const { data, loading, error } = useQuery<{
		courseRatingAndProgress: CourseRating & { progress: CourseProgress };
	}>(GET_COURSE_RATING_AND_PROGRESS, {
		variables: {
			courseId,
		},
		fetchPolicy: 'cache-and-network',
		ssr: false,
	});

	return { data, loading, error };
};

export const useCourseLastVisitedItemId = (courseId: string) => {
	const { data, loading, error } = useQuery<{
		courseProgressBy: CourseProgress;
	}>(GET_COURSE_LAST_VISITED_ITEM_ID, {
		variables: {
			courseId,
		},
		fetchPolicy: 'cache-and-network',
		ssr: false,
	});

	return { data, loading, error };
};

export const useUpdateCourseProgress = () => {
	const [mutate, { data, loading, error }] = useMutation<
		{ updateCourseProgress: CourseProgress },
		{ updateCourseProgressInput: UpdateCourseProgressInput }
	>(UPDATE_COURSE_PROGRESS);

	const updateCourseProgress = useCallback(
		(updateCourseProgressInput: UpdateCourseProgressInput) =>
			mutate({
				variables: {
					updateCourseProgressInput,
				},
				fetchPolicy: 'network-only',
			}),
		[mutate],
	);

	return { updateCourseProgress, data, loading, error };
};

export const useRateCourse = () => {
	const [mutate, { data, loading, error }] = useMutation<
		{ rateCourse: CourseRating },
		{ createCourseRatingInput: CreateCourseRatingInput }
	>(RATE_COURSE);

	useEffect(() => {
		if (error) {
			toast.error('Something went wrong, please try again later.');
			return;
		}

		if (data) {
			toast.success('Rating submitted successfully!');
			return;
		}
	}, [data, error]);

	const rateCourse = (createCourseRatingInput: CreateCourseRatingInput) =>
		mutate({
			variables: {
				createCourseRatingInput,
			},
			fetchPolicy: 'network-only',
		});

	return { rateCourse, data, loading, error };
};
