'use client';

import { useChallengeDraft } from '@/hooks';
import { Challenge } from '@/types/courses';
import CodeEditorSkeleton from './CodeEditorSkeleton';
import { useDraft } from './_store/useCodeWorkspaceStore';
import CodeEditor from './CodeEditor';

type CodeEditorWrapperProps = {
	challenge: Challenge;
};

export default function CodeEditorWrapper({
	challenge,
}: CodeEditorWrapperProps) {
	const savedDraft = useDraft(challenge.id);

	const { data, loading } = useChallengeDraft(challenge.id);

	return (
		<>
			{loading && !data && <CodeEditorSkeleton />}
			{!loading && (
				<CodeEditor
					challenge={challenge}
					draft={data?.challengeDraft.code ?? savedDraft}
				/>
			)}
		</>
	);
}
