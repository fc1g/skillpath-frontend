import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	SidebarRail,
	Skeleton,
} from '@/components/ui';
import { nanoid } from 'nanoid';

const STARS_COUNT = 5;

export default function SidebarSkeleton() {
	return (
		<Sidebar>
			<SidebarHeader>
				<div className="bg-card mb-4 p-4">
					<Skeleton className="text-foreground my-2 h-4 w-36 text-lg font-semibold" />
					<ul className="my-4 flex flex-col gap-3">
						<li>
							<Skeleton className="text-foreground h-4 w-44 text-sm" />
						</li>
						<li>
							<Skeleton className="text-foreground h-4 w-48 text-sm" />
						</li>
					</ul>

					<Skeleton className="h-2 w-full" />
				</div>
			</SidebarHeader>

			<SidebarContent className="no-scrollbar">
				{Array.from({ length: 3 }, (_, index) => (
					<SidebarGroup key={nanoid(6)}>
						<SidebarGroupLabel>
							<Skeleton className="h-3 w-14" />
						</SidebarGroupLabel>
						<SidebarMenu>
							<Collapsible defaultOpen={index === 0}>
								<SidebarMenuItem>
									<CollapsibleTrigger asChild>
										<SidebarMenuButton>
											<Skeleton className="h-4 w-36" />
										</SidebarMenuButton>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub>
											{Array.from({ length: 3 }, () => (
												<SidebarMenuSubItem key={nanoid(6)}>
													<SidebarMenuSubButton>
														<Skeleton className="h-4 w-full" />
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
									<SidebarMenuBadge>
										<Skeleton className="h-4 w-4" />
									</SidebarMenuBadge>
								</SidebarMenuItem>
							</Collapsible>
						</SidebarMenu>
					</SidebarGroup>
				))}
			</SidebarContent>

			<SidebarFooter>
				<div className="bg-muted/50 border-border rounded-lg border p-3">
					<div className="mb-4 flex items-center justify-center">
						<Skeleton className="text-foreground text-md h-4 w-28 font-medium" />
					</div>
					<div className="flex items-center justify-center gap-1">
						{Array.from({ length: STARS_COUNT }, (_, i) => {
							const starValue = i + 1;
							return (
								<Button key={starValue} variant="ghost" size="icon-sm">
									<Skeleton className="size-6" />
								</Button>
							);
						})}
					</div>
					<Button
						className="mt-3 -mb-[0.35rem] w-full"
						size="sm"
						variant="default"
					/>
				</div>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}
