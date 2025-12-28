import { useMutation } from '@tanstack/react-query';
import { ForgotPasswordInput, forgotPasswordSchema } from '@/lib/validations';
import { parseAndValidate } from '@/services/utils';
import { httpRequest } from '@/services/http';

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: async (data: ForgotPasswordInput) => {
			const parsed = await parseAndValidate(data, forgotPasswordSchema);
			if (!parsed.ok) throw new Error(parsed.body.message);

			const response = await httpRequest({
				path: 'auth/forgot-password',
				method: 'POST',
				body: {
					email: parsed.data.email,
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
