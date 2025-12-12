'use client';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui';
import Link from 'next/link';
import { Section } from '@/types/courses';
import { CourseProgress } from '@/types/progress';
import { LessonProgressStatus } from '@/types/progress/lesson-progress';
import { useActiveSection } from '@/hooks';
import { calculateSectionProgress } from '@/lib/courses';

type CourseSectionProps = {
	section: Section;
	progress: CourseProgress;
	index: number;
	baseHref: string;
};

export default function CourseSection({
	section,
	progress,
	index,
	baseHref,
}: CourseSectionProps) {
	const { isActiveSection, isOpen, handleOpenChange, lessonId, challengeId } =
		useActiveSection(section);

	const { uncompletedCount } = calculateSectionProgress(section, progress);

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Section {index}</SidebarGroupLabel>
			<SidebarMenu>
				<Collapsible
					open={isOpen}
					onOpenChange={handleOpenChange}
					className="group/collapsible"
				>
					<SidebarMenuItem>
						<CollapsibleTrigger asChild>
							<SidebarMenuButton isActive={isActiveSection}>
								{section.title}
							</SidebarMenuButton>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<SidebarMenuSub>
								{section.lessons.map(lesson => {
									const lessonProgress = progress.lessonsProgresses.find(
										lessonProgress => lessonProgress.lessonId === lesson.id,
									);

									if (!lessonProgress) {
										// 	TODO: Create lesson progress
									}

									return (
										<SidebarMenuSubItem key={lesson.id}>
											<SidebarMenuSubButton
												asChild
												isActive={lessonId === lesson.id}
											>
												<Link href={`${baseHref}/lesson/${lesson.id}`}>
													<div>
														<svg className="size-5">
															<use
																href={`/icons/sprite.svg#${lessonProgress?.status.toLowerCase() === LessonProgressStatus.COMPLETED ? 'check' : 'unchecked'}`}
															/>
														</svg>
													</div>
													<span>{lesson.title}</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									);
								})}

								{section.challenges.map(challenge => {
									return (
										<SidebarMenuSubItem key={challenge.id}>
											<SidebarMenuSubButton
												asChild
												isActive={challengeId === challenge.id}
											>
												<Link href={`${baseHref}/challenge/${challenge.id}`}>
													<div>
														<svg className="size-5">
															<use href={`/icons/sprite.svg#unchecked`} />
														</svg>
													</div>
													<span>{challenge.title}</span>
												</Link>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									);
								})}
							</SidebarMenuSub>
						</CollapsibleContent>
						<SidebarMenuBadge>
							{uncompletedCount ? uncompletedCount : ''}
						</SidebarMenuBadge>
					</SidebarMenuItem>
				</Collapsible>
			</SidebarMenu>
		</SidebarGroup>
	);
}
