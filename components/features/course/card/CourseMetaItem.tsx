type CourseMetaItemProps = {
	label: string;
	icon: string;
};

export default function CourseMetaItem({ label, icon }: CourseMetaItemProps) {
	return (
		<div className="text-muted-foreground flex flex-wrap items-center justify-center gap-1 text-sm">
			<svg
				className={`size-5 ${icon === 'star' ? 'fill-none text-yellow-600 dark:text-yellow-300' : ''}`}
			>
				<use href={`/icons/sprite.svg#${icon}`} />
			</svg>
			<span className="font-bold">{label}</span>
		</div>
	);
}
