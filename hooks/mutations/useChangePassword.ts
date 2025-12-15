import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	ProfileChangePasswordInput,
	profileChangePasswordSchema,
	ProfileSetNewPasswordInput,
	profileSetNewPasswordSchema,
} from '@/lib/validations';
import { parseAndValidate, ParseAndValidateResult } from '@/services/utils';
import { httpRequest } from '@/services/http';
import { PROFILE_QUERY_KEY } from '@/hooks/queries';
import { User } from '@/types/auth';

export const useChangePassword = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			data: ProfileChangePasswordInput | ProfileSetNewPasswordInput,
		) => {
			let parsed: ParseAndValidateResult<
				ProfileChangePasswordInput | ProfileSetNewPasswordInput
			>;

			if ('currentPassword' in data) {
				parsed = await parseAndValidate(data, profileChangePasswordSchema);
			} else {
				parsed = await parseAndValidate(data, profileSetNewPasswordSchema);
			}

			if (!parsed.ok) throw new Error(parsed.body.message);

			const response = await httpRequest({
				path: `users/${parsed.data.userId}/password`,
				method: 'PATCH',
				body: {
					currentPassword:
						'currentPassword' in parsed.data
							? parsed.data.currentPassword
							: null,
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
