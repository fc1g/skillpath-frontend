'use client';

import { Button } from '@/components/ui';
import { useHasHydratedCourse, useLastVisitedCourseId } from '@/store';
import Link from 'next/link';

export default function HeroActions() {
	const lastVisitedCourseId = useLastVisitedCourseId();
	const hasHydratedCourse = useHasHydratedCourse();

	return (
		<div className="flex justify-center gap-4">
			{hasHydratedCourse && lastVisitedCourseId && (
				<Button size="lg" variant="default" asChild>
					<Link href={`/courses/${lastVisitedCourseId}`}>
						Continue Learning
					</Link>
				</Button>
			)}

			<Button
				size="lg"
				variant={
					hasHydratedCourse && lastVisitedCourseId ? 'outline' : 'default'
				}
				asChild
			>
				<Link href="/courses">Browse Courses</Link>
			</Button>
		</div>
	);
}
