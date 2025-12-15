'use client';

import { Challenge } from '@/types/courses';
import { useCodeWorkspaceStore } from './_store/useCodeWorkspaceStore';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { formatLanguage } from '@/lib/courses/challenges';
import { capitalize } from '@/lib/utils';
import { useVim } from './_hooks/useVim';
import { useAutoSaveDraft } from './_hooks/useAutoSaveDraft';

type CodeEditorProps = {
	challenge: Challenge;
	draft: string;
};

export default function CodeEditor({ challenge, draft }: CodeEditorProps) {
	const setDraft = useCodeWorkspaceStore(state => state.setDraft);
	const { handleMount } = useVim();
	const { theme } = useTheme();

	const [code, setCode] = useState<string>(
		draft ? draft : challenge.templateCode,
	);

	useAutoSaveDraft({
		challengeId: challenge.id,
		code,
	});

	const handleChange = (value?: string) => {
		const next = value ?? '';
		setCode(next);
		setDraft(challenge.id, next);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>
					{challenge.title} · {formatLanguage(challenge.language)}
				</CardTitle>
				<CardDescription>
					Difficulty: {capitalize(challenge.difficulty)}
				</CardDescription>
				<CardAction
					id="vim-status"
					className="text-muted-foreground flex h-6 items-center px-2 text-xs"
				/>
			</CardHeader>
			<CardContent className="h-[50vh] w-full px-0 sm:h-100 md:px-6">
				<Editor
					path={challenge.path}
					height="100%"
					width="100%"
					value={code}
					onChange={handleChange}
					beforeMount={monaco =>
						monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
							strict: true,
						})
					}
					onMount={handleMount}
					language={challenge.language.toLowerCase()}
					theme={`vs-${theme}`}
					options={{
						minimap: { enabled: false },
						scrollBeyondLastLine: false,
						tabSize: 2,
						fontSize: 14,
						automaticLayout: true,
						wordWrap: 'on',
						wrappingIndent: 'indent',
					}}
				/>
			</CardContent>
		</Card>
	);
}
