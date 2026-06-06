import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Bot, Target, BookmarkPlus, Play } from 'lucide-react';
import { KaTeXBlock } from '../../components/ui/KaTeXBlock';
import { generateStudyNotes } from '../../services/ai';
import { SYLLABUS } from '../../data/syllabus';

export default function TopicView() {
 const { subjectId, chapterId, topicId } = useParams();
 const navigate = useNavigate();
 const [content, setContent] = useState('');
 const [isLoading, setIsLoading] = useState(true);

 const targetExam = 'JEE';
 const subjectName = Object.keys(SYLLABUS[targetExam]).find(s => s.toLowerCase() === subjectId?.toLowerCase());
 const chapter = SYLLABUS[targetExam]?.[subjectName]?.find(c => c.id === chapterId);
 
 // Just use chapter name for now if topic ID is missing or generic
 const title = chapter ? chapter.name : 'Study Session';

 useEffect(() => {
 async function loadContent() {
 setIsLoading(true);
 try {
 // AI generated quick notes on load
 const response = await generateStudyNotes(subjectName || 'Science', title);
 setContent(response);
 } catch (e) {
 setContent("Failed to load notes. Please check your connection.");
 }
 setIsLoading(false);
 }
 loadContent();
 }, [subjectName, title]);

 return (
 <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-20">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between bg-glass-fill p-6 rounded-2xl border border-glass-border">
 <div className="flex items-start gap-4">
 <button 
 onClick={() => navigate(-1)}
 className="w-10 h-10 shrink-0 rounded-xl bg-glass-fill border border-glass-border flex items-center justify-center text-text-muted hover:text-white hover:bg-bg-primary transition-colors mt-1"
 >
 <ChevronLeft size={20} />
 </button>
 <div>
 <div className="flex gap-2 items-center mb-2">
 <span className="text-xs font-semibold text-cyan uppercase tracking-wider">{subjectName}</span>
 <span className="text-text-secondary text-xs">•</span>
 <span className="text-xs text-text-muted uppercase tracking-wider">Concept View</span>
 </div>
 <h1 className="font-display font-bold text-2xl md:text-3xl text-white leading-tight">{title}</h1>
 </div>
 </div>

 <div className="flex flex-wrap sm:flex-nowrap gap-2 sm:ml-auto">
 <button 
 onClick={() => navigate('/tutor')}
 className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan/20 text-cyan border border-cyan/50 hover:bg-cyan/20 transition-colors text-sm font-semibold"
 >
 <Bot size={18} />
 Ask Arya
 </button>
 <button 
 onClick={() => navigate(`/practice?chapter=${chapterId}`)}
 className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan text-bg-primary hover:bg-[#00bfff] transition-colors text-sm font-semibold"
 >
 <Target size={18} />
 Quick Quiz
 </button>
 </div>
 </div>

 {/* Content Area */}
 <div className="glass-card p-6 md:p-8 min-h-[400px]">
 <div className="flex justify-between items-center mb-6 pb-4 border-b border-glass-border">
 <h2 className="font-display font-bold text-xl text-white">Smart Notes</h2>
 <button className="text-text-secondary hover:text-amber flex items-center gap-1.5 text-sm transition-colors">
 <BookmarkPlus size={16} /> Save to Vault
 </button>
 </div>

 {isLoading ? (
 <div className="flex flex-col items-center justify-center h-[300px] text-text-muted space-y-4">
 <div className="w-10 h-10 rounded-full border-4 border-cyan/50 border-t-cyan animate-spin" />
 <p className="text-sm">Arya is generating focused notes...</p>
 </div>
 ) : (
 <div className="ai-notes">
 <KaTeXBlock content={content} />
 </div>
 )}
 </div>
 </div>
 );
}
