import OverviewHeader from './OverviewHeader';
import OverviewStats from './OverviewStats';
import LearningOutcomes from './LearningOutcomes';
import Requirements from './Requirements';
import Description from './Description';
import EnrollmentCard from './EnrollmentCard';
import { Course } from '@/types/courses';
import { getInitialCourseLesson } from '@/lib/courses';

type CourseOverviewContentProps = {
	course: Course;
};

export default function CourseOverviewContent({
	course,
}: CourseOverviewContentProps) {
	const { lesson } = getInitialCourseLesson(course);

	return (
		<div className="grid gap-8 lg:grid-cols-3">
			<div className="space-y-8 lg:col-span-2">
				<OverviewHeader
					level={course.level}
					title={course.title}
					subtitle={course.subtitle}
					tags={course.tags}
				/>

				<OverviewStats
					averageRating={course.averageRating}
					ratingsCount={course.ratingsCount}
					studentsCount={course.studentsCount}
					durationSeconds={course.durationSeconds}
				/>

				<LearningOutcomes outcomes={course.learningOutcomes} />

				<Requirements requirements={course.requirements} />

				<Description description={course.description} />
			</div>

			<EnrollmentCard
				courseId={course.id}
				courseSlug={course.slug}
				firstLessonId={lesson?.id}
				includedFeatures={course.includedFeatures}
			/>
		</div>
	);
}
