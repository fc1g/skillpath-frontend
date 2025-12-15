import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components/ui';
import { Control, FieldPath, FieldValues } from 'react-hook-form';

type PasswordFieldProps<T extends FieldValues> = {
	control?: Control<T>;
	name: FieldPath<T>;
	label?: string;
	autoComplete?: 'current-password' | 'new-password';
	required?: boolean;
};

export default function PasswordField<T extends FieldValues>({
	control,
	name,
	label = 'Password',
	autoComplete = 'current-password',
	required = true,
}: PasswordFieldProps<T>) {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							placeholder="********"
							autoComplete={autoComplete}
							required={required}
							type="password"
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
