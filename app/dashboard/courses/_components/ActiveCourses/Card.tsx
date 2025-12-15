'use client';

import { CourseProgress } from '@/types/progress';
import { useRouter } from 'next/navigation';
import {
	Button,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { formatDate } from '@/lib/courses';
import { APP_ROUTES } from '@/constants/routes';

type ActiveCourseCardProps = {
	progress: CourseProgress;
};

export default function ActiveCourseCard({ progress }: ActiveCourseCardProps) {
	const router = useRouter();

	const { course, lastVisitedItemId, lastVisitedItemType, lastAccessedAt } =
		progress;

	const progressPercent =
		(100 / (course.lessonsCount + course.challengesCount)) *
		(progress.completedLessonsCount + progress.completedChallengesCount);

	return (
		<Card>
			<CardHeader>
				<CardTitle>{course.title}</CardTitle>
				<CardDescription>
					{formatDate('Last accessed', lastAccessedAt)}
				</CardDescription>
				<CardAction className="text-sm">{progressPercent}%</CardAction>
			</CardHeader>
			<CardContent className="flex items-center justify-center">
				<Button
					variant="ghost"
					onClick={() =>
						router.push(
							`${APP_ROUTES.COURSES}/${course.id}/${course.slug}/learn/${lastVisitedItemType?.toLowerCase()}/${lastVisitedItemId}`,
						)
					}
				>
					Continue Learning
				</Button>
			</CardContent>
		</Card>
	);
}
