import {
	Badge,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	Skeleton,
} from '@/components/ui';

export default function CourseCardSkeleton() {
	return (
		<Card className="spotlight-card">
			<CardHeader>
				<CardDescription>
					<Badge variant="secondary" className="font-bold capitalize">
						<Skeleton className="h-4 w-24" />
					</Badge>
				</CardDescription>
				<CardAction>
					<Skeleton className="h-4 w-16" />
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="space-y-1.5">
					<h3 className="text-xl font-semibold tracking-tight">
						<Skeleton className="h-4 w-24" />
					</h3>
					<div className="text-muted-foreground line-clamp-2 space-y-1.5 text-sm">
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-1/2" />
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex w-full justify-between">
					<div className="text-muted-foreground flex items-center justify-center gap-1 text-sm">
						<span>
							<Skeleton className="h-4 w-16" />
						</span>
					</div>
					<div className="text-muted-foreground flex items-center justify-center gap-1 text-sm">
						<span>
							<Skeleton className="h-4 w-16" />
						</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
