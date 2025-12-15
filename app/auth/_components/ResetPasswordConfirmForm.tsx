'use client';

import { Button, Form } from '@/components/ui';
import { useForm } from 'react-hook-form';
import {
	ResetPasswordConfirmInput,
	resetPasswordConfirmSchema,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { PasswordField } from '@/components/forms';

type ResetPasswordConfirmFormProps = {
	token: string;
};

export default function ResetPasswordConfirmForm({
	token,
}: ResetPasswordConfirmFormProps) {
	const form = useForm<ResetPasswordConfirmInput>({
		resolver: zodResolver(resetPasswordConfirmSchema),
		defaultValues: {
			newPassword: '',
			newPasswordConfirm: '',
			token: '',
		},
	});

	async function onSubmit(data: ResetPasswordConfirmInput) {
		toast.info("Doesn't work yet, sorry!");
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full max-w-xs space-y-3 rounded-lg border-2 p-2 sm:max-w-md sm:space-y-6 sm:p-4"
			>
				<input type="hidden" name="token" defaultValue={token} />

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
					{form.formState.isSubmitting ? 'Loading...' : 'Reset password'}
				</Button>
			</form>
		</Form>
	);
}
