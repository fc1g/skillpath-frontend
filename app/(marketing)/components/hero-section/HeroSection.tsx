import HeroActions from '@/app/(marketing)/components/hero-section/HeroActions';

export default function HeroSection() {
	return (
		<section className="bg-primary-foreground from-secondary dark:from-primary-foreground to-background mb-[clamp(1rem,3vw,2rem)] bg-gradient-to-b py-[clamp(3rem,3vw,5rem)]">
			<div className="container mx-auto w-full px-2 text-center sm:px-4">
				<h1 className="text-foreground mx-auto mb-4 max-w-sm text-3xl font-bold sm:max-w-lg sm:text-4xl md:max-w-2xl md:text-5xl lg:max-w-full">
					Today is the day to{' '}
					<span className="text-blue-700 dark:text-blue-300">change</span> your
					life
				</h1>
				<p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
					Master new skills with interactive courses designed by experts. Learn
					at your own pace, build real projects, and advance your career.
				</p>

				<HeroActions />
			</div>
		</section>
	);
}
