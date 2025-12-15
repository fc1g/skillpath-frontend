import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { EmptyMessage } from '@/components/common';

export default function AssistantPage() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl leading-none font-semibold tracking-tight">
					AI Assistant Conversations
				</CardTitle>
				<CardDescription>
					View your previous conversations with the AI learning assistant
				</CardDescription>
			</CardHeader>

			<EmptyMessage
				icon="message"
				title="This feature is coming soon."
				description="We are working hard to bring you this feature."
			/>
		</Card>
	);
}
