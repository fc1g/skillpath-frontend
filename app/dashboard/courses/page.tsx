'use client';

import {
	Button,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { toast } from 'sonner';

export default function MyCoursesPage() {
	return (
		<div>
			<h2 className="text-foreground mb-4 text-2xl font-semibold">
				Active Courses
			</h2>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Introduction to JavaScript</CardTitle>
						<CardDescription>Last accessed 2 hours ago</CardDescription>
						<CardAction>33%</CardAction>
					</CardHeader>
					<CardContent>
						<Button
							className="flex items-center justify-center"
							onClick={() => toast.info("Doesn't work yet, sorry!")}
						>
							Continue Learning
						</Button>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>React Development Bootcamp</CardTitle>
						<CardDescription>Last accessed 1 day ago</CardDescription>
						<CardAction>15%</CardAction>
					</CardHeader>
					<CardContent>
						<Button
							className="flex items-center justify-center"
							onClick={() => toast.info("Doesn't work yet, sorry!")}
						>
							Continue Learning
						</Button>
					</CardContent>
				</Card>
			</div>

			<h2 className="text-foreground mt-8 mb-4 text-2xl font-semibold">
				Completed Courses
			</h2>

			<Card>
				<CardHeader>
					<div className="flex items-center gap-4">
						<svg className="size-6">
							<use href="/icons/sprite.svg#check" />
						</svg>
						<div>
							<CardTitle>HTML & CSS Fundamentals</CardTitle>
							<CardDescription>Completed March 15, 2024</CardDescription>
						</div>
					</div>
					<CardAction>
						<Button onClick={() => toast.info("Doesn't work yet, sorry!")}>
							View Certificate
						</Button>
					</CardAction>
				</CardHeader>
			</Card>
		</div>
	);
}
