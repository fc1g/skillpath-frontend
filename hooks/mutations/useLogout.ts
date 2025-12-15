import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/services/http';
import { API_ROUTES, APP_ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { PROFILE_QUERY_KEY } from '@/hooks/queries';

export const useLogout = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: async () => {
			const response = await httpRequest({
				path: API_ROUTES.AUTH.LOGOUT,
				method: 'POST',
				body: undefined,
			});

			if (!response.ok)
				throw new Error(
					Array.isArray(response.body.message)
						? response.body.message.join('. ')
						: response.body.message,
				);
			return response.body;
		},
		onSuccess: () => {
			queryClient.setQueryData(PROFILE_QUERY_KEY, null);
			router.push(APP_ROUTES.HOME);
		},
	});
};
