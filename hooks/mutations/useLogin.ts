import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginInput, loginSchema } from '@/lib/validations';
import { parseAndValidate } from '@/services/utils';
import { PROFILE_QUERY_KEY } from '@/hooks/queries';
import { User } from '@/types/auth';
import { httpRequest } from '@/services/http';
import { API_ROUTES, APP_ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async (credentials: LoginInput) => {
			const parsed = await parseAndValidate(credentials, loginSchema);
			if (!parsed.ok) throw new Error(parsed.body.message);

			const response = await httpRequest<User>({
				path: API_ROUTES.AUTH.LOGIN,
				method: 'POST',
				body: parsed.data,
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
