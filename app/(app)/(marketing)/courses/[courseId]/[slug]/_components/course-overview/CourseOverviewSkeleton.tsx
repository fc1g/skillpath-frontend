import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Skeleton,
} from '@/components/ui';
import { nanoid } from 'nanoid';

export default function CourseOverviewSkeleton() {
	return (
		<div className="grid gap-8 lg:grid-cols-3">
			<div className="space-y-8 lg:col-span-2">
				<Badge asChild>
					<Skeleton className="h-6 w-16" />
				</Badge>
				<h1 className="text-foreground mb-4 text-4xl font-bold">
					<Skeleton className="h-8 w-1/2" />
				</h1>
				<Skeleton className="text-muted-foreground mb-6 h-6 w-full" />

				<ul className="my-2 flex flex-wrap items-center gap-2">
					{Array.from({ length: 3 }).map(() => (
						<li key={nanoid(6)}>
							<Badge variant="outline">
								<Skeleton className="h-6 w-16" />
							</Badge>
						</li>
					))}
				</ul>

				<div className="mt-[clamp(1.5rem,3vw,2rem)] mb-[clamp(3rem,5vw,4rem)] flex items-center gap-[clamp(1rem,5vw,3rem)] sm:items-center">
					{Array.from({ length: 3 }).map(() => (
						<div
							key={nanoid(6)}
							className="text-muted-foreground flex flex-wrap items-center justify-center gap-1 text-sm"
						>
							<Skeleton className="h-4 w-4" />
							<Skeleton className="h-4 w-12" />
						</div>
					))}
				</div>

				<h2 className="text-foreground mb-4 text-2xl font-bold">
					<Skeleton className="h-[1.5rem] w-full" />
				</h2>

				<ul className="mb-[clamp(2rem,4vw,3rem)] grid gap-4 md:grid-cols-2">
					{Array.from({ length: 4 }).map(() => (
						<li
							className="text-foreground flex items-center gap-2"
							key={nanoid(6)}
						>
							<Skeleton className="h-4 w-4" />
							<Skeleton className="h-4 w-44" />
						</li>
					))}
				</ul>

				<h2 className="text-foreground mb-4 text-2xl font-bold">
					<Skeleton className="h-[1.5rem] w-full" />
				</h2>

				<ul className="mb-[clamp(2rem,4vw,3rem)] flex flex-col gap-4">
					{Array.from({ length: 4 }).map(() => (
						<li className="text-foreground ml-4 list-disc" key={nanoid(6)}>
							<Skeleton className="h-4 w-44" />
						</li>
					))}
				</ul>

				<h2 className="text-foreground mb-4 text-2xl font-bold">
					<Skeleton className="h-[1.5rem] w-full" />
				</h2>

				<Skeleton className="text-foreground mb-2 h-4 w-full" />
				<Skeleton className="text-foreground mb-2 h-4 w-full" />
				<Skeleton className="text-foreground mb-2 h-4 w-full" />
				<Skeleton className="text-foreground mb-2 h-4 w-1/2" />
			</div>

			<div className="max-w-72 lg:col-span-1 lg:max-w-none">
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl leading-none font-semibold tracking-tight">
							<Skeleton className="h-8 w-1/2" />
						</CardTitle>
						<CardDescription className="text-muted-foreground text-sm">
							<Skeleton className="h-4 w-full" />
						</CardDescription>

						<Button className="cursor-pointer" variant="ghost" asChild>
							<div className="flex items-center justify-center gap-2">
								<Skeleton className="h-4 w-4" />
								<Skeleton className="h-4 w-32" />
							</div>
						</Button>
					</CardHeader>
					<CardContent className="space-y-3">
						<h3 className="text-foreground font-semibold">
							<Skeleton className="h-4 w-32" />
						</h3>

						<ul className="flex flex-col gap-2">
							{Array.from({ length: 3 }).map(() => (
								<li
									className="text-muted-foreground ml-4 list-disc text-sm"
									key={nanoid(6)}
								>
									<Skeleton className="h-4 w-44" />
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
