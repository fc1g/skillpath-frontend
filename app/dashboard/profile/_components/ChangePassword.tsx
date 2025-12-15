'use client';

import { Button, Form, Spinner } from '@/components/ui';
import { PasswordField } from '@/components/forms';
import {
	ProfileChangePasswordInput,
	profileChangePasswordSchema,
	ProfileSetNewPasswordInput,
	profileSetNewPasswordSchema,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { User } from '@/types/auth';
import { useChangePassword } from '@/hooks/mutations';

type ProfileChangePasswordFormProps = {
	user: User;
};

export default function ProfileChangePassword({
	user,
}: ProfileChangePasswordFormProps) {
	const { mutate, isPending } = useChangePassword();

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
		mutate(data, {
			onSuccess: () => {
				toast.success(
					user?.hasPassword
						? 'Password updated successfully!'
						: 'Password set successfully!',
					{
						duration: 5000,
					},
				);
			},
			onError: error => {
				form.setError('root', {
					message:
						error.message ??
						'An error occurred while updating your password. Please try again later.',
				});
			},
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-3 rounded-lg border-2 p-2 sm:space-y-6 sm:p-4"
			>
				<input type="hidden" name="userId" defaultValue={user.id} />

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
					disabled={form.formState.isSubmitting || isPending}
				>
					{form.formState.isSubmitting || isPending ? (
						<>
							<Spinner />
							<span>Loading...</span>
						</>
					) : user?.hasPassword ? (
						'Update Password'
					) : (
						'Set Password'
					)}
				</Button>
			</form>
		</Form>
	);
}
