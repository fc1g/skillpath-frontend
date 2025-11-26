import { CourseLevel } from '@/types/courses';
import CoursesFilterChip from './CoursesFilterChip';
import CoursesFilterGroup from './CoursesFilterGroup';

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
				<CoursesFilterGroup label="Category" />
				<div className="flex flex-wrap gap-2">
					{categories.map(label => (
						<CoursesFilterChip
							key={`${label}-category`}
							label={label}
							param="category"
						/>
					))}
				</div>
			</div>
			<div className="space-y-2">
				<CoursesFilterGroup label="Level" />
				<div className="flex flex-wrap gap-2">
					{levels.map(label => (
						<CoursesFilterChip
							key={`${label}-level`}
							label={label}
							param="level"
						/>
					))}
				</div>
			</div>
		</div>
	);
}
