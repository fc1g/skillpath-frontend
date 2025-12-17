import { useProfile } from '@/hooks/queries';
import {
	CoursesPaginationQueryInput,
	CREATE_COURSE_PROGRESS,
	CreateCourseProgressInput,
	CreateCourseRatingInput,
	DEFAULT_LIMIT,
	GET_COURSE_RATING_AND_PROGRESS,
	GET_COURSES,
	GET_LAST_VISITED_COURSE,
	GET_MY_COMPLETED_COURSES,
	GET_MY_COURSES,
	GET_POPULAR_COURSES,
	LastVisitedCourse,
	PaginationQueryInput,
	RATE_COURSE,
	UPDATE_COURSE_PROGRESS,
	UpdateCourseProgressInput,
} from '@/services/graphql/courses';
import {
	CreateChallengeDraftInput,
	GET_CHALLENGE_DRAFT,
} from '@/services/graphql/courses/challenges';
import { UPDATE_CHALLENGE_DRAFT } from '@/services/graphql/courses/challenges/mutations';
import { UpdateLessonProgressInput } from '@/services/graphql/courses/lessons';
import { UPDATE_LESSON_PROGRESS } from '@/services/graphql/courses/lessons/mutations';
import { Course, CourseRating } from '@/types/courses';
import { CourseProgress } from '@/types/progress';
import { ChallengeDraft } from '@/types/progress/challenge-draft';
import { LessonProgress } from '@/types/progress/lesson-progress';
import { useMutation, useQuery, useSuspenseQuery } from '@apollo/client/react';
import { useCallback, useEffect, useMemo } from 'react';
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

	return useMemo(
		() => [...data.popularCourses].sort((a, b) => b.averageRating - a.averageRating),
		[data.popularCourses],
	);
};

export const useCreateCourseProgress = () => {
	const [mutate, { data, loading, error }] = useMutation<
		{ createCourseProgress: CourseProgress },
		{ createCourseProgressInput: CreateCourseProgressInput }
	>(CREATE_COURSE_PROGRESS, {
		refetchQueries: [
			{
				query: GET_POPULAR_COURSES,
				variables: {
					paginationQueryInput: {
						limit: DEFAULT_LIMIT,
						offset: 0,
					},
				},
			},
		],
		awaitRefetchQueries: true,
	});

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

export const useUpdateChallengeDraft = (challengeId: string) => {
	const [mutate, { data, loading, error }] = useMutation<
		{
			updateChallengeDraft: ChallengeDraft;
		},
		{ updateChallengeDraftInput: CreateChallengeDraftInput }
	>(UPDATE_CHALLENGE_DRAFT, {
		refetchQueries: [
			{ query: GET_CHALLENGE_DRAFT, variables: { challengeId } },
		],
		awaitRefetchQueries: true,
	});

	const updateChallengeDraft = (
		updateChallengeDraftInput: CreateChallengeDraftInput,
	) =>
		mutate({
			variables: {
				updateChallengeDraftInput,
			},
		});

	return { updateChallengeDraft, data, loading, error };
};

export const useUpdateLessonProgress = (courseId: string) => {
	const [mutate, { data, loading, error }] = useMutation<{
		updateLessonProgress: LessonProgress;
	}>(UPDATE_LESSON_PROGRESS, {
		refetchQueries: [
			{
				query: GET_COURSE_RATING_AND_PROGRESS,
				variables: {
					courseId,
				},
			},
			{
				query: GET_MY_COURSES,
				variables: {
					paginationQueryInput: {
						limit: DEFAULT_LIMIT,
						offset: 0,
					},
				},
			},
		],
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
		fetchPolicy: 'network-only',
		ssr: false,
	});

	return { data, loading, error };
};

export const useChallengeDraft = (challengeId: string) => {
	const { data, loading, error } = useQuery<{
		challengeDraft: ChallengeDraft;
	}>(GET_CHALLENGE_DRAFT, {
		variables: {
			challengeId,
		},
		fetchPolicy: 'network-only',
		ssr: false,
	});

	return { data, loading, error };
};

export const useMyCourses = () => {
	const { data, loading, error } = useQuery<{
		courseProgresses: {
			items: CourseProgress[];
		};
	}>(GET_MY_COURSES, {
		variables: {
			paginationQueryInput: {
				limit: DEFAULT_LIMIT,
				offset: 0,
			},
		},
		fetchPolicy: 'cache-and-network',
		ssr: false,
	});

	return { data, loading, error };
};

export const useMyCompletedCourses = () => {
	const { data, loading, error } = useQuery<{
		completedCourses: {
			items: CourseProgress[];
		};
	}>(GET_MY_COMPLETED_COURSES, {
		variables: {
			paginationQueryInput: {
				limit: DEFAULT_LIMIT,
				offset: 0,
			},
		},
		fetchPolicy: 'cache-and-network',
		ssr: false,
	});

	return { data, loading, error };
};

export const useLastVisitedCourse = () => {
	const { data: profile } = useProfile();

	const { data, loading, error } = useQuery<{
		lastVisitedCourse: LastVisitedCourse;
	}>(GET_LAST_VISITED_COURSE, {
		skip: !profile,
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first',
		errorPolicy: 'all',
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
				refetchQueries: [{ query: GET_LAST_VISITED_COURSE }],
				awaitRefetchQueries: true,
			}),
		[mutate],
	);

	return { updateCourseProgress, data, loading, error };
};

export const useRateCourse = () => {
	const [mutate, { data, loading, error }] = useMutation<
		{ rateCourse: CourseRating },
		{ createCourseRatingInput: CreateCourseRatingInput }
	>(RATE_COURSE, {
		refetchQueries: [
			{
				query: GET_POPULAR_COURSES,
				variables: {
					paginationQueryInput: {
						limit: DEFAULT_LIMIT,
						offset: 0,
					},
				},
			},
		],
		awaitRefetchQueries: true,
	});

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
		});

	return { rateCourse, data, loading, error };
};
