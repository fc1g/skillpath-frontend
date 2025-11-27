import type { ReactNode } from 'react';
import { AuthBootstrap } from '@/app/providers';

export default function MarketingLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<>
			<AuthBootstrap />
			{children}
		</>
	);
}
