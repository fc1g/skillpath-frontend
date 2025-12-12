'use client';

import {
	Kbd,
	KbdGroup,
	SidebarTrigger,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui';

export default function Trigger() {
	const isMac = navigator.userAgent.includes('Mac OS');

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<SidebarTrigger />
			</TooltipTrigger>
			<TooltipContent>
				<KbdGroup>
					<Kbd>{isMac ? '⌘' : 'ctrl'}</Kbd>
					<span>+</span>
					<Kbd>B</Kbd>
				</KbdGroup>
			</TooltipContent>
		</Tooltip>
	);
}
