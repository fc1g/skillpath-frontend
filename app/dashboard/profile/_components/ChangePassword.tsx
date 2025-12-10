'use client';

import { Button, Form } from '@/components/ui';
import { PasswordField } from '@/components/forms';
import {
	ProfileChangePasswordInput,
	profileChangePasswordSchema,
	ProfileSetNewPasswordInput,
	profileSetNewPasswordSchema,
} from '@/lib/validations';
import { useUser } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
					<PasswordField
						control={form.control}
						name="currentPassword"
						label="Current Password"
						autoComplete="current-password"
					/>
				)}

				<PasswordField
					control={form.control}
					name="newPassword"
					label="New Password"
					autoComplete="new-password"
				/>

				<PasswordField
					control={form.control}
					name="newPasswordConfirm"
					label="Confirm New Password"
					autoComplete="new-password"
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
