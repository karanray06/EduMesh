import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Clock, Zap, BookOpen, Layers } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

const MODES = [
 { id: 'adaptive', name: 'Adaptive Practice', desc: 'AI adjusts difficulty based on your performance', icon: Zap, color: 'text-cyan', bg: 'bg-cyan/20' },
 { id: 'blitz', name: 'Topic Blitz', desc: '10 questions, 10 minutes. Test your speed.', icon: Clock, color: 'text-amber', bg: 'bg-amber/20' },
 { id: 'pyq', name: 'PYQ Only', desc: 'Practice previous year questions exclusively', icon: Layers, color: 'text-[#ef4444]', bg: 'bg-[rgba(239,68,68,0.1)]' },
 { id: 'mistakes', name: 'Mistake Revisit', desc: 'Redo questions you got wrong recently', icon: BookOpen, color: 'text-[#8D99AE]', bg: 'bg-[rgba(141,153,174,0.1)]' },
];

export default function QuizHome() {
 const navigate = useNavigate();

 const startQuiz = (mode) => {
 // In a real app, we'd pass mode/filters to session
 navigate('/practice/session');
 };

 return (
 <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="text-center mb-10">
 <div className="w-16 h-16 rounded-2xl bg-cyan/20 flex items-center justify-center mx-auto mb-4 border border-cyan/50">
 <Target size={32} className="text-cyan" />
 </div>
 <h1 className="display-heading text-3xl mb-2">Practice Arena</h1>
 <p className="text-text-secondary">Sharpen your skills with AI-powered adaptive quizzes.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {MODES.map(mode => (
 <button key={mode.id} onClick={() => startQuiz(mode.id)} className="text-left group outline-none">
 <GlassCard className="p-6 h-full flex items-start gap-5 transition-all group-hover:-translate-y-1">
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${mode.bg} border border-glass-border`}>
 <mode.icon size={24} className={mode.color} />
 </div>
 <div>
 <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-cyan transition-colors">{mode.name}</h3>
 <p className="text-sm text-text-muted leading-relaxed">{mode.desc}</p>
 </div>
 </GlassCard>
 </button>
 ))}
 </div>

 <div className="glass-card p-6 border-l-4 border-l-gold">
 <h3 className="font-bold text-white mb-2">Quick Tip from Arya</h3>
 <p className="text-sm text-text-secondary">"Your accuracy in Thermodynamics drops after 10 questions. Try doing shorter 10-question sprints to maintain focus!"</p>
 </div>
 </div>
 );
}
