'use client';

import { useEffect, useRef } from 'react';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useUpdateChallengeDraft } from '@/hooks/useCourses';

type UseAutoSaveDraftProps = {
	challengeId: string;
	code: string;
};

export const useAutoSaveDraft = ({
	challengeId,
	code,
}: UseAutoSaveDraftProps) => {
	const debouncedCode = useDebouncedValue(code, 2000);
	const { updateChallengeDraft } = useUpdateChallengeDraft(challengeId);
	const isFirstRender = useRef(true);
	const lastSavedCode = useRef<string>('');

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			lastSavedCode.current = debouncedCode;
			return;
		}

		if (debouncedCode && debouncedCode !== lastSavedCode.current) {
			void updateChallengeDraft({
				challengeId,
				code: debouncedCode,
			});
			lastSavedCode.current = debouncedCode;
		}
	}, [debouncedCode, challengeId, updateChallengeDraft]);
};
