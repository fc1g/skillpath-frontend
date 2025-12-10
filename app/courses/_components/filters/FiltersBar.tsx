import { CourseLevel } from '@/types/courses';
import FilterChip from './FilterChip';
import FilterGroup from './FilterGroup';

const categories = [
	'All',
	'Web Development',
	'Mobile Development',
	'Game Development',
];

const levels = ['All', ...Object.values(CourseLevel)];

export default function CoursesFiltersBar() {
	return (
		<div className="flex flex-col flex-wrap items-center justify-center gap-16 px-4 md:flex-row">
			<div className="space-y-2">
				<FilterGroup label="Category" />
				<div className="flex flex-wrap gap-2">
					{categories.map(label => (
						<FilterChip
							key={`${label}-category`}
							label={label}
							param="category"
						/>
					))}
				</div>
			</div>
			<div className="space-y-2">
				<FilterGroup label="Level" />
				<div className="flex flex-wrap gap-2">
					{levels.map(label => (
						<FilterChip key={`${label}-level`} label={label} param="level" />
					))}
				</div>
			</div>
		</div>
	);
}
