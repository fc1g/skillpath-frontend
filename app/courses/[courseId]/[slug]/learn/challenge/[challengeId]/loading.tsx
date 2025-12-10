'use client';

import { Button, Spinner } from '@/components/ui';

export default function Loading() {
	return (
		<div className="flex h-screen w-full flex-1 items-center justify-center">
			<Button variant="ghost" size="sm" disabled>
				<Spinner className="size-6" />
				Loading challenge...
			</Button>
		</div>
	);
}
