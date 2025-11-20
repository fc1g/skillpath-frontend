import { ReadonlyURLSearchParams } from 'next/navigation';

type CoursesPageProps = {
	searchParams: Promise<ReadonlyURLSearchParams>;
};

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
	const currSearchParams = new URLSearchParams(await searchParams);

	return <div>Courses Page</div>;
}
