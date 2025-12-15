import CardSkeleton from './CardSkeleton';
import { nanoid } from 'nanoid';
import { Skeleton } from '@/components/ui';

export default function ActiveCoursesSkeleton() {
	return (
		<>
			<Skeleton className="text-foreground mt-8 mb-4 h-6 w-48 text-2xl font-semibold" />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{Array.from({ length: 4 }, () => (
					<CardSkeleton key={nanoid(6)} />
				))}
			</div>
		</>
	);
}
