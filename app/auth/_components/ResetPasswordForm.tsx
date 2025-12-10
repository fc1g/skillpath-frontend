'use client';

import { Button, Form } from '@/components/ui';
import { ResetPasswordInput, resetPasswordSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EmailField } from '@/components/forms';

export default function ResetPasswordForm() {
	const form = useForm<ResetPasswordInput>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	async function onSubmit(data: ResetPasswordInput) {
		toast.info("Doesn't work yet, sorry!");
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
					disabled={form.formState.isSubmitting}
				>
					{form.formState.isSubmitting ? 'Loading...' : 'Send Reset Link'}
				</Button>
			</form>
		</Form>
	);
}
