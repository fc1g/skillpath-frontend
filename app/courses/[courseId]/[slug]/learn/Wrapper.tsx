'use client';

import { useCourseStore } from '@/store';
import { Course } from '@/types/courses';
import { useEffect } from 'react';

export default function CourseLearnWrapper({ course }: { course: Course }) {
	const setLastVisitedCourse = useCourseStore(
		state => state.setLastVisitedCourse,
	);

	const { id, slug } = course;

	useEffect(() => {
		setLastVisitedCourse({ id, slug });
	}, [id, slug, setLastVisitedCourse]);

	return (
		<div>
			<h1>courseId: {course.id}</h1>
			<h2>slug: {course.slug}</h2>

			<p>Learn</p>
		</div>
	);
}
