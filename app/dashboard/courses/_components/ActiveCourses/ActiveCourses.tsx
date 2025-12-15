import ActiveCourseCard from './Card';
import { EmptyMessage } from '@/components/common';
import { CourseProgress } from '@/types/progress';

type ActiveCoursesProps = {
	courses: CourseProgress[];
};

export default function ActiveCourses({ courses }: ActiveCoursesProps) {
	return (
		<>
			<h2 className="text-foreground mb-4 text-2xl font-semibold">
				Active Courses
			</h2>

			{courses.length === 0 && (
				<EmptyMessage
					icon="course"
					title="No active courses found"
					description="Start learning by enrolling in courses on the course overview page"
				/>
			)}

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{courses.length > 0 &&
					courses.map(progress => (
						<ActiveCourseCard progress={progress} key={progress.course.id} />
					))}
			</div>
		</>
	);
}
