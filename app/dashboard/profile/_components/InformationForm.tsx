'use client';

import { Button, Form, Spinner } from '@/components/ui';
import { EmailField, UsernameField } from '@/components/forms';
import { ProfileInput, profileSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { User } from '@/types/auth';
import { useUpdateProfile } from '@/hooks/mutations';
import { toast } from 'sonner';

type ProfileInformationFormProps = {
	user: User;
};

export default function ProfileInformationForm({
	user,
}: ProfileInformationFormProps) {
	const { mutate, isPending } = useUpdateProfile();

	const form = useForm<ProfileInput>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			username: user?.username ?? '',
			email: user.email,
			userId: user.id,
		},
	});

	async function onSubmit(data: ProfileInput) {
		mutate(data, {
			onSuccess: () => {
				toast.success('Profile updated successfully!', {
					duration: 5000,
				});
			},
			onError: error => {
				form.setError('root', {
					message:
						error.message ??
						'An error occurred while updating your profile. Please try again later.',
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
					disabled={form.formState.isSubmitting || isPending}
				>
					{form.formState.isSubmitting || isPending ? (
						<>
							<Spinner />
							<span>Updating...</span>
						</>
					) : (
						'Save Changes'
					)}
				</Button>
			</form>
		</Form>
	);
}
