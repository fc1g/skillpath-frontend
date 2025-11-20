type CoursePageParams = {
	params: Promise<{
		id: string;
	}>;
};

export default async function CoursePage({ params }: CoursePageParams) {
	const { id } = await params;

	return <div>Course {id}</div>;
}
