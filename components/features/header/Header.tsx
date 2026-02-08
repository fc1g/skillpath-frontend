import { ThemeToggle } from '@/components/ui';
import { profileOptions } from '@/hooks/queries';
import { getQueryClient } from '@/lib/get-query-client';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import Link from 'next/link';
import AccountMenu from './AccountMenu';

export default async function Header() {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery(profileOptions);

	return (
		<header className="border-secondary h-18 border-b p-4">
			<div className="container mx-auto flex w-full items-center justify-between">
				<Link href="/" prefetch={false}>
					<span
						aria-label="SkillPath"
						className="text-lg font-bold tracking-tight sm:text-xl"
					>
						SkillPath
					</span>
				</Link>

				<div className="flex gap-4">
					<HydrationBoundary state={dehydrate(queryClient)}>
						<AccountMenu />
					</HydrationBoundary>
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
