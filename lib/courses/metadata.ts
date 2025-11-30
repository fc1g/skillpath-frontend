import { NEXT_PUBLIC_SITE_URL } from '@/config/env';
import { APP_ROUTES } from '@/constants/routes';
import { getCourseMetadata } from '@/services/graphql/courses';
import { CourseLevel } from '@/types/courses';

type GenerateMetadataProps = {
	params: Promise<{
		courseId: string;
		slug: string;
	}>;
};

const COURSE_LEVEL_LABEL: Record<keyof typeof CourseLevel, string> = {
	BEGINNER: 'Beginner',
	INTERMEDIATE: 'Intermediate',
	ADVANCED: 'Advanced',
};

export async function generateMetadata({ params }: GenerateMetadataProps) {
	const { courseId, slug } = await params;
	const metadata = await getCourseMetadata(courseId);

	if (!metadata) {
		return {
			title: 'Course not found | SkillPath',
			description: 'This course does not exist or has been removed.',
		};
	}

	const title = `${metadata.title} - ${COURSE_LEVEL_LABEL[metadata.level]} course`;
	const url = `${NEXT_PUBLIC_SITE_URL}${APP_ROUTES.COURSES}/${courseId}/${slug}`;
	const keywords = Array.from(
		new Set([
			metadata.title,
			...metadata.categories.map(category => category.name),
			...metadata.tags.map(tag => tag.name),
		]),
	);

	return {
		title,
		description: metadata.subtitle,
		keywords,
		alternates: {
			canonical: url,
		},
		openGraph: {
			title,
			description: metadata.subtitle,
			siteName: 'SkillPath',
			url,
			locale: 'en_US',
			type: 'website',
		},
	};
}
