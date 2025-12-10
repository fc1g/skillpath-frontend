import { Button, Skeleton } from '@/components/ui';
import { nanoid } from 'nanoid';

const STARS_COUNT = 5;

export default function SidebarSkeleton() {
	return (
		<aside className="border-border bg-card hidden h-full min-h-[calc(100vh-4.5rem)] w-80 border-r p-4 sm:flex sm:flex-col">
			<div className="bg-card mb-4 p-4">
				<Skeleton className="text-foreground mb-2 h-5 w-48 text-lg font-semibold" />
				<ul className="mb-4 flex flex-col gap-2">
					<li className="text-muted-foreground flex text-sm">
						<Skeleton className="h-4 w-6" />
						<Skeleton className="ml-2 h-4 w-4" />
						<Skeleton className="ml-2 h-4 w-6" />
						<Skeleton className="ml-2 h-4 w-24" />
						<Skeleton className="ml-2 h-4 w-24" />
					</li>
					<li className="text-muted-foreground flex text-sm">
						<Skeleton className="h-4 w-6" />
						<Skeleton className="ml-2 h-4 w-4" />
						<Skeleton className="ml-2 h-4 w-6" />
						<Skeleton className="ml-2 h-4 w-24" />
						<Skeleton className="ml-2 h-4 w-24" />
					</li>
				</ul>

				<Skeleton className="h-2 w-full" />
			</div>

			<div className="bg-muted/50 border-border rounded-lg border p-3">
				<div className="mb-2 flex items-center justify-center text-center">
					<Skeleton className="text-foreground text-md h-5 w-24 font-medium" />
				</div>
				<div className="flex items-center justify-center gap-1">
					{Array.from({ length: STARS_COUNT }, () => {
						return (
							<Button disabled key={nanoid(6)} variant="ghost" size="icon-sm">
								<Skeleton className="h-6 w-6" />
							</Button>
						);
					})}
				</div>

				<Button disabled className="mt-3 w-full" variant="default" asChild>
					<Skeleton className="h-8 w-full" />
				</Button>
			</div>

			{Array.from({ length: 3 }, () => (
				<div key={nanoid(6)} className="my-6">
					<div className="space-y-2">
						<Skeleton className="text-foreground h-6 w-36 font-medium" />
						<div className="flex max-w-max flex-col space-y-1">
							{Array.from({ length: 2 }, () => (
								<Button
									asChild
									key={nanoid(6)}
									variant="ghost"
									size="lg"
									className="px-2"
								>
									<div className="flex items-center gap-2">
										<Skeleton className="h-5 w-5" />
										<Skeleton className="text-foreground h-5 w-24 text-sm" />
									</div>
								</Button>
							))}
						</div>
					</div>
				</div>
			))}
		</aside>
	);
}
