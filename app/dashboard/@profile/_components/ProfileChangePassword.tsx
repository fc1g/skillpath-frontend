'use client';

import { useUser } from '@/store';
import { useForm, UseFormReturn } from 'react-hook-form';
import {
	ProfileChangePasswordInput,
	profileChangePasswordSchema,
	ProfileSetNewPasswordInput,
	profileSetNewPasswordSchema,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components/ui';
import { toast } from 'sonner';

export default function ProfileChangePassword() {
	const user = useUser();

	const form = useForm<ProfileChangePasswordInput | ProfileSetNewPasswordInput>(
		{
			resolver: zodResolver(
				user?.hasPassword
					? profileChangePasswordSchema
					: profileSetNewPasswordSchema,
			),
			defaultValues: {
				newPassword: '',
				newPasswordConfirm: '',
				currentPassword: '',
			},
		},
	);

	async function onSubmit(
		data: ProfileChangePasswordInput | ProfileSetNewPasswordInput,
	) {
		toast.info("Doesn't work yet, sorry!");
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-3 rounded-lg border-2 p-2 sm:space-y-6 sm:p-4"
			>
				{user?.hasPassword && (
					<FormField
						control={form.control}
						name="currentPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Current Password</FormLabel>
								<FormControl>
									<Input
										autoComplete="current-password"
										type="password"
										required={user?.hasPassword}
										aria-invalid={
											!!(form as UseFormReturn<ProfileChangePasswordInput>)
												.formState.errors.currentPassword
										}
										{...field}
									/>
								</FormControl>
								{(form as UseFormReturn<ProfileChangePasswordInput>).formState
									.errors.currentPassword && (
									<FormMessage role="alert" aria-live="polite">
										{(form as UseFormReturn<ProfileChangePasswordInput>)
											.formState.errors.currentPassword?.message ?? ''}
									</FormMessage>
								)}
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input
									autoComplete="new-password"
									required={true}
									type="password"
									aria-invalid={!!form.formState.errors.newPassword}
									{...field}
								/>
							</FormControl>
							{form.formState.errors.newPassword && (
								<FormMessage role="alert" aria-live="polite">
									{form.formState.errors.newPassword?.message ?? ''}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="newPasswordConfirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm New Password</FormLabel>
							<FormControl>
								<Input
									autoComplete="new-password"
									required={true}
									type="password"
									aria-invalid={!!form.formState.errors.newPasswordConfirm}
									{...field}
								/>
							</FormControl>
							{form.formState.errors.newPasswordConfirm && (
								<FormMessage role="alert" aria-live="polite">
									{form.formState.errors.newPasswordConfirm?.message ?? ''}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

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
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting
						? 'Loading...'
						: user?.hasPassword
							? 'Update Password'
							: 'Set Password'}
				</Button>
			</form>
		</Form>
	);
}
