import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { formatDate } from '@/lib/courses';
import { CourseProgress } from '@/types/progress';

type CompletedCourseCardProps = {
	progress: CourseProgress;
};

export default function CompletedCourseCard({
	progress,
}: CompletedCourseCardProps) {
	if (!progress.completedAt) return null;
	const { course } = progress;

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-4">
					<svg className="size-6">
						<use href="/icons/sprite.svg#check" />
					</svg>
					<div>
						<CardTitle>{course.title}</CardTitle>
						<CardDescription>
							{formatDate('Completed', progress.completedAt)}
						</CardDescription>
					</div>
				</div>
			</CardHeader>
		</Card>
	);
}
