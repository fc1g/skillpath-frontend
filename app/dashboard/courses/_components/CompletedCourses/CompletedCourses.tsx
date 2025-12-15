'use client';

import { EmptyMessage } from '@/components/common';
import CompletedCourseCard from './Card';
import { CourseProgress } from '@/types/progress';

type CompletedCoursesProps = {
	courses: CourseProgress[];
};

export default function CompletedCourses({ courses }: CompletedCoursesProps) {
	return (
		<>
			<h2 className="text-foreground mt-8 mb-4 text-2xl font-semibold">
				Completed Courses
			</h2>

			{courses.length === 0 && (
				<EmptyMessage
					icon="course"
					title="No completed courses found"
					description="Complete all lessons and challenges to mark your course as complete"
				/>
			)}

			<div className="flex flex-col gap-4">
				{courses.length > 0 &&
					courses.map(progress => (
						<CompletedCourseCard progress={progress} key={progress.course.id} />
					))}
			</div>
		</>
	);
}
