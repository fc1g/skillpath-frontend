import { z } from 'zod';
import { PASSWORD_VALIDATION } from '@/constants/patterns';

export const profileSchema = z.object({
	username: z.string().min(4),
	email: z.email({
		message: 'Please provide a valid email address',
	}),
});

export const profileSetNewPasswordSchema = z
	.object({
		newPassword: z.string().regex(PASSWORD_VALIDATION, {
			message:
				'Password must be at least 8 characters with uppercase, lowercase, number and special character',
		}),
		newPasswordConfirm: z.string().nonempty(),
	})
	.refine(
		({ newPassword, newPasswordConfirm }) => newPassword === newPasswordConfirm,
		{
			message: 'Passwords must match',
			path: ['newPasswordConfirm'],
		},
	);

export const profileChangePasswordSchema =
	profileSetNewPasswordSchema.safeExtend({
		currentPassword: z.string().regex(PASSWORD_VALIDATION, {
			message:
				'Password must be at least 8 characters with uppercase, lowercase, number and special character',
		}),
	});

export type ProfileInput = z.infer<typeof profileSchema>;
export type ProfileSetNewPasswordInput = z.infer<
	typeof profileSetNewPasswordSchema
>;
export type ProfileChangePasswordInput = z.infer<
	typeof profileChangePasswordSchema
>;
