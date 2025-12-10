type AssistantChatPageParams = {
	params: Promise<{
		chatId: string;
	}>;
};

export default async function AssistantChatPage({
	params,
}: AssistantChatPageParams) {
	const { chatId } = await params;

	return <div>Assistant Chat Page: {chatId}</div>;
}
