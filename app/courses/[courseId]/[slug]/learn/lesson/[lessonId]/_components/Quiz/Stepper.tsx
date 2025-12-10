'use client';

import { Quiz } from '@/types/courses';
import ResultCard from './ResultCard';
import { useQuizStore } from './_store/useQuizStore';
import { useEffect } from 'react';
import QuestionCard from './QuestionCard';

type QuizStepperProps = {
	quizzes: Quiz[];
	lessonId: string;
};

export default function QuizStepper({ quizzes, lessonId }: QuizStepperProps) {
	const setTotalQuestions = useQuizStore(state => state.setTotalQuestions);
	const resetQuiz = useQuizStore(state => state.resetQuiz);
	const currentQuestionIndex = useQuizStore(
		state => state.currentQuestionIndex,
	);

	useEffect(() => {
		resetQuiz();
	}, [lessonId, resetQuiz]);

	useEffect(() => {
		setTotalQuestions(quizzes.length);
	}, [setTotalQuestions, quizzes.length]);

	if (!quizzes.length) return null;

	return (
		<div className="my-8">
			{currentQuestionIndex !== null && (
				<QuestionCard
					key={quizzes[currentQuestionIndex].id}
					quiz={quizzes[currentQuestionIndex]}
					index={currentQuestionIndex}
				/>
			)}

			{currentQuestionIndex === null && <ResultCard />}
		</div>
	);
}
