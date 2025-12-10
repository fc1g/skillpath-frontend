'use client';

import { useRef } from 'react';
import { OnMount } from '@monaco-editor/react';

export const useVim = () => {
	const vimModeRef = useRef<unknown>(null);

	const handleMount: OnMount = async editor => {
		const statusNode = document.getElementById('vim-status');
		const { initVimMode } = await import('monaco-vim');
		vimModeRef.current = initVimMode(editor, statusNode || undefined);
	};

	return { vimModeRef, handleMount };
};
