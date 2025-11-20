import PopularCourseCard from './PopularCourseCard';
import PopularCourseCardWrapper from './PopularCourseCardWrapper';

export default function PopularCoursesSection() {
	return (
		<section className="container mx-auto my-[clamp(2rem,4vw,3rem)] w-full px-4">
			<h2 className="text-foreground mb-8 text-center text-3xl font-bold md:text-start">
				Popular Courses
			</h2>

			<div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
				<PopularCourseCardWrapper>
					<PopularCourseCard />
				</PopularCourseCardWrapper>

				<PopularCourseCardWrapper>
					<PopularCourseCard />
				</PopularCourseCardWrapper>

				<PopularCourseCardWrapper>
					<PopularCourseCard />
				</PopularCourseCardWrapper>

				<PopularCourseCardWrapper>
					<PopularCourseCard />
				</PopularCourseCardWrapper>

				<PopularCourseCardWrapper>
					<PopularCourseCard />
				</PopularCourseCardWrapper>

				<PopularCourseCardWrapper>
					<PopularCourseCard />
				</PopularCourseCardWrapper>
			</div>
		</section>
	);
}
