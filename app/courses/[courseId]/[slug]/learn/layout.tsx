import { getCourse } from '@/services/graphql/courses';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Sidebar, SidebarTrigger } from './_components';
import { ContentLayout } from '@/app/_components';

type LearnLayoutProps = {
	params: Promise<{
		courseId: string;
		slug: string;
	}>;
	children: ReactNode;
};

export default async function LearnLayout({
	params,
	children,
}: LearnLayoutProps) {
	const { courseId, slug } = await params;
	const course = await getCourse(courseId);
	if (!course) return notFound();

	return (
		<>
			<Sidebar course={{ ...course, id: courseId, slug }} />

			<ContentLayout>
				<SidebarTrigger />
				{children}
			</ContentLayout>
		</>
	);
}
