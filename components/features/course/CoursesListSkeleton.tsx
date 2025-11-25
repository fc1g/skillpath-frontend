import { CourseCardSkeleton } from '@/components/features';
import { nanoid } from 'nanoid';

type CoursesListSkeletonProps = {
	limit: number;
};

export default function CoursesListSkeleton({
	limit,
}: CoursesListSkeletonProps) {
	return (
		<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: limit }).map(() => (
				<CourseCardSkeleton key={nanoid(6)} />
			))}
		</div>
	);
}
