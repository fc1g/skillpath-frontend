import {
	CourseProgressTracker,
	StepNav,
} from '@/app/courses/[courseId]/[slug]/learn/_components';
import { getCourse } from '@/services/graphql/courses';
import { getLesson } from '@/services/graphql/courses/lessons';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { QuizStepper } from './_components';

export type LessonPageProps = {
	params: Promise<{
		lessonId: string;
		slug: string;
		courseId: string;
	}>;
};

export { generateMetadata, generateStaticParams } from '@/lib/courses/lessons';
export const revalidate = 60;

export default async function LessonPage({ params }: LessonPageProps) {
	const { lessonId, courseId, slug } = await params;

	const [course, lesson] = await Promise.all([
		getCourse(courseId),
		getLesson(lessonId),
	]);

	if (!lesson || !course) return notFound();

	return (
		<div className="flex flex-1 flex-col gap-6 p-4 sm:p-8">
			<CourseProgressTracker
				courseId={courseId}
				slug={slug}
				lessonId={lessonId}
			/>
			<article className="prose prose-slate dark:prose-invert prose-pre:whitespace-pre-wrap prose-pre:wrap-break-word max-w-none wrap-break-word">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{lesson.content}
				</ReactMarkdown>
				<QuizStepper quizzes={lesson.quizzes} lessonId={lessonId} />
			</article>

			<StepNav
				course={{ ...course, id: courseId, slug }}
				currentStepId={lessonId}
				type="lesson"
			/>
		</div>
	);
}
