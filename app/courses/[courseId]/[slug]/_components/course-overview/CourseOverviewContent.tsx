'use client';

import CourseOverviewHeader from './CourseOverviewHeader';
import CourseOverviewStats from './CourseOverviewStats';
import CourseLearningOutcomes from './CourseLearningOutcomes';
import CourseRequirements from './CourseRequirements';
import CourseDescription from './CourseDescription';
import CourseEnrollmentCard from './CourseEnrollmentCard';
import { Course } from '@/types/courses';

type CourseOverviewContentProps = {
	course: Course;
};

export default function CourseOverviewContent({
	course,
}: CourseOverviewContentProps) {
	return (
		<div className="grid gap-8 lg:grid-cols-3">
			<div className="space-y-8 lg:col-span-2">
				<CourseOverviewHeader
					level={course.level}
					title={course.title}
					subtitle={course.subtitle}
					tags={course.tags}
				/>

				<CourseOverviewStats
					averageRating={course.averageRating}
					ratingsCount={course.ratingsCount}
					studentsCount={course.studentsCount}
					durationHours={course.durationHours}
				/>

				<CourseLearningOutcomes outcomes={course.learningOutcomes} />

				<CourseRequirements requirements={course.requirements} />

				<CourseDescription description={course.description} />
			</div>

			<CourseEnrollmentCard
				courseId={course.id}
				courseSlug={course.slug}
				includedFeatures={course.includedFeatures}
			/>
		</div>
	);
}
