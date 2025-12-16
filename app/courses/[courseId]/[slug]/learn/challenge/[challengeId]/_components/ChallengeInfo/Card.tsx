import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import type { ReactNode } from 'react';

type GridCardProps = {
	label: string;
	icon: string;
	children: ReactNode;
	className?: string;
};

export default function GridCard({
	label,
	icon,
	children,
	className,
}: GridCardProps) {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 space-y-4">
					<div className="mb-0 flex items-center justify-center">
						<svg className="size-5">
							<use href={`/icons/sprite.svg#${icon}`} />
						</svg>
					</div>
					<span>{label}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}
