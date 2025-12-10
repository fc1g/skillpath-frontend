'use client';

import { Button, Form } from '@/components/ui';
import { EmailField, UsernameField } from '@/components/forms';
import { ProfileInput, profileSchema } from '@/lib/validations';
import { useUser } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ProfileInformationForm() {
	const user = useUser();

	const form = useForm<ProfileInput>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			username: user?.name ?? '',
			email: user?.email ?? '',
		},
	});

	async function onSubmit(data: ProfileInput) {
		toast.info("Doesn't work yet, sorry!");
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-3 rounded-lg border-2 p-2 sm:space-y-6 sm:p-4"
			>
				<UsernameField control={form.control} name="username" />

				<EmailField control={form.control} name="email" disabled={true} />

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
					{form.formState.isSubmitting ? 'Loading...' : 'Save Changes'}
				</Button>
			</form>
		</Form>
	);
}
