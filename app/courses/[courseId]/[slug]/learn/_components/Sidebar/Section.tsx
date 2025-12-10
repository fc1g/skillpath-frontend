import { APP_ROUTES } from '@/constants/routes';
import { Section } from '@/types/courses';
import { CourseProgress } from '@/types/progress';
import { LessonProgressStatus } from '@/types/progress/lesson-progress';
import SectionNavBtn from './SectionNavBtn';

type CourseLearnSectionProps = {
	section: Section;
	progress: CourseProgress;
	courseId: string;
	slug: string;
	lessonId?: string;
	challengeId?: string;
};

export default function CourseLearnSection({
	section,
	progress,
	courseId,
	slug,
	lessonId,
	challengeId,
}: CourseLearnSectionProps) {
	return (
		<div className="space-y-2">
			<h3 className="text-foreground font-medium">{section.title}</h3>
			<div className="space-y-1">
				<>
					{section.lessons.map(lesson => {
						const lessonProgress = progress.lessonsProgresses.find(
							lessonProgress => lessonProgress.lessonId === lesson.id,
						);

						if (!lessonProgress) {
							// 	TODO: Create a progress for this lesson
						}

						return (
							<SectionNavBtn
								key={lesson.id}
								label={lesson.title}
								linkHref={`${APP_ROUTES.COURSES}/${courseId}/${slug}/learn/lesson/${lesson.id}`}
								isCompleted={
									lessonProgress?.status.toLowerCase() ===
									LessonProgressStatus.COMPLETED
								}
								isDisabled={lesson.id === lessonId}
							/>
						);
					})}

					{section.challenges.map(challenge => {
						// TODO: use challenge progress

						return (
							<SectionNavBtn
								key={challenge.id}
								label={challenge.title}
								linkHref={`${APP_ROUTES.COURSES}/${courseId}/${slug}/learn/challenge/${challenge.id}`}
								isCompleted={false}
								isDisabled={challenge.id === challengeId}
							/>
						);
					})}
				</>
			</div>
		</div>
	);
}
