import { FormItem, Input, Label, Skeleton } from '@/components/ui';

export default function InformationFormSkeleton() {
	return (
		<form className="w-full space-y-3 rounded-lg border-2 p-2 sm:space-y-6 sm:p-4">
			<FormItem>
				<Label>Username</Label>
				<Input disabled placeholder="John Doe" type="text" />
			</FormItem>

			<FormItem>
				<Label>Email</Label>
				<Input disabled placeholder="example@gmail.com" type="email" />
			</FormItem>

			<Skeleton className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full rounded-md px-6 has-[>svg]:px-4" />
		</form>
	);
}
