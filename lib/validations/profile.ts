import { z } from 'zod';
import {
	emailField,
	passwordConfirmField,
	passwordField,
	withPasswordConfirmation,
} from './shared';

export const profileSchema = z.object({
	username: z.string().min(4, {
		message: 'Username must be at least 4 characters',
	}),
	email: emailField,
});

export const profileSetNewPasswordSchema = withPasswordConfirmation(
	z.object({
		newPassword: passwordField,
		newPasswordConfirm: passwordConfirmField,
	}),
	'newPassword',
	'newPasswordConfirm',
);

export const profileChangePasswordSchema =
	profileSetNewPasswordSchema.safeExtend({
		currentPassword: passwordField,
	});

export type ProfileInput = z.infer<typeof profileSchema>;
export type ProfileSetNewPasswordInput = z.infer<
	typeof profileSetNewPasswordSchema
>;
export type ProfileChangePasswordInput = z.infer<
	typeof profileChangePasswordSchema
>;
