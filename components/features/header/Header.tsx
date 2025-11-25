import { ThemeToggle } from '@/components/ui';
import AccountMenu from './AccountMenu';
import Link from 'next/link';

export default function Header() {
	return (
		<header className="border-secondary border-b p-4">
			<div className="container mx-auto flex w-full items-center justify-between">
				<Link href="/">
					<div className="flex items-center justify-center space-x-2">
						<svg className="size-6 text-blue-600 dark:text-blue-300">
							<use href="/icons/sprite.svg#code" />
						</svg>
						<span
							aria-label="SkillPath"
							className="text-lg font-bold tracking-tight sm:text-xl"
						>
							SkillPath
						</span>
					</div>
				</Link>

				<div className="flex gap-4">
					<AccountMenu />

					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
