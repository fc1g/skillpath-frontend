import { ResetPasswordConfirmForm } from '../../_components';

type ResetPasswordConfirmPageParams = {
	params: Promise<{
		token: string;
	}>;
};

export default async function ResetPasswordConfirmPage({
	params,
}: ResetPasswordConfirmPageParams) {
	const { token } = await params;
	return <ResetPasswordConfirmForm token={token} />;
}
