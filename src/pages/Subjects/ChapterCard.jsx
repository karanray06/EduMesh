import React from 'react';
import { Link } from 'react-router-dom';
import { DifficultyChip } from '../../components/ui/DifficultyChip';
import { PlayCircle, Target } from 'lucide-react';

export const ChapterCard = ({ chapter, progress, subjectName }) => {
 const isRed = progress?.status === 'red';
 const isYellow = progress?.status === 'yellow';
 const isGreen = progress?.status === 'green';
 
 let borderColor = 'border-glass-border';
 let bgColor = 'bg-glass-fill';
 
 if (isRed) {
 borderColor = 'border-l-4 border-l-[#ef4444] border-t-[rgba(93,115,142,0.2)] border-r-[rgba(93,115,142,0.2)] border-b-[rgba(93,115,142,0.2)]';
 bgColor = 'bg-[rgba(239,68,68,0.02)]';
 } else if (isYellow) {
 borderColor = 'border-l-4 border-l-[#eab308] border-t-[rgba(93,115,142,0.2)] border-r-[rgba(93,115,142,0.2)] border-b-[rgba(93,115,142,0.2)]';
 bgColor = 'bg-[rgba(234,179,8,0.02)]';
 } else if (isGreen) {
 borderColor = 'border-l-4 border-l-cyan border-t-[rgba(93,115,142,0.2)] border-r-[rgba(93,115,142,0.2)] border-b-[rgba(93,115,142,0.2)]';
 bgColor = 'bg-cyan/20';
 }

 return (
 <div className={`rounded-xl border ${borderColor} ${bgColor} p-5 flex flex-col h-full transition-all hover:shadow-card-hover hover:-translate-y-1`}>
 <div className="flex justify-between items-start mb-3">
 <h3 className="font-bold text-white leading-tight flex-1 pr-2">{chapter.name}</h3>
 <DifficultyChip level={chapter.difficulty} />
 </div>
 
 <div className="text-sm text-text-secondary mb-4">
 {progress?.completed || 0} of {chapter.totalTopics} topics completed
 </div>
 
 {progress && (
 <div className="mb-6 flex items-center gap-2">
 <span className="text-[10px] uppercase tracking-wider text-text-secondary">Accuracy:</span>
 <span className={`font-mono font-bold text-xs ${isRed ? 'text-[#f87171]' : isYellow ? 'text-[#facc15]' : 'text-[#4ade80]'}`}>
 {progress.accuracy}%
 </span>
 </div>
 )}

 <div className="mt-auto flex gap-2 pt-4 border-t border-glass-border">
 <Link 
 to={`/subjects/${subjectName.toLowerCase()}/${chapter.id}/study`}
 className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-cyan/20 text-cyan text-xs font-semibold hover:bg-cyan/20 transition-colors"
 >
 <PlayCircle size={14} /> Study
 </Link>
 <Link 
 to={`/practice?chapter=${chapter.id}`}
 className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-glass-border text-text-muted text-xs font-semibold hover:border-slate hover:text-white transition-colors"
 >
 <Target size={14} /> Practice
 </Link>
 </div>
 </div>
 );
};
