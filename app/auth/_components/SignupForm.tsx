'use client';

import { Button, Form, Separator, Spinner } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { SignUpInput, signUpSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { EmailField, PasswordField } from '@/components/forms';
import { OAuthSection } from './Shared';
import { useSignup } from '@/hooks/mutations';

export default function SignupForm() {
	const { mutate, isPending } = useSignup();
	const form = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			passwordConfirm: '',
		},
	});

	async function onSubmit(data: SignUpInput) {
		mutate(data, {
			onError: error => {
				form.setError('root', {
					message:
						error.message ?? 'Something went wrong. Please try again later.',
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

				<PasswordField
					control={form.control}
					name="password"
					autoComplete="new-password"
				/>

				<PasswordField
					control={form.control}
					name="passwordConfirm"
					label="Confirm Password"
					autoComplete="new-password"
				/>

				{form.formState.errors.root && (
					<div className="text-destructive">
						{form.formState.errors.root.message}
					</div>
				)}

				<OAuthSection />

				<Button
					className="w-full"
					variant="default"
					size="lg"
					type="submit"
					disabled={form.formState.isSubmitting || isPending}
				>
					{form.formState.isSubmitting || isPending ? (
						<>
							<Spinner />
							<span>Loading...</span>
						</>
					) : (
						'Sign up'
					)}
				</Button>

				<Separator className="my-4 sm:my-8" />

				<div className="flex flex-col items-center justify-center gap-4">
					<span className="text-sm">Already have an account?</span>
					<Button className="w-full" variant="outline" size="lg" asChild={true}>
						<Link href={APP_ROUTES.LOGIN}>Login</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
