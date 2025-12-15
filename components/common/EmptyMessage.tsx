import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui';

type EmptyMessageProps = {
	icon: string;
	title: string;
	description: string;
};

export default function EmptyMessage({
	icon,
	title,
	description,
}: EmptyMessageProps) {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<svg className="size-6">
						<use href={`/icons/sprite.svg#${icon}`} />
					</svg>
				</EmptyMedia>
				<EmptyTitle>{title}</EmptyTitle>
				<EmptyDescription>{description}</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}
