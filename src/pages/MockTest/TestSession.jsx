import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockTestStore } from '../../hooks/useMockTest';
import { Clock, Bookmark, ChevronRight, ChevronLeft, Send } from 'lucide-react';
import { KaTeXBlock } from '../../components/ui/KaTeXBlock';

const STATUS_COLORS = {
 unvisited: 'bg-glass-fill border-glass-border text-text-secondary',
 answered: 'bg-[#22c55e]/20 border-[#22c55e]/50 text-[#4ade80]',
 marked: 'bg-[#a855f7]/20 border-[#a855f7]/50 text-[#c084fc]',
 answered_marked: 'bg-[#3b82f6]/20 border-[#3b82f6]/50 text-[#60a5fa]',
 skipped: 'bg-[#ef4444]/20 border-[#ef4444]/50 text-[#f87171]'
};

export default function TestSession() {
 const navigate = useNavigate();
 const { 
 questions, currentIndex, timeRemaining, isActive, isFinished,
 tick, setAnswer, clearAnswer, toggleMarkForReview, goToQuestion, submitTest
 } = useMockTestStore();

 const [showConfirm, setShowConfirm] = useState(false);

 useEffect(() => {
 if (!isActive) return;
 const timer = setInterval(() => tick(), 1000);
 return () => clearInterval(timer);
 }, [isActive, tick]);

 useEffect(() => {
 if (isFinished) navigate('/mock-test/analysis');
 }, [isFinished, navigate]);

 if (!questions.length) return <div className="p-8 text-white">No active session.</div>;

 const currentQ = questions[currentIndex];
 const formatTime = (secs) => `${Math.floor(secs / 3600)}:${Math.floor((secs % 3600) / 60).toString().padStart(2, '0')}:${(secs % 60).toString().padStart(2, '0')}`;

 const isLowTime = timeRemaining < 300; // < 5 mins

 return (
 <div className="fixed inset-0 z-50 bg-bg-primary flex flex-col font-body">
 {/* Header */}
 <header className="h-[60px] border-b border-glass-border bg-glass-fill flex items-center justify-between px-4 sm:px-6">
 <h1 className="font-display font-bold text-white truncate">JEE Main Mock Test</h1>
 <div className={`flex items-center gap-2 font-mono font-bold text-lg px-4 py-1.5 rounded-lg border ${
 isLowTime ? 'bg-red-500/10 border-red-500/30 text-red-400 animate-pulse' : 'bg-glass-fill border-glass-border text-cyan'
 }`}>
 <Clock size={18} /> {formatTime(timeRemaining)}
 </div>
 <button 
 onClick={() => setShowConfirm(true)}
 className="bg-cyan text-bg-primary px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#00bfff] transition-colors"
 >
 Submit Test
 </button>
 </header>

 {/* Main Content Area */}
 <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
 
 {/* Question Area */}
 <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
 <div className="flex justify-between items-center mb-6">
 <span className="px-3 py-1 bg-glass-fill rounded-md text-xs font-mono font-bold text-text-secondary uppercase tracking-wider">
 {currentQ.subject}
 </span>
 <span className="text-text-muted font-medium">Question {currentIndex + 1} of {questions.length}</span>
 </div>

 <div className="mb-8">
 <KaTeXBlock content={currentQ.question} className="text-xl text-white leading-relaxed" />
 </div>

 <div className="space-y-4 max-w-2xl">
 {currentQ.options.map((opt, idx) => {
 const isSelected = currentQ.selectedOption === idx;
 return (
 <button
 key={idx}
 onClick={() => setAnswer(currentIndex, idx)}
 className={`w-full text-left flex items-start gap-4 p-4 rounded-xl border transition-all ${
 isSelected 
 ? 'bg-cyan/20 border-cyan shadow-[0_0_15px_rgba(0,168,232,0.15)]' 
 : 'bg-glass-fill border-glass-border hover:bg-glass-fill'
 }`}
 >
 <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
 isSelected ? 'border-cyan bg-cyan text-bg-primary' : 'border-slate text-text-secondary'
 }`}>
 {String.fromCharCode(65 + idx)}
 </div>
 <KaTeXBlock content={opt} className={isSelected ? 'text-white' : 'text-white'} />
 </button>
 );
 })}
 </div>

 {/* Action Bar */}
 <div className="mt-auto pt-8 flex flex-wrap gap-3">
 <button 
 onClick={() => toggleMarkForReview(currentIndex)}
 className="flex items-center gap-2 px-5 py-3 rounded-xl border border-glass-border text-white hover:bg-glass-fill transition-colors font-medium"
 >
 <Bookmark size={18} className={currentQ.status.includes('marked') ? 'fill-[#c084fc] text-[#c084fc]' : ''} />
 {currentQ.status.includes('marked') ? 'Unmark' : 'Mark for Review'}
 </button>
 <button 
 onClick={() => clearAnswer(currentIndex)}
 disabled={currentQ.selectedOption === null}
 className="px-5 py-3 rounded-xl border border-glass-border text-white hover:bg-glass-fill transition-colors font-medium disabled:opacity-50"
 >
 Clear Response
 </button>
 <div className="flex-1" />
 <button 
 onClick={() => goToQuestion(Math.max(0, currentIndex - 1))}
 disabled={currentIndex === 0}
 className="px-4 py-3 rounded-xl bg-glass-fill text-white hover:bg-glass-fill transition-colors font-medium disabled:opacity-50 flex items-center"
 >
 <ChevronLeft size={20} /> Prev
 </button>
 <button 
 onClick={() => goToQuestion(Math.min(questions.length - 1, currentIndex + 1))}
 className="px-6 py-3 rounded-xl bg-cyan text-bg-primary hover:bg-[#00bfff] transition-colors font-bold flex items-center gap-2"
 >
 Save & Next <ChevronRight size={20} />
 </button>
 </div>
 </div>

 {/* Sidebar Palette */}
 <div className="w-full md:w-[320px] shrink-0 border-l border-glass-border bg-glass-fill flex flex-col h-[250px] md:h-auto">
 <div className="p-4 border-b border-glass-border grid grid-cols-2 gap-2 text-xs text-text-secondary">
 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#22c55e]/20 border border-[#22c55e]/50"/> Answered</div>
 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#ef4444]/20 border border-[#ef4444]/50"/> Skipped</div>
 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#a855f7]/20 border border-[#a855f7]/50"/> Marked</div>
 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-glass-fill border border-glass-border"/> Not Visited</div>
 </div>
 
 <div className="flex-1 overflow-y-auto p-4">
 <div className="grid grid-cols-5 gap-2">
 {questions.map((q, i) => (
 <button
 key={i}
 onClick={() => goToQuestion(i)}
 className={`w-full aspect-square rounded-lg border font-mono text-sm flex items-center justify-center transition-transform hover:scale-105 ${STATUS_COLORS[q.status]} ${currentIndex === i ? 'ring-2 ring-cyan ring-offset-2 ring-offset-charcoal' : ''}`}
 >
 {i + 1}
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Submit Confirmation Modal */}
 {showConfirm && (
 <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
 <div className="bg-glass-fill rounded-2xl border border-glass-border p-6 sm:p-8 max-w-md w-full shadow-2xl">
 <h2 className="font-display font-bold text-2xl text-white mb-2">Submit Exam?</h2>
 <p className="text-text-secondary mb-6">Are you sure you want to submit? You still have {Math.floor(timeRemaining/60)} minutes left.</p>
 <div className="flex gap-3">
 <button onClick={() => setShowConfirm(false)} className="flex-1 py-3 rounded-xl bg-glass-fill text-white font-semibold hover:bg-glass-fill border border-glass-border">
 Return to Exam
 </button>
 <button onClick={() => { setShowConfirm(false); submitTest(); }} className="flex-1 py-3 rounded-xl bg-cyan text-bg-primary font-bold flex items-center justify-center gap-2 hover:bg-[#00bfff]">
 <Send size={18} /> Submit Now
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
