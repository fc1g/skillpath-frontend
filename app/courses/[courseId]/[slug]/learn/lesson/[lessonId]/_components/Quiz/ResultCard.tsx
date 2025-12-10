import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui';
import { useQuizStore } from './_store/useQuizStore';

export default function QuizResultCard() {
	const totalQuestions = useQuizStore(state => state.totalQuestions);
	const correctAnswers = useQuizStore(state => state.correctAnswers);
	const wrongAnswers = useQuizStore(state => state.wrongAnswers);
	const resetQuiz = useQuizStore(state => state.resetQuiz);

	return (
		<Card className="mx-auto max-w-xl">
			<CardHeader>
				<CardTitle className="space-y-4 text-center">
					<div className="flex items-center justify-center">
						<svg
							className={`size-12 ${correctAnswers > wrongAnswers ? 'animate-bounce text-yellow-300 dark:text-yellow-600' : ''}`}
						>
							<use
								href={`/icons/sprite.svg#${correctAnswers > wrongAnswers ? 'trophy' : 'x-circle'}`}
							/>
						</svg>
					</div>
					<span>
						{correctAnswers > wrongAnswers ? 'You got it! 🎉' : 'Try again!'}
					</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<CardDescription className="text-center">
					You answered {correctAnswers} out of {totalQuestions} questions
					correctly.
				</CardDescription>
			</CardContent>
			<CardFooter className="flex items-center justify-center">
				<Button variant="outline" onClick={resetQuiz}>
					Reset
				</Button>
			</CardFooter>
		</Card>
	);
}
