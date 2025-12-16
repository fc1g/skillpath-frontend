import { Button } from '@/components/ui';
import Link from 'next/link';
import { Error } from '@/components/common';
import { APP_ROUTES } from '@/constants/routes';

export default function NotFound() {
	return (
		<Error
			title="Something is missing."
			subtitle="Sorry, we can not find that page. You will find lots to explore on
						the home page."
		>
			<Button variant="default" size="lg" asChild>
				<Link href={APP_ROUTES.HOME} prefetch={false}>
					Back to Homepage
				</Link>
			</Button>
		</Error>
	);
}
