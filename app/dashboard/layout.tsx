import type { ReactNode } from 'react';
import { TabsNavigation } from './_components';

type DashboardLayoutProps = {
	children: ReactNode;
};

export default function DashboardLayout({
	children,
}: Readonly<DashboardLayoutProps>) {
	return (
		<div className="container mx-auto my-8 w-full px-4">
			<TabsNavigation />
			<div className="mt-6">{children}</div>
		</div>
	);
}
