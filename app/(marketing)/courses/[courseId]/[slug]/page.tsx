type CourseOverviewPageParams = {
	params: Promise<{
		courseId: string;
		slug: string;
	}>;
};

export default async function CourseOverviewPage({ params }: CourseOverviewPageParams) {
	const { courseId, slug } = await params;

	return <div>
		<h1>courseId: {courseId}</h1>
		<h2>slug: {slug}</h2>

		<p>Overview</p>
	</div>
}
