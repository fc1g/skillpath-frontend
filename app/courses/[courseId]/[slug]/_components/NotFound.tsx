import { Button } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import Link from 'next/link';
import { Error } from '@/components/common';

export default function CourseNotFound({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) {
	return (
		<Error title={title} subtitle={subtitle}>
			<Button variant="default" size="lg" asChild>
				<Link href={APP_ROUTES.COURSES}>Browse Courses</Link>
			</Button>
			<Button variant="outline" size="lg" asChild>
				<Link href={APP_ROUTES.HOME}>Back to Homepage</Link>
			</Button>
		</Error>
	);
}
