import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
} from '@/components/ui';

export default function CardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Skeleton className="h-5 w-44" />
				</CardTitle>
				<CardDescription>
					<Skeleton className="h-4 w-36" />
				</CardDescription>
				<CardAction className="text-sm">
					<Skeleton className="h-4 w-8" />
				</CardAction>
			</CardHeader>
			<CardContent className="flex h-9 items-center justify-center">
				<Skeleton className="h-5 w-32" />
			</CardContent>
		</Card>
	);
}
