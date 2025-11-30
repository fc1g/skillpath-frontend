import { Button } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function CourseNotFound() {
	return (
		<section className="flex min-h-[60vh] w-full flex-1 items-center justify-center">
			<div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
				<div className="mx-auto max-w-screen-sm text-center">
					<h1 className="text-primary mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
						404
					</h1>
					<p className="text-secondary-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
						Course not found
					</p>
					<p className="text-muted-foreground mb-4 text-lg font-light">
						Sorry, we could not find the course you are looking for. It may have
						been removed or does not exist.
					</p>
					<div className="flex gap-4 justify-center">
						<Button variant="default" size="lg" asChild>
							<Link href={APP_ROUTES.COURSES}>Browse Courses</Link>
						</Button>
						<Button variant="outline" size="lg" asChild>
							<Link href={APP_ROUTES.HOME}>Back to Homepage</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}