import { Badge } from '@/components/ui';
import { CourseLevel } from '@/types/courses';

type CourseLevelBadgeProps = { level: CourseLevel };

export default function CourseLevelBadge({ level }: CourseLevelBadgeProps) {
	return (
		<Badge variant="secondary" className="font-bold capitalize">
			{level}
		</Badge>
	);
}
