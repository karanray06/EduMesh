import React, { useState } from 'react';
import { Search, Calculator, ChevronRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { KaTeXBlock } from '../../components/ui/KaTeXBlock';
import { FORMULAS } from '../../data/formulas';

export default function FormulaVault() {
 const [search, setSearch] = useState('');
 const [subjectFilter, setSubjectFilter] = useState('All');

 const filtered = FORMULAS.filter(f => 
 (subjectFilter === 'All' || f.subject === subjectFilter) &&
 (f.name.toLowerCase().includes(search.toLowerCase()) || f.topic.toLowerCase().includes(search.toLowerCase()))
 );

 return (
 <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-10 flex flex-col md:flex-row gap-8">
 {/* Sidebar Filter */}
 <div className="w-full md:w-64 shrink-0 space-y-6">
 <div>
 <h1 className="display-heading text-3xl mb-2 flex items-center gap-2"><Calculator size={28}/> Vault</h1>
 <p className="text-text-secondary text-sm">Quick access to essential formulas.</p>
 </div>
 
 <div className="relative">
 <Search className="absolute left-3 top-3 text-text-secondary" size={16} />
 <input 
 type="text" 
 placeholder="Search..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="w-full bg-glass-fill border border-glass-border rounded-xl pl-9 pr-4 py-2.5 text-white outline-none focus:border-cyan text-sm"
 />
 </div>

 <div className="space-y-1">
 {['All', 'Physics', 'Chemistry', 'Mathematics'].map(s => (
 <button 
 key={s}
 onClick={() => setSubjectFilter(s)}
 className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
 subjectFilter === s ? 'bg-cyan/20 text-cyan font-bold' : 'text-text-muted hover:bg-glass-fill hover:text-white'
 }`}
 >
 {s}
 </button>
 ))}
 </div>
 </div>

 {/* Main Grid */}
 <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-4">
 {filtered.map(f => (
 <GlassCard key={f.id} className="p-5 flex flex-col hover:-translate-y-1 transition-transform group cursor-pointer">
 <div className="flex justify-between items-start mb-2">
 <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider bg-glass-fill px-2 py-0.5 rounded">
 {f.topic}
 </span>
 <div className={`w-2 h-2 rounded-full ${
 f.subject === 'Physics' ? 'bg-cyan' : f.subject === 'Chemistry' ? 'bg-amber' : 'bg-indigo'
 }`} />
 </div>
 
 <h3 className="font-bold text-white mb-4">{f.name}</h3>
 
 <div className="bg-glass-fill rounded-xl p-4 mb-4 flex items-center justify-center min-h-[80px]">
 <KaTeXBlock content={`$$${f.math}$$`} className="text-xl" />
 </div>
 
 <p className="text-sm text-text-muted mb-4 line-clamp-2">{f.desc}</p>
 
 <div className="mt-auto pt-3 border-t border-glass-border flex justify-between items-center text-sm text-cyan font-semibold group-hover:text-white transition-colors">
 View Details <ChevronRight size={16} />
 </div>
 </GlassCard>
 ))}
 {filtered.length === 0 && (
 <div className="col-span-full text-center py-10 text-text-secondary">No formulas found.</div>
 )}
 </div>
 </div>
 );
}
