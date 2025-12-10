type ChallengeHeaderProps = {
	challengeTitle: string;
	sectionTitle: string;
};

export default function ChallengeHeader({
	challengeTitle,
	sectionTitle,
}: ChallengeHeaderProps) {
	return (
		<div className="border-l-foreground border-l-4 pl-4">
			<h1 className="text-foreground mb-2 text-2xl font-bold">
				Section Challenge: {challengeTitle}
			</h1>
			<p className="text-muted-foreground text-sm">
				{sectionTitle} - Final Challenge
			</p>
		</div>
	);
}
