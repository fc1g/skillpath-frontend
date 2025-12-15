import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components/ui';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

type UsernameFieldProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label?: string;
};

export default function UsernameField<T extends FieldValues>({
	control,
	name,
	label = 'Username',
}: UsernameFieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							placeholder="John Doe"
							autoComplete="username"
							type="text"
							aria-invalid={!!fieldState.error}
							{...field}
						/>
					</FormControl>
					{fieldState.error && (
						<FormMessage role="alert" aria-live="polite">
							{fieldState.error.message ?? ''}
						</FormMessage>
					)}
				</FormItem>
			)}
		/>
	);
}
