type CourseDescriptionProps = {
	description: string;
};

export default function CourseDescription({
	description,
}: CourseDescriptionProps) {
	return (
		<>
			<h2 className="text-foreground mb-4 text-2xl font-bold">
				Course Description
			</h2>

			<p className="text-foreground">{description}</p>
		</>
	);
}
