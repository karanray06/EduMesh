import React, { useState } from 'react';
import { Mic, Video, Sparkles, AlertCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export default function VivaPrep() {
 const [topic, setTopic] = useState('Data Structures using C');

 return (
 <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="text-center mb-8">
 <h1 className="display-heading text-3xl mb-2">AI Viva Simulator</h1>
 <p className="text-text-secondary">Practice oral examinations with Arya in a simulated environment.</p>
 </div>

 <GlassCard className="p-8 border-t-4 border-t-cyan max-w-2xl mx-auto space-y-6">
 <div>
 <label className="block text-sm font-bold text-white mb-2">Select Lab / Subject</label>
 <select 
 value={topic}
 onChange={e => setTopic(e.target.value)}
 className="w-full bg-glass-fill border border-glass-border rounded-xl px-4 py-3 text-white outline-none focus:border-cyan"
 >
 <option>Data Structures using C</option>
 <option>Object Oriented Programming</option>
 <option>Database Management Systems</option>
 <option>Operating Systems</option>
 </select>
 </div>

 <div className="p-4 bg-amber/20 border border-amber/50 rounded-xl flex gap-3 text-text-secondary text-sm">
 <AlertCircle size={20} className="text-amber shrink-0" />
 <p>The simulator will ask you 5 consecutive questions. You can reply using text or voice. Arya will evaluate your technical accuracy and confidence.</p>
 </div>

 <button className="w-full py-4 bg-cyan text-bg-primary font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-[#00bfff] transition-colors">
 <Mic size={20} /> Start Voice Session
 </button>
 <button className="w-full py-3 bg-glass-fill text-white font-bold rounded-xl border border-glass-border flex justify-center items-center gap-2 hover:bg-glass-fill transition-colors">
 <Sparkles size={18} /> Start Text Session
 </button>
 </GlassCard>
 </div>
 );
}
