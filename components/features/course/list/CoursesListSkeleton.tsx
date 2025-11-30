import CourseCardSkeleton from '../card/CourseCardSkeleton';
import { nanoid } from 'nanoid';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Skeleton,
} from '@/components/ui';

type CoursesListSkeletonProps = {
	limit: number;
};

export default function CoursesListSkeleton({
	limit,
}: CoursesListSkeletonProps) {
	return (
		<>
			<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: limit }).map(() => (
					<CourseCardSkeleton key={nanoid(6)} />
				))}
			</div>

			<Pagination className="my-12">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious />
					</PaginationItem>

					{Array.from({ length: 3 }).map((_, i) => (
						<PaginationItem key={`page-${i}`}>
							<PaginationLink>
								<Skeleton className="h-4 w-8" />
							</PaginationLink>
						</PaginationItem>
					))}

					<PaginationItem>
						<PaginationNext />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	);
}
