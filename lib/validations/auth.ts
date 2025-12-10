import { z } from 'zod';
import {
	emailField,
	passwordConfirmField,
	passwordField,
	withPasswordConfirmation,
} from './shared';

const baseAuthSchema = z.object({
	email: emailField,
	password: passwordField,
});

export const loginSchema = baseAuthSchema;

export const signUpSchema = withPasswordConfirmation(
	baseAuthSchema.extend({
		passwordConfirm: passwordConfirmField,
	}),
);

export const resetPasswordSchema = z.object({
	email: emailField,
});

export const resetPasswordConfirmSchema = withPasswordConfirmation(
	z.object({
		newPassword: passwordField,
		newPasswordConfirm: passwordConfirmField,
		token: z.string(),
	}),
	'newPassword',
	'newPasswordConfirm',
);

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ResetPasswordConfirmInput = z.infer<
	typeof resetPasswordConfirmSchema
>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
