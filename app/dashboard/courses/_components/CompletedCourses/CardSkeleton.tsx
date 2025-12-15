import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
} from '@/components/ui';

export default function CardSkeleton() {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-4">
					<Skeleton className="h-6 w-6" />
					<div className="space-y-1">
						<CardTitle>
							<Skeleton className="h-[1.10rem] w-44" />
						</CardTitle>
						<CardDescription>
							<Skeleton className="h-[0.90rem] w-36" />
						</CardDescription>
					</div>
				</div>
			</CardHeader>
		</Card>
	);
}
