'use client';

import { Button } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import Link from 'next/link';

export default function Actions() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 px-2 sm:flex-row">
			{/* {hasHydratedCourse && lastVisitedCourse && (
				<Button size="lg" variant="default" asChild className="max-w-max">
					<Link
						href={`${APP_ROUTES.COURSES}/${lastVisitedCourse.id}/${lastVisitedCourse.slug}/learn/lesson/${lastVisitedCourse.lessonId}`}
					>
						Continue Learning
					</Link>
				</Button>
			)} */}

			<Button
				size="lg"
				// variant={hasHydratedCourse && lastVisitedCourse ? 'outline' : 'default'}
				variant="default"
				asChild
				className="max-w-max"
			>
				<Link href={APP_ROUTES.COURSES}>Browse Courses</Link>
			</Button>
		</div>
	);
}
