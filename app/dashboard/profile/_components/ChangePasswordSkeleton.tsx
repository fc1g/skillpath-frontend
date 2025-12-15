import { FormItem, Input, Label, Skeleton } from '@/components/ui';

export default function ChangePasswordSkeleton() {
	return (
		<form className="w-full space-y-3 rounded-lg border-2 p-2 sm:space-y-6 sm:p-4">
			<FormItem>
				<Label>Current Password</Label>
				<Input disabled placeholder="********" type="password" />
			</FormItem>

			<FormItem>
				<Label>New Password</Label>
				<Input disabled placeholder="********" type="password" />
			</FormItem>

			<FormItem>
				<Label>Confirm New Password</Label>
				<Input disabled placeholder="********" type="password" />
			</FormItem>

			<Skeleton className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full rounded-md px-6 has-[>svg]:px-4" />
		</form>
	);
}
