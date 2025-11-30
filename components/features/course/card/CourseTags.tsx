import { Tag } from '@/types/courses';
import { Badge } from '@/components/ui';
import { COURSE_CARD_TAG_LIMIT } from '@/lib/courses';

type CourseTagsProps = {
	data: Tag[];
	limit?: number;
};

export default function CourseTags({
	data,
	limit = COURSE_CARD_TAG_LIMIT,
}: CourseTagsProps) {
	return (
		<ul className="my-2 flex flex-wrap items-center gap-2">
			{data.slice(0, limit).map(({ id, name }, i) => (
				<li key={`${id}-${i}`}>
					<Badge variant="outline">{name}</Badge>
				</li>
			))}
			{data.length > limit && (
				<li>
					<Badge variant="outline">+{data.length - limit}</Badge>
				</li>
			)}
		</ul>
	);
}
