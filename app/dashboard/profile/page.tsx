'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import {
	ChangePassword,
	ChangePasswordSkeleton,
	InformationForm,
	InformationFormSkeleton,
} from './_components';
import { useProfile } from '@/hooks/queries';

export default function ProfilePage() {
	const { isPending, isError, data } = useProfile();

	return (
		<div className="grid grid-cols-1 gap-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl leading-none font-semibold tracking-tight">
						Profile Information
					</CardTitle>
					<CardDescription>Update your personal details</CardDescription>
				</CardHeader>
				<CardContent>
					{isPending && <InformationFormSkeleton />}
					{data && !isError && <InformationForm user={data} />}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="text-2xl leading-none font-semibold tracking-tight">
						Change Password
					</CardTitle>
					<CardDescription>
						Update your password to keep your account secure
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isPending && <ChangePasswordSkeleton />}
					{data && !isError && <ChangePassword user={data} />}
				</CardContent>
			</Card>
		</div>
	);
}
