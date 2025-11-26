import {
	HeroActions,
	HomeSearchBar,
	PopularCoursesSection,
} from './(marketing)/_components';
import { HeroSection } from '@/components/common';

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

			<HomeSearchBar />

			<PopularCoursesSection />
		</>
	);
}
