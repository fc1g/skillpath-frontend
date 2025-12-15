'use client';

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Spinner,
} from '@/components/ui';
import { useRouter } from 'next/navigation';
import { useCreateCourseProgress } from '@/hooks';
import { APP_ROUTES } from '@/constants/routes';
import { CourseProgressStatus } from '@/types/progress';
import { useProfile } from '@/hooks/queries';

type CourseEnrollmentCardProps = {
	courseId: string;
	courseSlug: string;
	firstLessonId?: string;
	includedFeatures: string[];
};

export default function CourseEnrollmentCard({
	courseId,
	courseSlug,
	firstLessonId,
	includedFeatures,
}: CourseEnrollmentCardProps) {
	const router = useRouter();
	const { createCourseProgress, loading, error } = useCreateCourseProgress();
	const {
		isPending: isPendingProfile,
		isError: isErrorProfile,
		data,
	} = useProfile();

	const handleClick = async () => {
		if (isErrorProfile || !data) {
			router.push(APP_ROUTES.LOGIN);
			return;
		}

		await createCourseProgress({
			status: CourseProgressStatus.ENROLLED,
			courseId,
			lastAccessedAt: new Date().toISOString(),
		});
		router.push(
			`${APP_ROUTES.COURSES}/${courseId}/${courseSlug}/learn/${firstLessonId ? `lesson/${firstLessonId}` : ''}`,
		);
	};

	return (
		<div className="max-w-xl lg:col-span-1 lg:max-w-none">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl leading-none font-semibold tracking-tight">
						Start Learning Today
					</CardTitle>
					<CardDescription className="text-muted-foreground text-sm">
						Get instant access to all course materials
					</CardDescription>

					<Button
						onClick={handleClick}
						disabled={loading || !!error || isPendingProfile}
						className="flex cursor-pointer items-center justify-center gap-2"
						variant="ghost"
					>
						{loading ? (
							<>
								<Spinner />
								<span>Loading...</span>
							</>
						) : (
							<>
								<svg className="size-5">
									<use href="/icons/sprite.svg#play" />
								</svg>
								<span>Start Course</span>
							</>
						)}
					</Button>
				</CardHeader>
				<CardContent className="space-y-3">
					<h3 className="text-foreground font-semibold">
						This course includes:
					</h3>

					<ul className="flex flex-col gap-2">
						{includedFeatures.map(feature => (
							<li
								className="text-muted-foreground ml-4 list-disc text-sm"
								key={feature}
							>
								{feature}
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
