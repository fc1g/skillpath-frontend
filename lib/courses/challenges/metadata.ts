import { getChallengeMetadata } from '@/services/graphql/courses/challenges';
import { NEXT_PUBLIC_SITE_URL } from '@/config/env';
import { APP_ROUTES } from '@/constants/routes';
import { capitalize } from '@/lib/utils';
import { formatLanguage } from './utils';

type GenerateMetadataProps = {
	params: Promise<{
		courseId: string;
		slug: string;
		challengeId: string;
	}>;
};

export async function generateMetadata({ params }: GenerateMetadataProps) {
	const { challengeId, courseId, slug } = await params;
	const challenge = await getChallengeMetadata(challengeId);

	if (!challenge)
		return {
			title: 'Challenge not found | SkillPath',
			description: 'This challenge does not exist or has been removed.',
		};

	const rawDescription = challenge.instructions;

	const title = `[${capitalize(challenge.difficulty)} • ${formatLanguage(
		challenge.language,
	)}] ${challenge.title} | SkillPath`;
	const description =
		rawDescription.length > 160
			? rawDescription.slice(0, 157) + '...'
			: rawDescription;
	const url = `${NEXT_PUBLIC_SITE_URL}${APP_ROUTES.COURSES}/${courseId}/${slug}/learn/challenge/${challengeId}`;

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
