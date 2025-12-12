import { Category, CourseLevel, Tag } from '@/types/courses';

export type PaginationQueryInput = {
	limit?: number;
	offset?: number;
};

export type CoursesPaginationQueryInput = {
	level?: CourseLevel;
	category?: string;
	search?: string;
} & PaginationQueryInput;

export type CoursesStaticParams = {
	id: string;
	slug: string;
}[];

export type CourseMetadata = {
	title: string;
	subtitle: string;
	level: keyof typeof CourseLevel;
	tags: Tag[];
	categories: Category[];
};

export type CreateCourseRatingInput = {
	courseId: string;
	rating: number;
};

export type CreateCourseProgressInput = {
	status: string;
	userId?: string;
	courseId: string;
	lastAccessedAt: string;
	lastVisitedItemId?: string | null;
};

export type UpdateCourseProgressInput = Partial<CreateCourseProgressInput>;
