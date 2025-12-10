'use client';

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/routes';
import { useUser } from '@/store';
import { useCreateCourseProgress } from '@/hooks';
import { CourseProgressStatus } from '@/types/progress';

type CourseEnrollmentCardProps = {
	courseId: string;
	courseSlug: string;
	includedFeatures: string[];
};

export default function CourseEnrollmentCard({
	courseId,
	courseSlug,
	includedFeatures,
}: CourseEnrollmentCardProps) {
	const router = useRouter();
	const { createCourseProgress, loading, error } = useCreateCourseProgress();
	const user = useUser();

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
						onClick={async () => {
							await createCourseProgress({
								status: CourseProgressStatus.ENROLLED,
								userId: user!.id,
								courseId,
								lastAccessedAt: new Date().toISOString(),
							});
							router.push(
								`${APP_ROUTES.COURSES}/${courseId}/${courseSlug}/learn`,
							);
						}}
						disabled={loading || !!error || !user?.id}
						className="flex cursor-pointer items-center justify-center gap-2"
						variant="ghost"
					>
						<svg className="size-5">
							<use href="/icons/sprite.svg#play" />
						</svg>
						<span>{loading ? 'Loading...' : 'Start Course'}</span>
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
