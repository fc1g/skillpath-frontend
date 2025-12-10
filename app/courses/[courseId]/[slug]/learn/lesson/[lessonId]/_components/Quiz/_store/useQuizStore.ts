import { create } from 'zustand/react';

type State = {
	currentQuestionIndex: number | null;
	correctAnswers: number;
	wrongAnswers: number;
	totalQuestions: number;
};

type Action = {
	setCurrentQuestionIndex: (index: number | null) => void;
	incCorrectAnswers: () => void;
	incWrongAnswers: () => void;
	setTotalQuestions: (count: number) => void;

	resetQuiz: () => void;
};

export const useQuizStore = create<State & Action>()(set => ({
	currentQuestionIndex: 0,
	correctAnswers: 0,
	wrongAnswers: 0,
	totalQuestions: 0,

	setCurrentQuestionIndex: index => set({ currentQuestionIndex: index }),
	incCorrectAnswers: () =>
		set(state => ({ correctAnswers: state.correctAnswers + 1 })),
	incWrongAnswers: () =>
		set(state => ({ wrongAnswers: state.wrongAnswers + 1 })),
	setTotalQuestions: count => set({ totalQuestions: count }),

	resetQuiz: () =>
		set({ currentQuestionIndex: 0, correctAnswers: 0, wrongAnswers: 0 }),
}));
