import {
	HeroSection,
	SearchBarSkeleton,
	HomeSearchBar,
} from '@/components/common';
import { Suspense } from 'react';
import { Actions, PopularCourses } from './(home)/_components';

export default function Home() {
	return (
		<>
			<HeroSection
				title="Today is the day to change your life"
				subtitle="Master new skills with interactive courses designed by experts. Learn
					at your own pace, build real projects, and advance your career."
			>
				<Actions />
			</HeroSection>

			<Suspense fallback={<SearchBarSkeleton />}>
				<HomeSearchBar />
			</Suspense>

			<PopularCourses />
		</>
	);
}
