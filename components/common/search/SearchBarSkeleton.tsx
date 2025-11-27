import { Skeleton } from '@/components/ui';

export default function SearchBarSkeleton() {
	return (
		<form className="relative mx-auto max-w-2xl px-4">
			<Skeleton className="relative -z-10 h-12 w-full" />
		</form>
	);
}
