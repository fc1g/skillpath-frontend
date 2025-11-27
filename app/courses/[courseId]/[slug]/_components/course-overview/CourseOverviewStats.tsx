import { CourseMetaItem } from '@/components/features';

type CourseOverviewStatsProps = {
	averageRating: number;
	ratingsCount: number;
	studentsCount: number;
	durationHours: number;
};

export default function CourseOverviewStats({
	averageRating,
	ratingsCount,
	studentsCount,
	durationHours,
}: CourseOverviewStatsProps) {
	return (
		<div className="mt-[clamp(1.5rem,3vw,2rem)] mb-[clamp(3rem,5vw,4rem)] flex items-center gap-[clamp(1rem,5vw,3rem)] sm:items-center">
			<CourseMetaItem
				label={`${averageRating.toFixed(2)} (${ratingsCount} ratings)`}
				icon="star"
			/>
			<CourseMetaItem label={`${studentsCount} students`} icon="users" />
			<CourseMetaItem label={`${durationHours} hours`} icon="clock" />
		</div>
	);
}