import { HeroSection, SearchBarSkeleton } from '@/components/common';
import { Suspense } from 'react';
import {
	HeroActions,
	HomeSearchBar,
	PopularCoursesSection,
} from './_components';

export default function Home() {
	return (
		<>
			<HeroSection
				title="Today is the day to change your life"
				subtitle="Master new skills with interactive courses designed by experts. Learn
					at your own pace, build real projects, and advance your career."
			>
				<HeroActions />
			</HeroSection>

			<Suspense fallback={<SearchBarSkeleton />}>
				<HomeSearchBar />
			</Suspense>

			<PopularCoursesSection />
		</>
	);
}
