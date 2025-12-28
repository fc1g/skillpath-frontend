import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	ProfileSetNewPasswordInput,
	profileSetNewPasswordSchema,
} from '@/lib/validations';
import { parseAndValidate } from '@/services/utils';
import { httpRequest } from '@/services/http';
import { User } from '@/types/auth';
import { PROFILE_QUERY_KEY } from '@/hooks/queries';

export const useSetPassword = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: ProfileSetNewPasswordInput) => {
			const parsed = await parseAndValidate(data, profileSetNewPasswordSchema);
			if (!parsed.ok) throw new Error(parsed.body.message);

			const response = await httpRequest({
				path: 'auth/set-password',
				method: 'PATCH',
				body: {
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
		onSuccess: () => {
			queryClient.setQueryData<User>(PROFILE_QUERY_KEY, oldData => {
				if (!oldData || oldData.hasPassword) return oldData;
				return {
					...oldData,
					hasPassword: true,
				};
			});
		},
	});
};
