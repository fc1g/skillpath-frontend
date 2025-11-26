type CoursesFilterGroupProps = { label: string };

export default function CoursesFilterGroup({ label }: CoursesFilterGroupProps) {
	return (
		<div className="text-muted-foreground flex items-center gap-2">
			<svg className="size-5">
				<use href="/icons/sprite.svg#funnel" />
			</svg>
			<span className="text-sm font-medium">{label}</span>
		</div>
	);
}
