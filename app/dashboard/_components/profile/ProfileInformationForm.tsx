'use client';

import { useForm } from 'react-hook-form';
import { ProfileInput, profileSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/store';
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
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input
									placeholder="John Doe"
									autoComplete="username"
									type="text"
									aria-invalid={!!form.formState.errors.username}
									{...field}
								/>
							</FormControl>
							{form.formState.errors.username && (
								<FormMessage role="alert" aria-live="polite">
									{form.formState.errors.username?.message ?? ''}
								</FormMessage>
							)}
						</FormItem>
					)}
				/>

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
