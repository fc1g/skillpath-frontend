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

export const forgotPasswordSchema = z.object({
	email: emailField,
});

export const resetPasswordSchema = withPasswordConfirmation(
	z.object({
		token: z.string().min(1, 'Token is required'),
		newPassword: passwordField,
		newPasswordConfirm: passwordConfirmField,
	}),
	'newPassword',
	'newPasswordConfirm',
);

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
