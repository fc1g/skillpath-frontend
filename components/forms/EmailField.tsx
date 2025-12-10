import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components/ui';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

type EmailFieldProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	disabled?: boolean;
};

export default function EmailField<T extends FieldValues>({
	control,
	name,
	disabled = false,
}: EmailFieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem>
					<FormLabel>Email</FormLabel>
					<FormControl>
						<Input
							placeholder="example@gmail.com"
							autoComplete="email"
							required={true}
							disabled={disabled}
							type="email"
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
