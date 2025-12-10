import { PASSWORD_VALIDATION } from '@/constants/patterns';
import { z } from 'zod';

export const emailField = z.email({
	message: 'Please provide a valid email address',
});

export const passwordField = z.string().regex(PASSWORD_VALIDATION, {
	message:
		'Password must be at least 8 characters with uppercase, lowercase, number and special character',
});

export const passwordConfirmField = z.string().min(1, {
	message: 'Please confirm your password',
});

export const withPasswordConfirmation = <T extends z.ZodRawShape>(
	schema: z.ZodObject<T>,
	passwordField: string = 'password',
	confirmField: string = 'passwordConfirm',
) => {
	return schema.refine(
		data => {
			const passwords = data as Record<string, unknown>;
			return passwords[passwordField] === passwords[confirmField];
		},
		{
			message: 'Passwords must match',
			path: [confirmField],
		},
	);
};
