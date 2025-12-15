import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
} from '@/components/ui';

export default function CodeEditorSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<Skeleton className="h-5 w-56" />
				</CardTitle>
				<CardDescription>
					<Skeleton className="h-4 w-48" />
				</CardDescription>
				<CardAction className="text-muted-foreground flex h-6 items-center px-2 text-xs">
					<Skeleton className="h-4 w-24" />
				</CardAction>
			</CardHeader>
			<CardContent className="px-0 md:px-6">
				<Skeleton className="h-[50vh] w-full sm:h-100" />
			</CardContent>
		</Card>
	);
}
