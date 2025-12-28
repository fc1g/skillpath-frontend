'use client';

import { User } from '@/types/auth';
import { useSetPassword } from '@/hooks/mutations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ProfileSetNewPasswordInput,
	profileSetNewPasswordSchema,
} from '@/lib/validations';
import { toast } from 'sonner';
import { Button, Form, Spinner } from '@/components/ui';
import { PasswordField } from '@/components/forms';

type ProfileSetPasswordFormProps = {
	user: User;
};

export default function ProfileSetPasswordForm({
	user,
}: ProfileSetPasswordFormProps) {
	const { mutate, isPending } = useSetPassword();

	const form = useForm<ProfileSetNewPasswordInput>({
		resolver: zodResolver(profileSetNewPasswordSchema),
		defaultValues: {
			newPassword: '',
			newPasswordConfirm: '',
			userId: user.id,
		},
	});

	async function onSubmit(data: ProfileSetNewPasswordInput) {
		mutate(data, {
			onSuccess: () => {
				toast.success('Password set successfully!', {
					duration: 5000,
				});
			},
			onError: error => {
				form.setError('root', {
					message:
						error.message ??
						'An error occurred while setting your password. Please try again later.',
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
					) : (
						'Set Password'
					)}
				</Button>
			</form>
		</Form>
	);
}
