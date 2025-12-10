import { ThemeToggle } from '@/components/ui';
import Link from 'next/link';
import AccountMenu from './AccountMenu';

export default function Header() {
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
					<AccountMenu />

					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
