import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { APP_ROUTES } from '@/constants/routes';
import Link from 'next/link';

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
	return (
		<div className="max-w-72 lg:col-span-1 lg:max-w-none">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl leading-none font-semibold tracking-tight">
						Start Learning Today
					</CardTitle>
					<CardDescription className="text-muted-foreground text-sm">
						Get instant access to all course materials
					</CardDescription>

					<Button className="cursor-pointer" variant="ghost" asChild>
						<div className="flex items-center justify-center gap-2">
							<svg className="size-5">
								<use href="/icons/sprite.svg#play" />
							</svg>
							<Link
								href={`${APP_ROUTES.COURSES}/${courseId}/${courseSlug}/learn`}
							>
								Start Course
							</Link>
						</div>
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