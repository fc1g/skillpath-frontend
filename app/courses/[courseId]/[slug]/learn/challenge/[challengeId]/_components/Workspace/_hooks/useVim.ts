'use client';

import { useRef } from 'react';
import { OnMount } from '@monaco-editor/react';
import { initVimMode } from 'monaco-vim';

export const useVim = () => {
	const vimModeRef = useRef<unknown>(null);

	const handleMount: OnMount = editor => {
		const statusNode = document.getElementById('vim-status');
		vimModeRef.current = initVimMode(editor, statusNode || undefined);
	};

	return { vimModeRef, handleMount };
};
