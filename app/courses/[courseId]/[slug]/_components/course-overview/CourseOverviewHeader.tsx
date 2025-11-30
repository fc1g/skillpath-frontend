import { CourseLevelBadge, CourseTags } from '@/components/features';
import { CourseLevel, Tag } from '@/types/courses';
import { COURSE_OVERVIEW_PAGE_TAG_LIMIT } from '@/lib/courses';

type CourseOverviewHeaderProps = {
	level: keyof typeof CourseLevel;
	title: string;
	subtitle: string;
	tags: Tag[];
};

export default function CourseOverviewHeader({
	level,
	title,
	subtitle,
	tags,
}: CourseOverviewHeaderProps) {
	return (
		<>
			<CourseLevelBadge level={CourseLevel[level]} />
			<h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
				{title}
			</h1>
			<p className="text-muted-foreground mb-6 text-lg md:text-xl">
				{subtitle}
			</p>

			{Array.isArray(tags) && tags.length > 0 && (
				<CourseTags data={tags} limit={COURSE_OVERVIEW_PAGE_TAG_LIMIT} />
			)}
		</>
	);
}
