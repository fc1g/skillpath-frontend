import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui';
import { getInitialCourseLesson } from '@/lib/courses';
import { notFound, redirect } from 'next/navigation';
import { getCourse } from '@/services/graphql/courses';

type CourseLearnPageParams = {
	params: Promise<{
		courseId: string;
		slug: string;
	}>;
};

export { generateMetadata, generateStaticParams } from '@/lib/courses';
export const revalidate = 60;

export default async function CourseLearnPage({
	params,
}: CourseLearnPageParams) {
	const { courseId, slug } = await params;
	const course = await getCourse(courseId);
	if (!course) return notFound();

	const { lesson } = getInitialCourseLesson(course);
	if (lesson?.id) {
		redirect(`/courses/${courseId}/${slug}/learn/lesson/${lesson.id}`);
	}

	return (
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
	);
}
