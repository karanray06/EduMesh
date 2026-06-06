import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockTestStore } from '../../hooks/useMockTest';
import { ChevronLeft, CheckCircle2, XCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { KaTeXBlock } from '../../components/ui/KaTeXBlock';

export default function TestReview() {
 const navigate = useNavigate();
 const { questions } = useMockTestStore();
 const [filter, setFilter] = useState('all'); // all, correct, incorrect, skipped

 const filteredQuestions = questions.filter(q => {
 if (filter === 'all') return true;
 if (filter === 'skipped') return q.selectedOption === null;
 if (filter === 'correct') return q.selectedOption === q.correctIndex;
 if (filter === 'incorrect') return q.selectedOption !== null && q.selectedOption !== q.correctIndex;
 return true;
 });

 return (
 <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-10">
 <div className="flex items-center gap-4 mb-6">
 <button 
 onClick={() => navigate('/mock-test/analysis')}
 className="w-10 h-10 rounded-xl bg-glass-fill border border-glass-border flex items-center justify-center text-text-muted hover:text-white hover:bg-glass-fill transition-colors"
 >
 <ChevronLeft size={20} />
 </button>
 <h1 className="display-heading text-2xl">Review Questions</h1>
 </div>

 <div className="flex gap-2 pb-2 overflow-x-auto hide-scrollbar">
 {['all', 'correct', 'incorrect', 'skipped'].map(f => (
 <button 
 key={f}
 onClick={() => setFilter(f)}
 className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-colors capitalize border ${
 filter === f 
 ? 'bg-cyan/20 border-cyan text-cyan' 
 : 'bg-glass-fill border-glass-border text-text-secondary hover:bg-glass-fill hover:text-white'
 }`}
 >
 {f} ({questions.filter(q => f==='all'?true:f==='skipped'?q.selectedOption===null:f==='correct'?q.selectedOption===q.correctIndex:q.selectedOption!==null&&q.selectedOption!==q.correctIndex).length})
 </button>
 ))}
 </div>

 <div className="space-y-6 mt-4">
 {filteredQuestions.map((q, idx) => {
 const isCorrect = q.selectedOption === q.correctIndex;
 const isSkipped = q.selectedOption === null;
 
 return (
 <GlassCard key={q.id} className="p-6">
 <div className="flex justify-between items-start mb-4 border-b border-glass-border pb-4">
 <div className="flex items-center gap-3">
 <span className="font-mono text-text-secondary text-sm">Q {idx + 1}</span>
 <span className={`px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-bold ${
 isSkipped ? 'bg-glass-fill text-text-secondary' :
 isCorrect ? 'bg-[#22c55e]/10 text-[#4ade80]' : 'bg-[#ef4444]/10 text-[#f87171]'
 }`}>
 {isSkipped ? 'Skipped' : isCorrect ? '+4 Marks' : '-1 Mark'}
 </span>
 </div>
 <div className="text-xs text-text-secondary font-mono">{q.timeSpent}s spent</div>
 </div>
 
 <KaTeXBlock content={q.question} className="text-lg text-white mb-6" />

 <div className="space-y-3">
 {q.options.map((opt, oIdx) => {
 const isThisCorrect = oIdx === q.correctIndex;
 const isThisSelected = oIdx === q.selectedOption;
 
 let borderClass = 'border-glass-border bg-glass-fill';
 if (isThisCorrect) borderClass = 'border-[#22c55e]/50 bg-[#22c55e]/10';
 else if (isThisSelected) borderClass = 'border-[#ef4444]/50 bg-[#ef4444]/10';

 return (
 <div key={oIdx} className={`flex items-start gap-4 p-3 rounded-lg border ${borderClass}`}>
 <div className="w-6 h-6 rounded-md bg-glass-fill flex items-center justify-center shrink-0 font-mono text-sm text-text-secondary mt-0.5">
 {String.fromCharCode(65 + oIdx)}
 </div>
 <KaTeXBlock content={opt} className={`flex-1 ${isThisCorrect ? 'text-white' : isThisSelected ? 'text-white' : 'text-text-secondary'}`} />
 {isThisCorrect && <CheckCircle2 className="text-[#22c55e] shrink-0" size={20} />}
 {isThisSelected && !isThisCorrect && <XCircle className="text-[#ef4444] shrink-0" size={20} />}
 </div>
 );
 })}
 </div>
 </GlassCard>
 );
 })}
 </div>
 </div>
 );
}
