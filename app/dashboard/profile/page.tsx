import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { ChangePassword, InformationForm } from './_components';

export default function ProfilePage() {
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
					<InformationForm />
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
					<ChangePassword />
				</CardContent>
			</Card>
		</div>
	);
}
