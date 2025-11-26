import { PASSWORD_VALIDATION } from '@/constants/patterns';
import { z } from 'zod';

const baseAuthSchema = z.object({
	email: z.email({
		message: 'Please provide a valid email address',
	}),
	password: z.string().regex(PASSWORD_VALIDATION, {
		message:
			'Password must be at least 8 characters with uppercase, lowercase, number and special character',
	}),
});

export const loginSchema = baseAuthSchema;

export const signUpSchema = baseAuthSchema
	.extend({
		passwordConfirm: z.string().nonempty(),
	})
	.refine(({ password, passwordConfirm }) => password === passwordConfirm, {
		message: 'Passwords must match',
		path: ['passwordConfirm'],
	});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
