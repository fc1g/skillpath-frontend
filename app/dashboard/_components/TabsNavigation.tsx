'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabsNavigation() {
	const pathname = usePathname();

	const activeTab = pathname.split('/')[2] || 'profile';

	return (
		<Tabs value={activeTab} className="w-full">
			<TabsList>
				<TabsTrigger value="profile" asChild>
					<Link href="/dashboard/profile">Profile</Link>
				</TabsTrigger>
				<TabsTrigger value="courses" asChild>
					<Link href="/dashboard/courses">My Courses</Link>
				</TabsTrigger>
				<TabsTrigger value="assistant" asChild>
					<Link href="/dashboard/assistant">AI Assistant</Link>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
