type ResultStatProps = {
	label: string;
	icon: string;
};

export default function ResultStat({ icon, label }: ResultStatProps) {
	return (
		<div className="flex items-center gap-2">
			<svg className="size-5">
				<use href={`/icons/sprite.svg#${icon}`} />
			</svg>
			<span className="text-muted-foreground text-sm">{label}</span>
		</div>
	);
}
