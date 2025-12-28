import Link from 'next/link';
import { ResetPasswordForm } from '../_components';
import { Button } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';

type ResetPasswordPageProps = {
	searchParams: Promise<{
		token?: string;
	}>;
};

export default async function ResetPasswordPage({
	searchParams,
}: ResetPasswordPageProps) {
	const params = await searchParams;
	const token = params.token;

	if (!token) {
		return (
			<Button variant="link" asChild>
				<Link href={APP_ROUTES.FORGOT_PASSWORD}>
					Token is missing. Request a new link
				</Link>
			</Button>
		);
	}

	return <ResetPasswordForm token={token} />;
}
