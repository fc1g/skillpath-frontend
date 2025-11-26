type CourseContentProps = {
	title: string;
	subtitle: string;
};

export default function CourseContent({ title, subtitle }: CourseContentProps) {
	return (
		<div className="space-y-1.5">
			<h3 className="text-xl font-semibold tracking-tight">{title}</h3>
			<p className="text-muted-foreground line-clamp-2 text-sm">{subtitle}</p>
		</div>
	);
}
