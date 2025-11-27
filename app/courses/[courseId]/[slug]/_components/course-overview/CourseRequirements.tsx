type CourseRequirementsProps = {
	requirements: string[];
};

export default function CourseRequirements({
	requirements,
}: CourseRequirementsProps) {
	return (
		<>
			<h2 className="text-foreground mb-4 text-2xl font-bold">Requirements</h2>

			<ul className="mb-[clamp(2rem,4vw,3rem)] flex flex-col gap-4">
				{requirements.map(requirement => (
					<li className="text-foreground ml-4 list-disc" key={requirement}>
						{requirement}
					</li>
				))}
			</ul>
		</>
	);
}