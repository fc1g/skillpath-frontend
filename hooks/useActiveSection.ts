import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Section } from '@/types/courses';

export const useActiveSection = (section: Section) => {
	const { lessonId, challengeId } = useParams<{
		lessonId?: string;
		challengeId?: string;
	}>();

	const isActiveSection =
		section.lessons.some(lesson => lesson.id === lessonId) ||
		section.challenges.some(challenge => challenge.id === challengeId);

	const [isManuallyOpen, setIsManuallyOpen] = useState(false);
	const isOpen = isActiveSection || isManuallyOpen;

	const handleOpenChange = (open: boolean) => {
		if (!isActiveSection) {
			setIsManuallyOpen(open);
		}
	};

	return {
		isActiveSection,
		isOpen,
		handleOpenChange,
		lessonId,
		challengeId,
	};
};
