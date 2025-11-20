import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, } from '@/components/ui';
import Link from 'next/link';
import { CourseContent, CourseLevelBadge, CourseMetaItem, CourseRating, } from '@/components/features';

export default function PopularCourseCard() {
	return (
		<Link href="/courses/1234">
			<Card className="spotlight-card">
				<CardHeader>
					<CardDescription>
						<CourseLevelBadge level="beginner" />
					</CardDescription>

					<CardAction>
						<CourseRating rating={4.9} />
					</CardAction>
				</CardHeader>
				<CardContent>
					<CourseContent
						title="Introduction to JavaScript"
						description="Learn the fundamentals of JavaScript programming"
					/>
				</CardContent>
				<CardFooter>
					<div className="flex w-full justify-between">
						<CourseMetaItem label="8 hourse" icon="clock" />
						<CourseMetaItem label="1234" icon="users" />
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}
