type CourseLearningOutcomesProps = {
	outcomes: string[];
};

export default function CourseLearningOutcomes({
	outcomes,
}: CourseLearningOutcomesProps) {
	return (
		<>
			<h2 className="text-foreground mb-4 text-2xl font-bold">
				What you&apos;ll learn
			</h2>

			<ul className="mb-[clamp(2rem,4vw,3rem)] grid gap-4 md:grid-cols-2">
				{outcomes.map(outcome => (
					<li className="text-foreground flex items-center gap-2" key={outcome}>
						<svg className="size-5">
							<use href="/icons/sprite.svg#check" />
						</svg>
						<span>{outcome}</span>
					</li>
				))}
			</ul>
		</>
	);
}