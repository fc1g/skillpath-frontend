import { CourseMetaItem } from '@/components/features';
import { formatDuration, formatRating } from '@/lib/courses';

type CourseOverviewStatsProps = {
	averageRating: number;
	ratingsCount: number;
	studentsCount: number;
	durationSeconds: number;
};

export default function CourseOverviewStats({
	averageRating,
	ratingsCount,
	studentsCount,
	durationSeconds,
}: CourseOverviewStatsProps) {
	const formattedDuration = formatDuration(durationSeconds);
	let durationLabel;

	if (typeof formattedDuration === 'string') {
		durationLabel = formattedDuration;
	} else {
		durationLabel = `${formattedDuration} ${formattedDuration === 1 ? 'hour' : 'hours'}`;
	}

	return (
		<div className="mt-[clamp(1.5rem,3vw,2rem)] mb-[clamp(3rem,5vw,4rem)] flex items-center gap-[clamp(1rem,5vw,3rem)] sm:items-center">
			<CourseMetaItem
				label={`${formatRating(averageRating)} (${ratingsCount} ${ratingsCount === 1 ? 'rating' : 'ratings'})`}
				icon="star"
			/>
			<CourseMetaItem
				label={`${studentsCount} ${studentsCount === 1 ? 'student' : 'students'}`}
				icon="users"
			/>
			<CourseMetaItem label={durationLabel} icon="clock" />
		</div>
	);
}
