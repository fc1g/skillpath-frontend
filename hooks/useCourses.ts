import {
	CoursesPaginationQueryInput,
	CourseUserRatingAndProgressInput,
	CREATE_COURSE_PROGRESS,
	CreateCourseProgressInput,
	CreateUserRatingInput,
	GET_COURSE,
	GET_COURSE_USER_RATING_AND_PROGRESS,
	GET_COURSES,
	GET_POPULAR_COURSES,
	PaginationQueryInput,
	RATE_COURSE,
	UPDATE_COURSE_PROGRESS,
	UpdateCourseProgressInput,
} from '@/services/graphql/courses';
import { UpdateLessonProgressInput } from '@/services/graphql/courses/lessons';
import { UPDATE_LESSON_PROGRESS } from '@/services/graphql/courses/lessons/mutations';
import { useUser } from '@/store';
import { Course, UserRating } from '@/types/courses';
import { CourseProgress } from '@/types/progress';
import { LessonProgress } from '@/types/progress/lesson-progress';
import { useMutation, useSuspenseQuery } from '@apollo/client/react';
import { useEffect } from 'react';
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
		fetchPolicy: 'network-only',
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

export const useUpdateCourseProgress = () => {
	const [mutate, { data, loading, error }] = useMutation<
		{ updateCourseProgress: CourseProgress },
		{ updateCourseProgressInput: UpdateCourseProgressInput }
	>(UPDATE_COURSE_PROGRESS);

	const updateCourseProgress = (
		updateCourseProgressInput: UpdateCourseProgressInput,
	) =>
		mutate({
			variables: {
				updateCourseProgressInput: {
					...updateCourseProgressInput,
				},
			},
		});

	return { updateCourseProgress, data, loading, error };
};

export const useUpdateLessonProgress = () => {
	const user = useUser();

	if (!user) {
		throw new Error('User is not authenticated. Please login to continue.');
	}

	const [mutate, { data, loading, error }] = useMutation<{
		updateLessonProgress: LessonProgress;
	}>(UPDATE_LESSON_PROGRESS, {
		refetchQueries: [GET_COURSE_USER_RATING_AND_PROGRESS],
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
					userId: user?.id,
				},
			},
		});

	return { updateLessonProgress, data, loading, error };
};

// NEVER USED
export const useCourse = (id: string): Course => {
	const { data } = useSuspenseQuery<{ course: Course }>(GET_COURSE, {
		variables: {
			id,
		},
		fetchPolicy: 'cache-and-network',
	});

	return data.course;
};

export const useCourseUserRatingAndProgress = ({
	courseId,
	userId,
}: CourseUserRatingAndProgressInput) => {
	if (!userId) {
		throw new Error('User is not authenticated. Please login to continue.');
	}

	const { data } = useSuspenseQuery<{
		courseUserRatingAndProgress: {
			rating: number | null;
			review: string | null;
			progress: CourseProgress;
		};
	}>(GET_COURSE_USER_RATING_AND_PROGRESS, {
		variables: {
			courseUserRatingAndProgressInput: {
				userId: userId,
				courseId,
			},
		},
		fetchPolicy: 'cache-and-network',
	});

	return data.courseUserRatingAndProgress;
};

export const useRateCourse = () => {
	const [mutate, { data, loading, error }] = useMutation<
		UserRating,
		{ createUserRatingInput: CreateUserRatingInput }
	>(RATE_COURSE);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			return;
		}

		if (data) {
			toast.success('Rating submitted successfully!');
			return;
		}
	}, [data, error]);

	const rateCourse = (createUserRatingInput: CreateUserRatingInput) =>
		mutate({
			variables: {
				createUserRatingInput,
			},
		});

	return { rateCourse, data, loading, error };
};
