import { Button } from '@/components/ui';
import Link from 'next/link';

type ActionBtnProps = {
	label: string;
	href: string;
	variant: 'default' | 'outline';
};

export default function ActionBtn({ label, href, variant }: ActionBtnProps) {
	return (
		<Button size="lg" variant={variant} asChild className="max-w-max">
			<Link href={href}>{label}</Link>
		</Button>
	);
}
