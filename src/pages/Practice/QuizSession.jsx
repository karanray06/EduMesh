import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizEngine } from '../../hooks/useQuizEngine';
import { generateQuiz } from '../../services/ai';
import { KaTeXBlock } from '../../components/ui/KaTeXBlock';
import { Clock, CheckCircle2, XCircle, BrainCircuit, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuizSession() {
 const navigate = useNavigate();
 const { questions, currentIndex, isFinished, initQuiz, submitAnswer, nextQuestion, difficulty } = useQuizEngine();
 
 const [isLoading, setIsLoading] = useState(true);
 const [selectedOption, setSelectedOption] = useState(null);
 const [isRevealed, setIsRevealed] = useState(false);
 const [timeLeft, setTimeLeft] = useState(90); // 90 seconds per Q

 // Initial load
 useEffect(() => {
 async function fetchQuestions() {
 setIsLoading(true);
 const generated = await generateQuiz('Physics', 'Kinematics', 5, 'JEE Main level');
 if (generated) {
 initQuiz(generated);
 }
 setIsLoading(false);
 }
 fetchQuestions();
 }, [initQuiz]);

 // Timer
 useEffect(() => {
 if (isLoading || isRevealed || isFinished) return;
 const timer = setInterval(() => {
 setTimeLeft(prev => {
 if (prev <= 1) {
 handleReveal(null); // Time's up
 return 0;
 }
 return prev - 1;
 });
 }, 1000);
 return () => clearInterval(timer);
 }, [isLoading, isRevealed, isFinished, currentIndex]);

 if (isFinished) {
 navigate('/practice/result');
 return null;
 }

 if (isLoading || !questions.length) {
 return (
 <div className="flex flex-col items-center justify-center min-h-[60vh]">
 <div className="w-12 h-12 rounded-full border-4 border-cyan/50 border-t-cyan animate-spin mb-4" />
 <p className="text-text-muted font-medium">Arya is preparing adaptive questions...</p>
 </div>
 );
 }

 const currentQ = questions[currentIndex];

 const handleReveal = (index) => {
 if (isRevealed) return;
 setSelectedOption(index);
 setIsRevealed(true);
 submitAnswer(index, 90 - timeLeft);
 };

 const handleNext = () => {
 setIsRevealed(false);
 setSelectedOption(null);
 setTimeLeft(90);
 nextQuestion();
 };

 return (
 <div className="max-w-3xl mx-auto flex flex-col min-h-[calc(100vh-120px)] pb-10">
 {/* Top Bar */}
 <div className="flex items-center justify-between mb-6">
 <div className="flex items-center gap-3">
 <span className="font-mono font-bold text-white text-lg">{currentIndex + 1} <span className="text-text-secondary">/ {questions.length}</span></span>
 <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md border ${
 difficulty === 'hard' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
 difficulty === 'medium' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
 'border-green-500/30 text-green-400 bg-green-500/10'
 }`}>
 {difficulty}
 </span>
 </div>
 
 <div className={`flex items-center gap-2 font-mono font-bold text-lg ${timeLeft < 15 ? 'text-[#ef4444] animate-pulse' : 'text-cyan'}`}>
 <Clock size={18} />
 0:{timeLeft.toString().padStart(2, '0')}
 </div>
 </div>

 {/* Question Card */}
 <div className="glass-card p-6 md:p-8 mb-6">
 <KaTeXBlock content={currentQ.question} className="text-lg text-white leading-relaxed mb-8" />
 
 <div className="space-y-3">
 {currentQ.options.map((opt, idx) => {
 const isSelected = selectedOption === idx;
 const isCorrect = currentQ.correctIndex === idx;
 
 let stateClass = 'quiz-option'; // Default
 if (isRevealed) {
 if (isCorrect) stateClass += ' quiz-option-correct';
 else if (isSelected) stateClass += ' quiz-option-wrong';
 else stateClass += ' opacity-50 border-glass-border';
 } else if (isSelected) {
 stateClass += ' quiz-option-selected';
 }

 return (
 <button
 key={idx}
 onClick={() => !isRevealed && setSelectedOption(idx)}
 className={`w-full text-left flex items-start gap-4 ${stateClass}`}
 disabled={isRevealed}
 >
 <div className="w-6 h-6 rounded-md bg-glass-fill flex items-center justify-center shrink-0 font-mono text-sm text-text-secondary mt-0.5">
 {String.fromCharCode(65 + idx)}
 </div>
 <div className="flex-1">
 <KaTeXBlock content={opt} className="text-white" />
 </div>
 {isRevealed && isCorrect && <CheckCircle2 className="text-[#22c55e] shrink-0" size={20} />}
 {isRevealed && isSelected && !isCorrect && <XCircle className="text-[#ef4444] shrink-0" size={20} />}
 </button>
 );
 })}
 </div>
 </div>

 {/* Action Area */}
 <div className="mt-auto">
 {!isRevealed ? (
 <button 
 onClick={() => handleReveal(selectedOption)}
 disabled={selectedOption === null}
 className="w-full py-4 rounded-xl bg-cyan text-bg-primary font-bold text-lg hover:bg-[#00bfff] disabled:opacity-50 disabled:bg-glass-fill disabled:text-text-muted transition-colors"
 >
 Submit Answer
 </button>
 ) : (
 <AnimatePresence>
 <motion.div 
 initial={{ opacity: 0, y: 20 }} 
 animate={{ opacity: 1, y: 0 }}
 className="glass-card p-6 border-t-4 border-t-cyan"
 >
 <h4 className="font-bold text-white mb-2">Explanation</h4>
 <KaTeXBlock content={currentQ.explanation} className="text-sm text-text-secondary mb-6" />
 
 <div className="flex gap-3">
 <button 
 onClick={() => navigate('/tutor')}
 className="flex-1 py-3 rounded-xl border border-cyan/50 text-cyan hover:bg-cyan/20 flex items-center justify-center gap-2 transition-colors font-semibold"
 >
 <BrainCircuit size={18} /> Ask Arya
 </button>
 <button 
 onClick={handleNext}
 className="flex-1 py-3 rounded-xl bg-cyan text-bg-primary hover:bg-[#00bfff] flex items-center justify-center gap-2 transition-colors font-bold"
 >
 Next <ArrowRight size={18} />
 </button>
 </div>
 </motion.div>
 </AnimatePresence>
 )}
 </div>
 </div>
 );
}
