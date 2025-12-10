import { capitalize } from '@/lib/utils';

const LANGUAGE_LABELS: Record<string, string> = {
	TYPESCRIPT: 'TypeScript',
	JAVASCRIPT: 'JavaScript',
};

export const formatLanguage = (language: string) => {
	if (!language) return '';

	if (LANGUAGE_LABELS[language]) return LANGUAGE_LABELS[language];

	return language
		.replace(/[_-]+/g, ' ')
		.toLowerCase()
		.split(' ')
		.map(capitalize)
		.join(' ');
};
