import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Sparkles } from 'lucide-react';

export default function NoteEditor() {
 const navigate = useNavigate();
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');

 return (
 <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-100px)] animate-fade-in-up">
 <header className="flex items-center justify-between mb-6 shrink-0">
 <div className="flex items-center gap-4">
 <button 
 onClick={() => navigate('/notes')}
 className="w-10 h-10 rounded-xl bg-glass-fill border border-glass-border flex items-center justify-center text-text-muted hover:text-white hover:bg-glass-fill transition-colors"
 >
 <ChevronLeft size={20} />
 </button>
 <input 
 type="text" 
 placeholder="Note Title..."
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 className="bg-transparent border-none outline-none text-2xl font-display font-bold text-white placeholder:text-text-muted w-64"
 />
 </div>
 <div className="flex gap-2">
 <button className="px-4 py-2 rounded-xl text-cyan hover:bg-cyan/20 transition-colors text-sm font-semibold flex items-center gap-2">
 <Sparkles size={16} /> Enhance
 </button>
 <button className="px-4 py-2 rounded-xl bg-cyan text-bg-primary hover:bg-[#00bfff] transition-colors text-sm font-bold flex items-center gap-2">
 <Save size={16} /> Save
 </button>
 </div>
 </header>

 <div className="flex-1 glass-card p-6 md:p-10 flex flex-col">
 <textarea 
 placeholder="Start typing your notes here. You can use markdown and $math$ formulas..."
 value={content}
 onChange={(e) => setContent(e.target.value)}
 className="flex-1 w-full bg-transparent resize-none outline-none text-white text-lg leading-relaxed placeholder:text-text-muted chat-scroll"
 />
 </div>
 </div>
 );
}
