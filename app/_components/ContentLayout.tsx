import { ReactNode } from 'react';
import { Header } from '@/components/features';

export default function ContentLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<div className="wrapper">
			<Header />

			<main className="flex-auto">{children}</main>
		</div>
	);
}
