import { Button } from '@/components/ui';
import Link from 'next/link';

type SectionNavBtnProps = {
	label: string;
	linkHref: string;
	isCompleted: boolean;
	isDisabled: boolean;
};

export default function SectionNavBtn({
	label,
	linkHref,
	isCompleted,
	isDisabled,
}: SectionNavBtnProps) {
	return (
		<Button variant="ghost" size="lg" asChild disabled={isDisabled}>
			<Link href={linkHref}>
				<svg className="size-5">
					<use
						href={`/icons/sprite.svg#${isCompleted ? 'check' : 'unchecked'}`}
					/>
				</svg>
				<span className="text-foreground text-sm">{label}</span>
			</Link>
		</Button>
	);
}
