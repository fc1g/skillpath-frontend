import { Button } from '@/components/ui';

type OAuthButtonProps = {
	icon: string;
	className?: string;
	onClick?: () => void;
};

export default function OAuthButton({
	icon,
	className,
	onClick,
}: OAuthButtonProps) {
	return (
		<Button
			type="button"
			className="w-full cursor-pointer"
			variant="outline"
			size="icon-lg"
			onClick={onClick}
		>
			<svg className={className}>
				<use href={`/icons/sprite.svg#${icon}`} />
			</svg>
		</Button>
	);
}
