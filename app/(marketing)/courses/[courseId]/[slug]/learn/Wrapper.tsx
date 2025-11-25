'use client';

import { useCourseStore } from '@/store';
import { useEffect } from 'react';

export default function CourseLearnWrapper({
	courseId,
	slug,
}: {
	courseId: string;
	slug: string;
}) {
	const setLastVisitedCourse = useCourseStore(
		state => state.setLastVisitedCourse,
	);

	useEffect(() => {
		if (!courseId) return;
		setLastVisitedCourse({ id: courseId, slug });
	}, [setLastVisitedCourse, courseId, slug]);

	return (
		<div>
			<h1>courseId: {courseId}</h1>
			<h2>slug: {slug}</h2>

			<p>Learn</p>
		</div>
	);
}
