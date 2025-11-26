'use client';

import { Button } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { useHasHydratedCourse, useLastVisitedCourse } from '@/store';
import Link from 'next/link';

export default function HeroActions() {
	const lastVisitedCourse = useLastVisitedCourse();
	const hasHydratedCourse = useHasHydratedCourse();

	return (
		<div className="flex justify-center gap-4">
			{hasHydratedCourse && lastVisitedCourse && (
				<Button size="lg" variant="default" asChild>
					<Link
						href={`${APP_ROUTES.COURSES}/${lastVisitedCourse.id}/${lastVisitedCourse.slug}/learn`}
					>
						Continue Learning
					</Link>
				</Button>
			)}

			<Button
				size="lg"
				variant={hasHydratedCourse && lastVisitedCourse ? 'outline' : 'default'}
				asChild
			>
				<Link href={APP_ROUTES.COURSES}>Browse Courses</Link>
			</Button>
		</div>
	);
}
