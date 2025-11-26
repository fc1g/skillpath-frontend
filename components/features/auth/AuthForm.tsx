'use client';

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Separator,
} from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks';
import {
	LoginInput,
	loginSchema,
	SignUpInput,
	signUpSchema,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm, UseFormReturn } from 'react-hook-form';
import OAuthButton from './OAuthButton';

type AuthFormProps = {
	type: 'signup' | 'login';
};

export default function AuthForm({ type }: AuthFormProps) {
	const isSignup = type === 'signup';
	const form = useForm<SignUpInput | LoginInput>({
		resolver: zodResolver(isSignup ? signUpSchema : loginSchema),
		defaultValues: {
			email: '',
			password: '',
			...(isSignup ? { passwordConfirm: '' } : {}),
		},
	});

	const { login, signup, startOauth } = useAuth();

	async function onSubmit(data: SignUpInput | LoginInput) {
		try {
			if (isSignup) {
				await signup(data as SignUpInput);
			} else {
				await login(data as LoginInput);
			}
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
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="example@gmail.com"
									autoComplete="email"
									required={true}
									type="email"
									aria-invalid={!!form.formState.errors.email}
									{...field}
								/>
							</FormControl>
							{form.formState.errors.email && (
								<FormMessage role="alert" aria-live="polite">
									{form.formState.errors.email?.message ?? ''}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="********"
									autoComplete={!isSignup ? 'new-password' : 'current-password'}
									required={true}
									type="password"
									aria-invalid={!!form.formState.errors.password}
									{...field}
								/>
							</FormControl>
							{form.formState.errors.password && (
								<FormMessage role="alert" aria-live="polite">
									{form.formState.errors.password?.message ?? ''}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

				{isSignup && (
					<FormField
						control={form.control}
						name="passwordConfirm"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm password</FormLabel>
								<FormControl>
									<Input
										placeholder="********"
										autoComplete={
											!isSignup ? 'new-password' : 'current-password'
										}
										required={true}
										type="password"
										aria-invalid={
											!!(form as UseFormReturn<SignUpInput>).formState.errors
												.passwordConfirm
										}
										{...field}
									/>
								</FormControl>
								{(form as UseFormReturn<SignUpInput>).formState.errors
									.passwordConfirm && (
									<FormMessage role="alert" aria-live="polite">
										{(form as UseFormReturn<SignUpInput>).formState.errors
											.passwordConfirm?.message ?? ''}
									</FormMessage>
								)}
							</FormItem>
						)}
					/>
				)}

				{form.formState.errors.root && (
					<div className="text-destructive">
						{form.formState.errors.root.message}
					</div>
				)}

				{!isSignup && (
					<div className="flex items-center justify-end">
						<Button variant="link" type="button" asChild>
							<Link href={APP_ROUTES.RESET_PASSWORD}>Reset password</Link>
						</Button>
					</div>
				)}

				<div className="flex flex-col justify-center gap-4">
					<div className="flex flex-col items-center space-y-1">
						<span className="text-sm">Or continue with</span>

						<Separator />
					</div>

					<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
						<OAuthButton
							icon="google"
							className="size-52 fill-black md:size-48 dark:fill-white"
							onClick={() => startOauth('google')}
						/>

						<OAuthButton
							icon="github"
							className="size-24 dark:fill-white"
							onClick={() => startOauth('github')}
						/>
					</div>
				</div>

				<Button
					className="w-full"
					variant="default"
					size="lg"
					type="submit"
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting
						? 'Loading...'
						: isSignup
							? 'Sign up'
							: 'Login'}
				</Button>

				<Separator className="my-4 sm:my-8" />

				<div className="flex flex-col items-center justify-center gap-4">
					<span className="text-sm">
						{isSignup ? 'Already have an account?' : "Don't have an account?"}
					</span>
					<Button className="w-full" variant="outline" size="lg" asChild={true}>
						<Link href={isSignup ? APP_ROUTES.LOGIN : APP_ROUTES.SIGNUP}>
							{isSignup ? 'Login' : 'Sign up'}
						</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
