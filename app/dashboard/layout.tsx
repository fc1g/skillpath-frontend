import { AuthBootstrap } from '../providers';
import type { ReactNode } from 'react';
import { DashboardTabs } from './_components';

type DashboardLayoutProps = {
	profile: ReactNode;
	courses: ReactNode;
	assistant: ReactNode;
};

export default function DashboardLayout({
	profile,
	courses,
	assistant,
}: Readonly<DashboardLayoutProps>) {
	return (
		<>
			<AuthBootstrap />
			<DashboardTabs
				profile={profile}
				courses={courses}
				assistant={assistant}
			/>
		</>
	);
}
