import { getCourse } from '@/services/graphql/courses';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';
import { Sidebar, SidebarSkeleton } from './_components';

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
		<div className="flex min-h-screen flex-col md:flex-row">
			<Suspense fallback={<SidebarSkeleton />}>
				<Sidebar course={{ ...course, id: courseId, slug }} />
			</Suspense>

			<div className="min-w-0 flex-1">{children}</div>
		</div>
	);
}
