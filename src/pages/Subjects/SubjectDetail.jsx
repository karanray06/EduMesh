import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, BrainCircuit } from 'lucide-react';
import { SYLLABUS, MOCK_PROGRESS } from '../../data/syllabus';
import { ChapterCard } from './ChapterCard';

export default function SubjectDetail() {
 const { subjectId } = useParams();
 const navigate = useNavigate();
 const targetExam = 'JEE';
 
 // Find correct casing
 const subjectName = Object.keys(SYLLABUS[targetExam]).find(
 s => s.toLowerCase() === subjectId.toLowerCase()
 );

 if (!subjectName) {
 return <div className="text-white p-8">Subject not found.</div>;
 }

 const chapters = SYLLABUS[targetExam][subjectName];

 return (
 <div className="space-y-6 animate-fade-in-up">
 <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
 <div className="flex items-center gap-3">
 <button 
 onClick={() => navigate('/subjects')}
 className="w-10 h-10 rounded-xl bg-glass-fill border border-glass-border flex items-center justify-center text-text-muted hover:text-white hover:bg-glass-fill transition-colors"
 >
 <ChevronLeft size={20} />
 </button>
 <div>
 <h1 className="font-display font-bold text-2xl text-white leading-none mb-1">{subjectName}</h1>
 <div className="text-xs text-text-secondary uppercase tracking-wider">{chapters.length} Chapters</div>
 </div>
 </div>

 <button 
 onClick={() => navigate('/tutor')}
 className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan/20 text-cyan border border-cyan/50 hover:bg-cyan/20 transition-colors text-sm font-semibold"
 >
 <BrainCircuit size={18} />
 Ask Arya Physics
 </button>
 </div>

 {/* Mock filters for visual completeness */}
 <div className="flex gap-2 pb-2 overflow-x-auto hide-scrollbar">
 {['All Chapters', 'Needs Review', 'Not Started', 'Mastered'].map((filter, i) => (
 <button 
 key={filter}
 className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
 i === 0 
 ? 'bg-cyan text-bg-primary' 
 : 'bg-glass-fill text-text-muted hover:bg-glass-fill border border-glass-border'
 }`}
 >
 {filter}
 </button>
 ))}
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
 {chapters.map(chapter => (
 <ChapterCard 
 key={chapter.id} 
 chapter={chapter} 
 progress={MOCK_PROGRESS[chapter.id]} 
 subjectName={subjectName}
 />
 ))}
 </div>
 </div>
 );
}
