import { Challenge } from '@/types/courses';
import GridCard from './Card';

type ChallengeInfoGridProps = {
	challenge: Challenge;
};

export default function ChallengeInfoGrid({
	challenge,
}: ChallengeInfoGridProps) {
	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
			<GridCard label="Instructions" icon="book-open">
				<p className="text-foreground">{challenge.instructions}</p>
			</GridCard>

			<GridCard label="Requirements" icon="check">
				<ul>
					{challenge.requirements.map(requirement => (
						<li className="ml-4 list-disc" key={requirement}>
							{requirement}
						</li>
					))}
				</ul>
			</GridCard>

			<GridCard
				className="lg:col-span-2 xl:col-span-1"
				label="Example"
				icon="code"
			>
				<pre className="wrap-break-word whitespace-pre-wrap">
					<code>{challenge.example}</code>
				</pre>
			</GridCard>
		</div>
	);
}
