import { Badge } from '@/components/ui';

type CourseLevelBadgeProps = { level: string };

export default function CourseLevelBadge({ level }: CourseLevelBadgeProps) {
	return (
		<Badge variant="secondary" className="font-bold capitalize">
			{level}
		</Badge>
	);
}
