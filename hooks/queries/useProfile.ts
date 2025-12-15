import { useQuery } from '@tanstack/react-query';
import { httpRequest } from '@/services/http';
import { User } from '@/types/auth';
import { API_ROUTES } from '@/constants/routes';

export const PROFILE_QUERY_KEY = ['profile'];

export const useProfile = () => {
	return useQuery({
		queryKey: PROFILE_QUERY_KEY,
		queryFn: async () => {
			const response = await httpRequest<User>({
				path: API_ROUTES.AUTH.ME,
				method: 'GET',
			});

			if (!response.ok)
				throw new Error(
					Array.isArray(response.body.message)
						? response.body.message.join('. ')
						: response.body.message,
				);
			return response.body;
		},
		retry: false,
		staleTime: Infinity,
		gcTime: Infinity,
	});
};
