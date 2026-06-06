import { create } from 'zustand';

// Temporary mock test data generator
const generateMockQuestions = (count) => {
 return Array(count).fill(0).map((_, i) => ({
 id: `q${i}`,
 subject: i % 3 === 0 ? 'Physics' : i % 3 === 1 ? 'Chemistry' : 'Mathematics',
 question: `Sample question ${i + 1} for Mock Test. Find the value of $x$ in $x^2 + 2x + 1 = 0$.`,
 options: ['x = 1', 'x = -1', 'x = 0', 'x = 2'],
 correctIndex: 1,
 status: 'unvisited', // unvisited, answered, marked, answered_marked, skipped
 selectedOption: null,
 timeSpent: 0
 }));
};

export const useMockTestStore = create((set, get) => ({
 config: null,
 questions: [],
 currentIndex: 0,
 timeRemaining: 0,
 isActive: false,
 isFinished: false,
 
 // Scoring config
 scoring: { correct: 4, incorrect: -1, unattempted: 0 },

 initTest: (config) => {
 const totalQ = config.questionCount || 90;
 const questions = generateMockQuestions(totalQ);
 const durationStr = config.duration || '180';
 
 set({
 config,
 questions,
 currentIndex: 0,
 timeRemaining: parseInt(durationStr) * 60,
 isActive: true,
 isFinished: false
 });
 },

 tick: () => set((state) => {
 if (state.timeRemaining <= 1) {
 return { timeRemaining: 0, isActive: false, isFinished: true };
 }
 
 // Add time to current question
 const updatedQs = [...state.questions];
 if (state.isActive) {
 updatedQs[state.currentIndex].timeSpent += 1;
 }
 
 return { timeRemaining: state.timeRemaining - 1, questions: updatedQs };
 }),

 setAnswer: (index, optionIndex) => set((state) => {
 const qs = [...state.questions];
 const status = qs[index].status === 'marked' || qs[index].status === 'answered_marked' 
 ? 'answered_marked' : 'answered';
 qs[index] = { ...qs[index], selectedOption: optionIndex, status };
 return { questions: qs };
 }),

 clearAnswer: (index) => set((state) => {
 const qs = [...state.questions];
 const status = qs[index].status === 'answered_marked' ? 'marked' : 'skipped';
 qs[index] = { ...qs[index], selectedOption: null, status };
 return { questions: qs };
 }),

 toggleMarkForReview: (index) => set((state) => {
 const qs = [...state.questions];
 const q = qs[index];
 if (q.status === 'answered') q.status = 'answered_marked';
 else if (q.status === 'answered_marked') q.status = 'answered';
 else if (q.status === 'marked') q.status = q.selectedOption !== null ? 'answered' : 'skipped';
 else q.status = 'marked';
 return { questions: qs };
 }),

 goToQuestion: (index) => set((state) => {
 const qs = [...state.questions];
 // If we leave an unvisited question, mark it skipped
 if (qs[state.currentIndex].status === 'unvisited') {
 qs[state.currentIndex].status = 'skipped';
 }
 return { currentIndex: index, questions: qs };
 }),

 submitTest: () => set((state) => {
 const qs = state.questions.map(q => 
 q.status === 'unvisited' ? { ...q, status: 'skipped' } : q
 );
 return { isActive: false, isFinished: true, questions: qs };
 }),

 getResults: () => {
 const state = get();
 let score = 0;
 let correct = 0, incorrect = 0, skipped = 0;
 
 state.questions.forEach(q => {
 if (q.selectedOption === null) {
 skipped++;
 } else if (q.selectedOption === q.correctIndex) {
 correct++;
 score += state.scoring.correct;
 } else {
 incorrect++;
 score += state.scoring.incorrect;
 }
 });

 return {
 score,
 maxScore: state.questions.length * state.scoring.correct,
 correct,
 incorrect,
 skipped,
 accuracy: correct + incorrect > 0 ? Math.round((correct / (correct + incorrect)) * 100) : 0
 };
 }
}));
