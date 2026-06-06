import { create } from 'zustand';
import { useGamificationStore } from '../features/gamification/GamificationStore';

export const useQuizEngine = create((set, get) => ({
 questions: [],
 currentIndex: 0,
 score: 0,
 isFinished: false,
 answers: [], // Array of { questionId, selectedIndex, isCorrect, timeSpent }
 difficulty: 'medium', // 'easy', 'medium', 'hard'
 streak: 0, // Current correct streak
 startTime: null,

 initQuiz: (questionsList) => set({
 questions: questionsList,
 currentIndex: 0,
 score: 0,
 isFinished: false,
 answers: [],
 difficulty: 'medium',
 streak: 0,
 startTime: Date.now(),
 }),

 submitAnswer: (selectedIndex, timeSpent) => {
 const state = get();
 const currentQ = state.questions[state.currentIndex];
 const isCorrect = selectedIndex === currentQ.correctIndex;
 
 let newStreak = isCorrect ? state.streak + 1 : 0;
 let newDifficulty = state.difficulty;

 // Adaptive logic
 if (newStreak >= 3 && state.difficulty === 'medium') newDifficulty = 'hard';
 if (newStreak >= 2 && state.difficulty === 'easy') newDifficulty = 'medium';
 if (!isCorrect && state.streak === 0) {
 // 2 consecutive wrong logic (streak is already 0 from previous wrong, if this is also wrong, we drop)
 if (state.answers.length > 0 && !state.answers[state.answers.length - 1].isCorrect) {
 if (state.difficulty === 'hard') newDifficulty = 'medium';
 else if (state.difficulty === 'medium') newDifficulty = 'easy';
 }
 }

 set({
 answers: [...state.answers, { questionId: state.currentIndex, selectedIndex, isCorrect, timeSpent }],
 score: state.score + (isCorrect ? 1 : 0),
 streak: newStreak,
 difficulty: newDifficulty
 });

 return isCorrect;
 },

 nextQuestion: () => set((state) => {
 if (state.currentIndex + 1 >= state.questions.length) {
 return { isFinished: true };
 }
 return { currentIndex: state.currentIndex + 1, startTime: Date.now() };
 }),

 resetQuiz: () => set({
 questions: [],
 currentIndex: 0,
 score: 0,
 isFinished: false,
 answers: [],
 streak: 0,
 })
}));
