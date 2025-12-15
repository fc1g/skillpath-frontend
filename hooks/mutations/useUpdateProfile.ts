import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '@/services/http';
import { ProfileInput, profileSchema } from '@/lib/validations';
import { User } from '@/types/auth';
import { PROFILE_QUERY_KEY } from '@/hooks/queries';
import { parseAndValidate } from '@/services/utils';

export const useUpdateProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: ProfileInput) => {
			const parsed = await parseAndValidate(data, profileSchema);
			if (!parsed.ok) throw new Error(parsed.body.message);

			const response = await httpRequest<User>({
				path: `users/${data.userId}`,
				method: 'PATCH',
				body: {
					email: data.email,
					username: data.username,
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
			queryClient.setQueryData<User>(PROFILE_QUERY_KEY, oldData => {
				if (!oldData) return oldData;
				return {
					...oldData,
					username: user.username,
				};
			});
		},
	});
};
