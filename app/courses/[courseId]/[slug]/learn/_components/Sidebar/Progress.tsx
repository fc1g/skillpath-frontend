'use client';

import { Progress } from '@/components/ui';
import { CourseProgress } from '@/types/progress';

type CourseProgressProps = {
	progress: CourseProgress;
	lessonsCount: number;
	challengesCount: number;
};

export default function CourseLearnProgress({
	progress,
	lessonsCount,
	challengesCount,
}: CourseProgressProps) {
	const value =
		(100 / (lessonsCount + challengesCount)) *
		(progress.completedLessonsCount + progress.completedChallengesCount);

	return (
		<div className="bg-card mb-4 p-4">
			<h2 className="text-foreground mb-2 text-lg font-semibold">
				Course Progress
			</h2>
			<ul className="mb-4 flex flex-col gap-2">
				<li className="text-muted-foreground text-sm">
					{progress.completedLessonsCount} of {lessonsCount} lessons completed
				</li>
				<li className="text-muted-foreground text-sm">
					{progress.completedChallengesCount} of {challengesCount} challenges
					completed
				</li>
			</ul>

			<Progress value={value} />
		</div>
	);
}
