import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import ResultStat from './ResultStat';

export default function ResultsPanel() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Results</CardTitle>
				<CardDescription>You can view your results here</CardDescription>
				<CardAction className="flex items-center gap-4">
					<ResultStat label="0 passed" icon="check" />

					<ResultStat label="0 failed" icon="x-circle" />

					<ResultStat label="0 ms" icon="clock" />
				</CardAction>
			</CardHeader>
		</Card>
	);
}
