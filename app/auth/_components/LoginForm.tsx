'use client';

import { Button, Form, Separator } from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks';
import { LoginInput, loginSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { EmailField, PasswordField } from '@/components/forms';
import { OAuthSection } from './Shared';

export default function LoginForm() {
	const form = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { login } = useAuth();

	async function onSubmit(data: LoginInput) {
		try {
			await login(data);
		} catch (err) {
			form.setError('root', {
				message: err instanceof Error ? err.message : 'Invalid credentials',
			});
		}
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
					autoComplete="current-password"
				/>

				{form.formState.errors.root && (
					<div className="text-destructive">
						{form.formState.errors.root.message}
					</div>
				)}

				<div className="flex items-center justify-end">
					<Button variant="link" type="button" asChild>
						<Link href={APP_ROUTES.RESET_PASSWORD}>Reset password</Link>
					</Button>
				</div>

				<OAuthSection />

				<Button
					className="w-full"
					variant="default"
					size="lg"
					type="submit"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? 'Loading...' : 'Login'}
				</Button>

				<Separator className="my-4 sm:my-8" />

				<div className="flex flex-col items-center justify-center gap-4">
					<span className="text-sm">Don&apos;t have an account?</span>
					<Button className="w-full" variant="outline" size="lg" asChild={true}>
						<Link href={APP_ROUTES.SIGNUP}>Sign up</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
