import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Sparkles, BookText } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export default function NotesHome() {
 const navigate = useNavigate();
 const [search, setSearch] = useState('');

 const MOCK_NOTES = [
 { id: 1, title: 'Laws of Motion Summary', subject: 'Physics', date: '2 days ago', isAI: true },
 { id: 2, title: 'Organic Reaction Mechanisms', subject: 'Chemistry', date: '5 days ago', isAI: false },
 { id: 3, title: 'Integration Shortcuts', subject: 'Mathematics', date: '1 week ago', isAI: true },
 ];

 return (
 <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
 <div>
 <h1 className="display-heading text-3xl mb-2">Smart Notes</h1>
 <p className="text-text-secondary">Your personal knowledge base, supercharged by Arya.</p>
 </div>
 <div className="flex gap-3">
 <button 
 onClick={() => navigate('/notes/editor')}
 className="px-4 py-2 bg-glass-fill text-white border border-glass-border rounded-xl font-bold hover:bg-glass-fill transition-colors flex items-center gap-2"
 >
 <Plus size={18} /> New Note
 </button>
 <button 
 onClick={() => navigate('/notes/generate')}
 className="px-4 py-2 bg-cyan/20 text-cyan border border-cyan/50 rounded-xl font-bold hover:bg-cyan/20 transition-colors flex items-center gap-2"
 >
 <Sparkles size={18} /> AI Generate
 </button>
 </div>
 </div>

 <div className="relative max-w-xl mb-8">
 <Search className="absolute left-4 top-3.5 text-text-secondary" size={20} />
 <input 
 type="text" 
 placeholder="Search your notes..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="w-full bg-glass-fill border border-glass-border rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-cyan transition-colors"
 />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {MOCK_NOTES.map(note => (
 <GlassCard key={note.id} className="p-6 group cursor-pointer hover:-translate-y-1 transition-all" onClick={() => navigate('/notes/editor')}>
 <div className="flex justify-between items-start mb-4">
 <span className="px-2.5 py-1 bg-glass-fill rounded-md text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider">
 {note.subject}
 </span>
 {note.isAI && <span className="flex items-center gap-1 text-[10px] text-cyan font-bold uppercase tracking-wider"><Sparkles size={12}/> AI</span>}
 </div>
 <h3 className="font-display font-bold text-white text-xl mb-3 group-hover:text-cyan transition-colors">{note.title}</h3>
 <div className="flex items-center gap-2 text-sm text-text-muted">
 <BookText size={16} /> {note.date}
 </div>
 </GlassCard>
 ))}
 </div>
 </div>
 );
}
