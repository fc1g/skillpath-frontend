import type { ReactNode } from 'react';

type ErrorProps = {
	title: string;
	subtitle: string;
	children: ReactNode;
};

export default function Error({ title, subtitle, children }: ErrorProps) {
	return (
		<section className="flex min-h-[60vh] w-full flex-1 items-center justify-center">
			<div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-16">
				<div className="mx-auto max-w-screen-sm text-center">
					<h1 className="text-primary mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
						404
					</h1>
					<p className="text-secondary-foreground mb-4 text-3xl font-bold tracking-tight md:text-4xl">
						{title}
					</p>
					<p className="text-muted-foreground mb-4 text-lg font-light">
						{subtitle}
					</p>
					<div className="flex justify-center gap-4">{children}</div>
				</div>
			</div>
		</section>
	);
}
