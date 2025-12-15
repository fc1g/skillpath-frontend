import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SignUpInput, signUpSchema } from '@/lib/validations';
import { parseAndValidate } from '@/services/utils';
import { httpRequest } from '@/services/http';
import { User } from '@/types/auth';
import { API_ROUTES, APP_ROUTES } from '@/constants/routes';
import { PROFILE_QUERY_KEY } from '@/hooks/queries';

export const useSignup = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (data: SignUpInput) => {
			const parsed = await parseAndValidate(data, signUpSchema);
			if (!parsed.ok) throw new Error(parsed.body.message);

			const response = await httpRequest<User>({
				path: API_ROUTES.AUTH.SIGNUP,
				method: 'POST',
				body: {
					email: parsed.data.email,
					password: parsed.data.password,
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
		onSuccess: user => {
			queryClient.setQueryData(PROFILE_QUERY_KEY, user);
			router.push(APP_ROUTES.HOME);
		},
	});
};
