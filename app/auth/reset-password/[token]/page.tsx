type ResetPasswordGeneratedPageParams = {
	params: Promise<{
		token: string;
	}>;
};

export default async function ResetPasswordGeneratedPage({
	params,
}: ResetPasswordGeneratedPageParams) {
	const { token } = await params;
	return <div>Reset Password Generated Page: {token}</div>;
}
