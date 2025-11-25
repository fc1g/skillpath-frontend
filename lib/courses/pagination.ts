import { DEFAULT_LIMIT } from '@/services/graphql/courses';
import { CourseLevel } from '@/types/courses';

const isCourseLevel = (level: string | null): level is CourseLevel => {
	if (!level) return false;

	return Object.values(CourseLevel).includes(level as CourseLevel);
};

export function buildCoursesPaginationQueryInput(
	searchParams: URLSearchParams,
): {
	limit: number;
	offset: number;
	category?: string;
	level?: CourseLevel;
	search?: string;
} {
	const page = parseInt(searchParams.get('page') ?? '1', 10);
	const limit = parseInt(searchParams.get('limit') ?? `${DEFAULT_LIMIT}`, 10);
	const offset = (page - 1) * limit;

	const rawLevel = searchParams.get('level');
	const level = isCourseLevel(rawLevel) ? rawLevel : undefined;

	const category = searchParams.get('category') ?? undefined;

	const rawSearch = searchParams.get('search');
	const search = rawSearch?.trim() || undefined;

	return { limit, offset, category, level, search };
}
