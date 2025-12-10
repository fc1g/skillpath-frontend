import { getLesson } from '@/services/graphql/courses/lessons';
import { notFound } from 'next/navigation';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { getCourse } from '@/services/graphql/courses';
import { QuizStepper } from './_components';
import { StepNav } from '@/app/courses/[courseId]/[slug]/learn/_components';

export type LessonPageProps = {
	params: Promise<{
		lessonId: string;
		slug: string;
		courseId: string;
	}>;
};

export { generateStaticParams, generateMetadata } from '@/lib/courses/lessons';
export const revalidate = 60;

export default async function LessonPage({ params }: LessonPageProps) {
	const { lessonId, courseId, slug } = await params;

	const [course, lesson] = await Promise.all([
		getCourse(courseId),
		getLesson(lessonId),
	]);

	if (!lesson || !course) return notFound();

	return (
		<article className="prose prose-slate dark:prose-invert prose-pre:whitespace-pre-wrap prose-pre:wrap-break-word max-w-none flex-1 px-4 py-6 wrap-break-word sm:px-8">
			<ReactMarkdown remarkPlugins={[remarkGfm]}>
				{lesson.content}
			</ReactMarkdown>
			<QuizStepper quizzes={lesson.quizzes} lessonId={lessonId} />

			<StepNav
				course={{ ...course, id: courseId, slug }}
				currentStepId={lessonId}
				type="lesson"
			/>
		</article>
	);
}
