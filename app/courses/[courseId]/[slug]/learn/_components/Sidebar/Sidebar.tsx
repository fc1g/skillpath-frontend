'use client';

import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { useCourseRatingAndProgress } from '@/hooks';
import { getInitialCourseLesson } from '@/lib/courses';
import { Course } from '@/types/courses';
import LeaveRating from './LeaveRating';
import CourseLearnProgress from './Progress';
import CourseSection from './Section';
import SidebarSkeleton from './Skeleton';

type CourseSidebarProps = {
	course: Course;
};

export default function CourseSidebar({ course }: CourseSidebarProps) {
	const { data, loading, error } = useCourseRatingAndProgress(course.id);
	const { section, lesson } = getInitialCourseLesson(course);

	if (!section || !lesson)
		return (
			<Sidebar>
				<SidebarContent>
					<Empty>
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<svg className="size-6">
									<use href="/icons/sprite.svg#course" />
								</svg>
							</EmptyMedia>
							<EmptyTitle>No lessons found</EmptyTitle>
							<EmptyDescription>
								This course doesn&apos;t have any lessons yet.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				</SidebarContent>
			</Sidebar>
		);

	if (loading && !data) return <SidebarSkeleton />;

	if (error || !data)
		return (
			<Sidebar>
				<SidebarContent>
					<Empty>
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<svg className="size-6">
									<use href="/icons/sprite.svg#x-circle" />
								</svg>
							</EmptyMedia>
							<EmptyTitle>Unable to load progress</EmptyTitle>
							<EmptyDescription>
								There was a problem loading your course progress. Please try
								again later.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				</SidebarContent>
			</Sidebar>
		);

	return (
		<Sidebar>
			<SidebarHeader>
				<CourseLearnProgress
					progress={data.courseRatingAndProgress.progress}
					lessonsCount={course.lessonsCount}
					challengesCount={course.challengesCount}
				/>
			</SidebarHeader>

			<SidebarContent className="no-scrollbar">
				{course.sections.map((section, index) => (
					<CourseSection
						key={section.id}
						section={section}
						progress={data.courseRatingAndProgress.progress}
						index={index + 1}
						baseHref={`${APP_ROUTES.COURSES}/${course.id}/${course.slug}/learn`}
					/>
				))}
			</SidebarContent>

			<SidebarFooter>
				<LeaveRating
					key={data.courseRatingAndProgress?.rating ?? 'no-rating'}
					courseId={course.id}
					initialRating={data.courseRatingAndProgress?.rating}
				/>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
