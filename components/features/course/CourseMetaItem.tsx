type CourseMetaItemProps = {
	label: string;
	icon: string;
};

export default function CourseMetaItem({ label, icon }: CourseMetaItemProps) {
	return (
		<div className="text-muted-foreground flex items-center justify-center gap-1 text-sm">
			<svg className="size-5">
				<use href={`/icons/sprite.svg#${icon}`} />
			</svg>
			<span>{label}</span>
		</div>
	);
}
