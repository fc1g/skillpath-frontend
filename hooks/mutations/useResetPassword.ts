import { useMutation } from '@tanstack/react-query';
import { ResetPasswordInput, resetPasswordSchema } from '@/lib/validations';
import { parseAndValidate } from '@/services/utils';
import { httpRequest } from '@/services/http';

export const useResetPassword = () => {
	return useMutation({
		mutationFn: async (data: ResetPasswordInput) => {
			const parsed = await parseAndValidate(data, resetPasswordSchema);
			if (!parsed.ok) throw new Error(parsed.body.message);

			const response = await httpRequest({
				path: 'auth/reset-password',
				method: 'POST',
				body: {
					token: parsed.data.token,
					newPassword: parsed.data.newPassword,
				},
			});

			if (!response.ok)
				throw new Error(
					Array.isArray(response.body.message)
						? response.body.message.join('. ')
						: response.body.message,
				);
			return response.body;
		},
	});
};
