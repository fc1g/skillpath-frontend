import { CoursesFilterChip, CoursesFilterGroup } from '@/components/features';
import { CourseLevel } from '@/types/courses';
import { nanoid } from 'nanoid';

const categories = [
	'All',
	'Web Development',
	'Mobile Development',
	'Game Development',
];

const levels = [
	'All',
	CourseLevel.BEGINNER,
	CourseLevel.INTERMEDIATE,
	CourseLevel.ADVANCED,
];

export default function CoursesFiltersBar() {
	return (
		<div className="flex flex-col flex-wrap items-center justify-center gap-16 px-4 md:flex-row">
			<div className="space-y-2">
				<CoursesFilterGroup label="Category" />
				<div className="flex flex-wrap gap-2">
					{categories.map(category => (
						<CoursesFilterChip
							key={nanoid(6)}
							label={category}
							fieldKey="category"
						/>
					))}
				</div>
			</div>
			<div className="space-y-2">
				<CoursesFilterGroup label="Level" />
				<div className="flex flex-wrap gap-2">
					{levels.map(level => (
						<CoursesFilterChip key={nanoid(6)} label={level} fieldKey="level" />
					))}
				</div>
			</div>
		</div>
	);
}
