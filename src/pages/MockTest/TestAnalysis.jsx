import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockTestStore } from '../../hooks/useMockTest';
import { Trophy, Target, AlertCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { ProgressRing } from '../../components/ui/ProgressRing';

export default function TestAnalysis() {
 const navigate = useNavigate();
 const { questions, getResults } = useMockTestStore();

 const results = getResults();
 const maxScore = results.maxScore || 300; // fallback
 const percentile = Math.floor(Math.random() * 15) + 80; // mock percentile 80-95
 
 return (
 <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="flex justify-between items-end mb-8">
 <div>
 <h1 className="display-heading text-3xl mb-2">Exam Analysis</h1>
 <p className="text-text-secondary">Detailed breakdown of your performance.</p>
 </div>
 <button 
 onClick={() => navigate('/mock-test/review')}
 className="px-5 py-2.5 bg-glass-fill text-white border border-glass-border rounded-xl font-bold hover:bg-glass-fill transition-colors flex items-center gap-2"
 >
 Review Questions <ArrowRight size={18} />
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <GlassCard className="p-6 md:col-span-2 flex items-center gap-8 bg-gradient-to-br from-charcoal to-navy relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
 
 <ProgressRing progress={(results.score / maxScore) * 100} size={140} strokeWidth={10} color="#00A8E8">
 <div className="text-center">
 <div className="text-4xl font-bold font-mono text-white leading-none">{results.score}</div>
 <div className="text-sm text-text-secondary mt-1">/ {maxScore}</div>
 </div>
 </ProgressRing>

 <div>
 <h2 className="font-display font-bold text-2xl text-white mb-1">Excellent Effort!</h2>
 <p className="text-text-muted mb-4">You scored higher than {percentile}% of students who took this test.</p>
 <div className="flex gap-4">
 <div className="badge-gold px-3 py-1 text-sm font-semibold rounded-lg flex items-center gap-1">
 <Trophy size={14}/> {percentile}th Percentile
 </div>
 </div>
 </div>
 </GlassCard>

 <GlassCard className="p-6 flex flex-col justify-center gap-4">
 <div className="flex justify-between items-center p-3 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/20">
 <div className="flex items-center gap-2 text-[#4ade80]"><CheckCircle2 size={18}/> Correct</div>
 <span className="font-mono font-bold text-white">{results.correct}</span>
 </div>
 <div className="flex justify-between items-center p-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20">
 <div className="flex items-center gap-2 text-[#f87171]"><XCircle size={18}/> Incorrect</div>
 <span className="font-mono font-bold text-white">{results.incorrect}</span>
 </div>
 <div className="flex justify-between items-center p-3 rounded-lg bg-glass-fill border border-glass-border">
 <div className="flex items-center gap-2 text-text-secondary"><AlertCircle size={18}/> Skipped</div>
 <span className="font-mono font-bold text-white">{results.skipped}</span>
 </div>
 </GlassCard>
 </div>

 <h2 className="font-display font-bold text-xl text-white mt-10 mb-4">Arya's Action Plan</h2>
 <GlassCard className="p-6 border-l-4 border-l-cyan">
 <ul className="space-y-4 text-text-secondary">
 <li className="flex items-start gap-3">
 <Target className="text-cyan shrink-0 mt-0.5" size={20} />
 <div>
 <strong className="text-white block mb-1">High Priority: Thermodynamics</strong>
 You missed 4 easy questions in this chapter. Review Carnot Engine formulas before your next test.
 </div>
 </li>
 <li className="flex items-start gap-3">
 <Target className="text-amber shrink-0 mt-0.5" size={20} />
 <div>
 <strong className="text-white block mb-1">Time Management Alert</strong>
 You spent an average of 4 minutes on Calculus questions. Focus on identifying unsolvable traps earlier to skip them.
 </div>
 </li>
 </ul>
 </GlassCard>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
 {['Physics', 'Chemistry', 'Mathematics'].map(sub => (
 <GlassCard key={sub} className="p-5">
 <h3 className="font-bold text-white mb-3">{sub}</h3>
 <div className="h-2 w-full bg-glass-fill rounded-full overflow-hidden flex">
 <div className="bg-[#4ade80] w-[45%]" />
 <div className="bg-[#f87171] w-[20%]" />
 <div className="bg-glass-fill w-[35%]" />
 </div>
 <div className="flex justify-between text-[10px] uppercase text-text-secondary mt-2 font-mono">
 <span>45% Acc</span>
 <span>35% Skip</span>
 </div>
 </GlassCard>
 ))}
 </div>
 </div>
 );
}
