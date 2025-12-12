import { ReactNode } from 'react';
import { ContentLayout } from '@/app/_components';

export default function AuthLayout({
	children,
}: Readonly<{ children: ReactNode }>) {
	return (
		<ContentLayout>
			<div className="container mx-auto flex h-screen w-full items-center justify-center">
				{children}
			</div>
		</ContentLayout>
	);
}
