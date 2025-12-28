'use client';

import { Button, Form } from '@/components/ui';
import { ForgotPasswordInput, forgotPasswordSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { EmailField } from '@/components/forms';
import { useForgotPassword } from '@/hooks/mutations';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/app/auth/_store/useAuthStore';

export default function ForgotPasswordForm() {
	const setForgotPasswordEmail = useAuthStore(
		state => state.setForgotPasswordEmail,
	);
	const setForgotPasswordSentAt = useAuthStore(
		state => state.setForgotPasswordLastSentAt,
	);
	const { mutate, isPending } = useForgotPassword();
	const router = useRouter();
	const form = useForm<ForgotPasswordInput>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	async function onSubmit(data: ForgotPasswordInput) {
		mutate(data, {
			onSuccess: () => {
				const email = form.getValues('email');
				setForgotPasswordEmail(email);
				setForgotPasswordSentAt(Date.now());
				router.push(APP_ROUTES.FORGOT_PASSWORD_SENT);
			},
			onError: error => {
				form.setError('root', {
					message:
						error.message ??
						'An error occurred while sending password reset link. Please try again later.',
				});
			},
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-xs space-y-3 rounded-lg border-2 p-2 sm:max-w-md sm:space-y-6 sm:p-4"
			>
				<EmailField control={form.control} name="email" />

				{form.formState.errors.root && (
					<div className="text-destructive">
						{form.formState.errors.root.message}
					</div>
				)}

				<Button
					className="w-full"
					variant="default"
					size="lg"
					type="submit"
					disabled={form.formState.isSubmitting || isPending}
				>
					{form.formState.isSubmitting || isPending
						? 'Loading...'
						: 'Send Reset Link'}
				</Button>
			</form>
		</Form>
	);
}
