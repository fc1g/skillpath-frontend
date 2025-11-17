'use client';

import OAuthButton from '@/components/features/auth/OAuthButton';
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
} from '@/lib/validations/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm, UseFormReturn } from 'react-hook-form';

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
				className="w-full max-w-md space-y-6 rounded-lg border-2 p-4"
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
									required={true}
									type="email"
									{...field}
								/>
							</FormControl>
							{form.formState.errors.email && (
								<FormMessage>
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
									required={true}
									type="password"
									{...field}
								/>
							</FormControl>
							{form.formState.errors.password && (
								<FormMessage>
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
										required={true}
										type="password"
										{...field}
									/>
								</FormControl>
								{(form as UseFormReturn<SignUpInput>).formState.errors
									.passwordConfirm && (
									<FormMessage>
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

				{/* TODO: */}
				{/*{!isSignup && (*/}
				{/*	<div className="flex items-center justify-end">*/}
				{/*		<Button variant="link" type="button" asChild>*/}
				{/*			<Link href="/">Reset password</Link>*/}
				{/*		</Button>*/}
				{/*	</div>*/}
				{/*)}*/}

				<div className="flex flex-col items-center justify-center gap-4">
					<span className="text-sm">
						Or {isSignup ? 'Sign up' : 'Login'} with
					</span>

					{isSignup ? (
						<OAuthButton
							icon="google-su"
							className="size-44 fill-black dark:fill-white"
							onClick={() => startOauth('google')}
						/>
					) : (
						<OAuthButton
							icon="google-si"
							className="size-44 fill-black dark:fill-white"
							onClick={() => startOauth('google')}
						/>
					)}

					<OAuthButton
						icon="github"
						className="size-24 dark:fill-white"
						onClick={() => startOauth('github')}
					/>
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

				<Separator className="my-8" />

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
