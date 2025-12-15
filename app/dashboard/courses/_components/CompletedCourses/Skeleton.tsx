import { nanoid } from 'nanoid';
import CardSkeleton from './CardSkeleton';
import { Skeleton } from '@/components/ui';

export default function CompletedCoursesSkeleton() {
	return (
		<>
			<Skeleton className="text-foreground mt-8 mb-6 h-6 w-48 text-2xl font-semibold" />

			<div className="flex flex-col gap-4">
				{Array.from({ length: 2 }, () => (
					<CardSkeleton key={nanoid(6)} />
				))}
			</div>
		</>
	);
}
