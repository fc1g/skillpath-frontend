'use client';

import { useRouter } from 'next/navigation';
import { Button, Separator, Spinner } from '@/components/ui';
import Link from 'next/link';
import { APP_ROUTES } from '@/constants/routes';
import {
	useAuthStore,
	useForgotPasswordEmail,
	useHasHydratedAuthStore,
} from '../../_store/useAuthStore';
import { useForgotPassword } from '@/hooks/mutations';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';

export default function SentPage() {
	const router = useRouter();
	const { mutate, isPending } = useForgotPassword();
	const hasHydratedAuth = useHasHydratedAuthStore();
	const forgotPasswordEmail = useForgotPasswordEmail();
	const forgotPasswordLastSentAt = useAuthStore(
		state => state.forgotPasswordLastSentAt,
	);
	const setForgotPasswordLastSentAt = useAuthStore(
		state => state.setForgotPasswordLastSentAt,
	);

	const [cooldown, setCooldown] = useState(0);
	useEffect(() => {
		if (!hasHydratedAuth) return;
		const last = Number(forgotPasswordLastSentAt ?? 0);
		const tick = () => {
			const left = Math.max(0, 60_000 - (Date.now() - last));
			setCooldown(Math.ceil(left / 1000));
		};
		tick();
		const id = setInterval(tick, 500);
		return () => clearInterval(id);
	}, [forgotPasswordLastSentAt, hasHydratedAuth]);

	if (!hasHydratedAuth) {
		return (
			<Button variant="link" disabled>
				<Spinner />
				<span>Loading...</span>
			</Button>
		);
	}

	if (hasHydratedAuth && !forgotPasswordEmail) {
		return (
			<Button variant="link" asChild>
				<Link href={APP_ROUTES.FORGOT_PASSWORD}>
					Email not found. Go back to forgot password form
				</Link>
			</Button>
		);
	}

	async function resendEmail() {
		if (!hasHydratedAuth || !forgotPasswordEmail)
			return router.push(APP_ROUTES.FORGOT_PASSWORD);

		mutate(
			{ email: forgotPasswordEmail },
			{
				onSuccess: () => {
					setForgotPasswordLastSentAt(Date.now());
				},
				onError: error => {
					toast.error(
						error.message ??
							'An error occurred while sending email. Please try again later.',
					);
				},
			},
		);
	}

	return (
		<div className="space-y-2 px-4">
			<p className="text-center font-semibold">
				If an account exists for {hasHydratedAuth && forgotPasswordEmail}, we
				sent a reset link.
			</p>

			<Button
				className="mb-4 w-full"
				variant="default"
				onClick={resendEmail}
				disabled={cooldown > 0 || isPending}
			>
				{cooldown > 0 ? (
					<>
						<Spinner />
						<span>Resent in {cooldown}s</span>
					</>
				) : (
					'Resend email'
				)}
			</Button>

			<Separator />

			<Button className="w-full" variant="outline" asChild>
				<Link href={APP_ROUTES.FORGOT_PASSWORD}>Change email</Link>
			</Button>
		</div>
	);
}
