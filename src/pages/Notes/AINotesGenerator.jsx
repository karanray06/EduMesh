import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { generateStudyNotes } from '../../services/ai';

export default function AINotesGenerator() {
 const navigate = useNavigate();
 const [topic, setTopic] = useState('');
 const [subject, setSubject] = useState('Physics');
 const [isLoading, setIsLoading] = useState(false);

 const handleGenerate = async () => {
 if (!topic.trim()) return;
 setIsLoading(true);
 try {
 await generateStudyNotes(subject, topic);
 // In a real app we'd save to store/db and navigate to the created note
 navigate('/notes');
 } catch (e) {
 console.error(e);
 }
 setIsLoading(false);
 };

 return (
 <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up py-10">
 <div className="text-center mb-8">
 <div className="w-16 h-16 rounded-2xl bg-cyan/20 flex items-center justify-center mx-auto mb-4 border border-cyan/50">
 <Sparkles size={32} className="text-cyan" />
 </div>
 <h1 className="display-heading text-3xl mb-2">AI Notes Generator</h1>
 <p className="text-text-secondary">Let Arya compile perfectly structured notes for any topic.</p>
 </div>

 <GlassCard className="p-6 md:p-8 space-y-6">
 <div>
 <label className="block text-sm font-semibold text-white mb-3">Subject</label>
 <select 
 value={subject}
 onChange={(e) => setSubject(e.target.value)}
 className="w-full bg-glass-fill border border-glass-border rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
 >
 {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map(s => <option key={s}>{s}</option>)}
 </select>
 </div>

 <div>
 <label className="block text-sm font-semibold text-white mb-3">Topic / Chapter Name</label>
 <input 
 type="text" 
 placeholder="e.g. Thermodynamics, First Law..."
 value={topic}
 onChange={(e) => setTopic(e.target.value)}
 className="w-full bg-glass-fill border border-glass-border rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
 />
 </div>

 <button 
 onClick={handleGenerate}
 disabled={!topic.trim() || isLoading}
 className="w-full py-4 rounded-xl bg-cyan text-bg-primary font-bold flex items-center justify-center gap-2 hover:bg-[#00bfff] disabled:opacity-50 transition-colors"
 >
 {isLoading ? 'Generating (may take a minute)...' : <><Sparkles size={20} /> Generate Notes</>}
 </button>
 </GlassCard>
 </div>
 );
}
