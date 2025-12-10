import { getCourse } from '@/services/graphql/courses';
import { generateMetadata, generateStaticParams } from '@/lib/courses';
import { notFound, redirect } from 'next/navigation';
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui';

type CourseLearnPageParams = {
	params: Promise<{
		courseId: string;
		slug: string;
	}>;
};

export { generateMetadata, generateStaticParams };
export const revalidate = 60;

export default async function CourseLearnPage({
	params,
}: CourseLearnPageParams) {
	const { courseId, slug } = await params;
	const data = await getCourse(courseId);
	if (!data) return notFound();

	const firstLessonId = data.sections[0]?.lessons[0]?.id;
	if (firstLessonId) {
		redirect(`/courses/${courseId}/${slug}/learn/lesson/${firstLessonId}`);
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
