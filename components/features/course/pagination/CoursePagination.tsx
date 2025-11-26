'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { DEFAULT_LIMIT } from '@/services/graphql/courses';
import { useCallback } from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { PAGINATION_SIZE_LIMIT } from '@/constants/pagination';

type CoursePaginationProps = {
	total: number;
};

export default function CoursePagination({ total }: CoursePaginationProps) {
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const currPage = parseInt(searchParams.get('page') ?? '1', 10);
	const limit = parseInt(searchParams.get('limit') ?? `${DEFAULT_LIMIT}`, 10);
	const maxPages = Math.ceil(total / limit);

	const buildLink = useCallback(
		(newPage: number) => {
			const params = new URLSearchParams(searchParams);
			params.set('page', newPage.toString());
			return `${pathname}?${params.toString()}`;
		},
		[pathname, searchParams],
	);

	const [first, second, third] = useCallback(() => {
		if (currPage === 1) return [currPage, currPage + 1, currPage + 2];
		if (currPage === maxPages) return [currPage - 2, currPage - 1, currPage];
		return [currPage - 1, currPage, currPage + 1];
	}, [currPage, maxPages])();

	return (
		<Pagination className="my-12">
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className={`text-muted-foreground cursor-pointer ${currPage === 1 && 'pointer-events-none opacity-50'}`}
						href={buildLink(currPage - 1)}
					></PaginationPrevious>
				</PaginationItem>

				{currPage > 2 && maxPages > PAGINATION_SIZE_LIMIT && (
					<PaginationItem>
						<PaginationEllipsis className="text-muted-foreground" />
					</PaginationItem>
				)}

				{[first, second, third].map(page => {
					if (page && maxPages >= page)
						return (
							<PaginationItem key={`Page-${page}`}>
								<PaginationLink
									href={buildLink(page)}
									className={cn(
										`text-muted-foreground transition duration-300 ${currPage === page && 'text-white'}`,
									)}
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						);
				})}

				{currPage < maxPages - 1 && maxPages > PAGINATION_SIZE_LIMIT && (
					<PaginationItem>
						<PaginationEllipsis className="text-muted-foreground" />
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationNext
						className={`text-muted-foreground cursor-pointer ${currPage === maxPages && 'pointer-events-none opacity-50'}`}
						href={buildLink(currPage + 1)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
