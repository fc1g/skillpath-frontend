'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { useDashboardTab } from '@/hooks';
import type { ReactNode } from 'react';

type DashboardTabsProps = {
	profile: ReactNode;
	courses: ReactNode;
	assistant: ReactNode;
};

export default function DashboardTabs({
	profile,
	courses,
	assistant,
}: DashboardTabsProps) {
	const { activeTab, navigateToTab } = useDashboardTab();

	return (
		<Tabs
			defaultValue="profile"
			value={activeTab}
			onValueChange={navigateToTab}
			className="container mx-auto my-8 w-full px-4"
		>
			<TabsList>
				<TabsTrigger value="profile">Profile</TabsTrigger>
				<TabsTrigger value="courses">My Courses</TabsTrigger>
				<TabsTrigger value="assistant">Ai Assistant</TabsTrigger>
			</TabsList>
			<TabsContent value="profile">{profile}</TabsContent>
			<TabsContent value="courses">{courses}</TabsContent>
			<TabsContent value="assistant">{assistant}</TabsContent>
		</Tabs>
	);
}
