import AccountMenu from '@/components/features/header/AccountMenu';

export default function Header() {
	return (
		<header className="mx-auto flex w-full items-center justify-between p-4">
			<span>SkillPath</span>

			<AccountMenu />
		</header>
	);
}
