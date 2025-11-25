import type { ReactNode } from 'react';

type HeroSectionProps = {
	title: string;
	subtitle: string;
	children?: ReactNode;
};

export default function HeroSection({
	title,
	subtitle,
	children,
}: HeroSectionProps) {
	return (
		<section
			className={`bg-primary-foreground from-secondary dark:from-primary-foreground to-background ${children && 'mb-[clamp(1rem,3vw,2rem)]'} bg-linear-to-b py-[clamp(3rem,3vw,5rem)]`}
		>
			<div className="container mx-auto w-full px-2 text-center sm:px-4">
				<h1 className="text-foreground mx-auto mb-4 max-w-sm text-3xl font-bold sm:max-w-lg sm:text-4xl md:max-w-2xl md:text-5xl lg:max-w-full">
					{title}
				</h1>
				<p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
					{subtitle}
				</p>

				{children}
			</div>
		</section>
	);
}
