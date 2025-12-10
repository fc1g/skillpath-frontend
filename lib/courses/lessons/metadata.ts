import { getLessonMetadata } from '@/services/graphql/courses/lessons';
import { formatDuration } from '@/lib/courses';
import { NEXT_PUBLIC_SITE_URL } from '@/config/env';
import { APP_ROUTES } from '@/constants/routes';

type GenerateMetadataProps = {
	params: Promise<{
		courseId: string;
		slug: string;
		lessonId: string;
	}>;
};

export async function generateMetadata({ params }: GenerateMetadataProps) {
	const { lessonId, courseId, slug } = await params;
	const lesson = await getLessonMetadata(lessonId);

	if (!lesson)
		return {
			title: 'Lesson not found | SkillPath',
			description: 'This lesson does not exist or has been removed.',
		};

	const title = `${lesson.title} | Lesson ${lesson.order} | SkillPath`;
	const description = `This lesson is ${formatDuration(lesson.durationSeconds)} long.`;
	const url = `${NEXT_PUBLIC_SITE_URL}${APP_ROUTES.COURSES}/${courseId}/${slug}/learn/lesson/${lessonId}`;

	return {
		title,
		description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			title,
			description,
			siteName: 'SkillPath',
			url,
			locale: 'en_US',
			type: 'article',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
		},
	};
}
