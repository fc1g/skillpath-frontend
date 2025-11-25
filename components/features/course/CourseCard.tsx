'use client';

import {
	CourseContent,
	CourseLevelBadge,
	CourseMetaItem,
	CourseRating,
} from '@/components/features';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import { useSpotlightEffect } from '@/hooks/useSpotlightEffect';
import { Course, CourseLevel } from '@/types/courses';
import Link from 'next/link';

type CourseCardProps = {
	data: Course;
};

export default function CourseCard({ data }: CourseCardProps) {
	useSpotlightEffect();

	return (
		<Link href={`${APP_ROUTES.COURSES}/${data.id}/${data.slug}/`}>
			<Card className="spotlight-card">
				<CardHeader>
					<CardDescription>
						<CourseLevelBadge level={CourseLevel[data.level]} />
					</CardDescription>
					<CardAction>
						<CourseRating rating={data.averageRating} />
					</CardAction>
				</CardHeader>
				<CardContent>
					<CourseContent title={data.title} subtitle={data.subtitle} />
				</CardContent>
				<CardFooter>
					<div className="flex w-full justify-between">
						<CourseMetaItem
							label={data.durationHours.toString()}
							icon="clock"
						/>
						<CourseMetaItem
							label={data.studentsCount.toString()}
							icon="users"
						/>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}
