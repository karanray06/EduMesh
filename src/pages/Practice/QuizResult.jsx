import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizEngine } from '../../hooks/useQuizEngine';
import { Trophy, Target, Clock, ArrowRight } from 'lucide-react';
import { ProgressRing } from '../../components/ui/ProgressRing';
import { GlassCard } from '../../components/ui/GlassCard';
import confetti from 'canvas-confetti';

export default function QuizResult() {
 const navigate = useNavigate();
 const { score, questions, answers, resetQuiz } = useQuizEngine();

 React.useEffect(() => {
 if (score > 0) {
 confetti({
 particleCount: 100,
 spread: 70,
 origin: { y: 0.6 },
 colors: ['#00A8E8', '#D4A373', '#F9F6F0']
 });
 }
 }, [score]);

 const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
 const totalTime = answers.reduce((acc, curr) => acc + curr.timeSpent, 0);

 const handleDone = () => {
 resetQuiz();
 navigate('/practice');
 };

 return (
 <div className="max-w-3xl mx-auto py-10 animate-fade-in-up">
 <div className="text-center mb-10">
 <h1 className="display-heading text-4xl mb-4">Quiz Complete!</h1>
 <p className="text-text-secondary text-lg">Here's how you performed in this session.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
 <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
 <ProgressRing progress={accuracy} size={100} strokeWidth={8} color={accuracy >= 70 ? '#00A8E8' : accuracy >= 40 ? '#D4A373' : '#ef4444'}>
 <span className="text-2xl font-bold font-mono text-white">{accuracy}%</span>
 </ProgressRing>
 <span className="text-sm font-semibold text-text-secondary mt-4 uppercase tracking-wider">Accuracy</span>
 </GlassCard>

 <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
 <div className="w-16 h-16 rounded-full bg-amber/20 flex items-center justify-center mb-4 text-amber">
 <Trophy size={32} />
 </div>
 <div className="text-3xl font-bold font-mono text-white mb-1">{score} <span className="text-lg text-text-secondary">/ {questions.length}</span></div>
 <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Score</span>
 </GlassCard>

 <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
 <div className="w-16 h-16 rounded-full bg-glass-fill flex items-center justify-center mb-4 text-text-muted">
 <Clock size={32} />
 </div>
 <div className="text-3xl font-bold font-mono text-white mb-1">{Math.floor(totalTime / 60)}m {totalTime % 60}s</div>
 <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Time Taken</span>
 </GlassCard>
 </div>

 <div className="glass-card p-6 border-l-4 border-l-cyan mb-8">
 <h3 className="font-bold text-white mb-2">Arya's Insight</h3>
 <p className="text-text-secondary">Great job! You showed strong understanding of basic formulas, but took longer on multi-step problems. Reviewing dimensional analysis might help speed up your solving time.</p>
 </div>

 <div className="flex gap-4">
 <button 
 onClick={() => navigate('/practice/session')} // Normally re-initiate
 className="flex-1 py-4 rounded-xl border border-glass-border text-white hover:bg-glass-fill transition-colors font-semibold"
 >
 Review Mistakes
 </button>
 <button 
 onClick={handleDone}
 className="flex-1 py-4 rounded-xl bg-cyan text-bg-primary hover:bg-[#00bfff] flex items-center justify-center gap-2 transition-colors font-bold"
 >
 Continue <ArrowRight size={20} />
 </button>
 </div>
 </div>
 );
}
