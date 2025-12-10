import { NotFound } from './_components';

export default function CourseNotFound() {
	return (
		<NotFound
			title="Course not found."
			subtitle="Sorry, we could not find the course you are looking for. It may have
						been removed or does not exist."
		/>
	);
}
