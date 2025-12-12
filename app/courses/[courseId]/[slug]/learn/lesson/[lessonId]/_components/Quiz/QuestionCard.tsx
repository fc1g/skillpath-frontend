'use client';

import { Quiz } from '@/types/courses/quiz';
import {
	Button,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Label,
} from '@/components/ui';
import { useState } from 'react';
import { useQuizStore } from './_store/useQuizStore';

export type QuestionCardProps = {
	quiz: Quiz;
	index: number;
};

export default function QuestionCard({ quiz, index }: QuestionCardProps) {
	const totalQuestions = useQuizStore(state => state.totalQuestions);
	const setCurrentQuestionIndex = useQuizStore(
		state => state.setCurrentQuestionIndex,
	);
	const incCorrectAnswers = useQuizStore(state => state.incCorrectAnswers);
	const incWrongAnswers = useQuizStore(state => state.incWrongAnswers);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
		null,
	);
	const [isVerified, setIsVerified] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [showExplanation, setShowExplanation] = useState(false);

	const handleClick = () => {
		if (isVerified) {
			setCurrentQuestionIndex(index >= totalQuestions - 1 ? null : index + 1);
			return;
		}

		setIsVerified(true);
		if (quiz.correctOptionIndex === selectedOptionIndex) {
			setIsCorrect(true);
			incCorrectAnswers();
		} else {
			setIsCorrect(false);
			incWrongAnswers();
		}
	};

	return (
		<Card className="mx-auto max-w-xl">
			<CardHeader>
				<CardTitle>Quick Quiz</CardTitle>
				<CardDescription>{quiz.question}</CardDescription>
				<CardAction className="text-muted-foreground text-sm">
					{isVerified && isCorrect ? (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setShowExplanation(!showExplanation)}
						>
							Toggle explanation
						</Button>
					) : (
						`${index + 1} of ${totalQuestions}`
					)}
				</CardAction>
			</CardHeader>
			<CardContent>
				{quiz.options.map((option, index) => {
					const isSelected = selectedOptionIndex === index;

					return (
						<Button
							key={option}
							disabled={isVerified}
							variant="ghost"
							onClick={() => {
								setSelectedOptionIndex(index);
							}}
							className={`flex cursor-default items-center gap-2 px-2 disabled:opacity-80 ${isCorrect && selectedOptionIndex === index && 'bg-green-400 dark:bg-green-900'} ${isVerified && !isCorrect && selectedOptionIndex === index && 'bg-red-400 dark:bg-red-900'}`}
						>
							<div className="relative flex h-4 w-4 items-center justify-center">
								<input
									id={option}
									disabled={isVerified}
									type="radio"
									name="quiz-option"
									value={option}
									className="border-border size-4 appearance-none rounded-full border"
								/>
								<div
									className={`bg-foreground absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full ${isSelected ? 'block' : 'hidden'}`}
								></div>
							</div>
							<Label htmlFor={option}>{option}</Label>
						</Button>
					);
				})}
			</CardContent>
			<CardFooter className="flex flex-col items-center justify-center">
				{isVerified && quiz.explanation && showExplanation && (
					<p className="text-muted-foreground text-sm">
						Explanation: {quiz.explanation}
					</p>
				)}

				<div className="flex w-full items-center justify-center">
					<Button
						disabled={selectedOptionIndex === null}
						variant="link"
						onClick={handleClick}
					>
						{!isVerified && 'Check Answer'}
						{isVerified && 'Next Question'}
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
