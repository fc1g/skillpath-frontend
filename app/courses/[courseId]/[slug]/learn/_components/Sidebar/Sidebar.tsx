'use client';

import { useCourseUserRatingAndProgress } from '@/hooks';
import { Course } from '@/types/courses';
import { useParams } from 'next/navigation';
import LeaveRating from './LeaveRating';
import Progress from './Progress';
import Section from './Section';

type CourseLearnSidebarProps = {
	course: Course;
	userId: string | null;
};

export default function CourseLearnSidebar({
	course,
	userId,
}: CourseLearnSidebarProps) {
	const { lessonId, challengeId } = useParams<{
		lessonId?: string;
		challengeId?: string;
	}>();
	const { rating, progress } = useCourseUserRatingAndProgress({
		courseId: course.id,
		userId,
	});

	return (
		<aside className="border-border bg-card no-scrollbar hidden h-full min-h-screen w-80 overflow-y-auto border-r p-4 md:flex md:flex-col">
			<Progress
				lessonsCount={course.lessonsCount}
				challengesCount={course.challengesCount}
				progress={progress}
			/>
			<LeaveRating courseId={course.id} initialRating={rating} />
			{course.sections
				.sort((a, b) => a.order - b.order)
				.map(section => (
					<div key={section.id} className="my-6">
						<Section
							section={section}
							progress={progress}
							courseId={course.id}
							slug={course.slug}
							lessonId={lessonId}
							challengeId={challengeId}
						/>
					</div>
				))}
		</aside>
	);
}
