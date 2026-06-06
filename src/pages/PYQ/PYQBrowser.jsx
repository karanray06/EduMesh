import React, { useState } from 'react';
import { Search, Layers, FileText, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { DifficultyChip } from '../../components/ui/DifficultyChip';

const MOCK_PYQS = [
 { id: 1, year: 2023, shift: 'Jan Shift 1', exam: 'JEE Main', subject: 'Physics', chapter: 'Kinematics', diff: 'medium' },
 { id: 2, year: 2022, shift: 'July Shift 2', exam: 'JEE Main', subject: 'Chemistry', chapter: 'Thermodynamics', diff: 'hard' },
 { id: 3, year: 2021, shift: 'Feb Shift 1', exam: 'JEE Main', subject: 'Mathematics', chapter: 'Calculus', diff: 'easy' },
];

export default function PYQBrowser() {
 const [search, setSearch] = useState('');

 return (
 <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
 <div>
 <h1 className="display-heading text-3xl mb-2">PYQ Vault</h1>
 <p className="text-text-secondary">Browse and solve previous year questions.</p>
 </div>
 <div className="relative w-full md:w-64">
 <Search className="absolute left-3 top-3 text-text-secondary" size={18} />
 <input 
 type="text" 
 placeholder="Search topic or year..."
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 className="w-full bg-glass-fill border border-glass-border rounded-xl pl-10 pr-4 py-2.5 text-white outline-none focus:border-cyan transition-colors"
 />
 </div>
 </div>

 <div className="flex gap-2 pb-2 overflow-x-auto hide-scrollbar">
 <select className="bg-glass-fill border border-glass-border rounded-lg px-3 py-1.5 text-sm text-white outline-none">
 <option>All Exams</option>
 <option>JEE Main</option>
 <option>NEET</option>
 </select>
 <select className="bg-glass-fill border border-glass-border rounded-lg px-3 py-1.5 text-sm text-white outline-none">
 <option>All Subjects</option>
 <option>Physics</option>
 <option>Chemistry</option>
 <option>Mathematics</option>
 </select>
 <select className="bg-glass-fill border border-glass-border rounded-lg px-3 py-1.5 text-sm text-white outline-none">
 <option>All Years</option>
 <option>2023</option>
 <option>2022</option>
 </select>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {MOCK_PYQS.map(pyq => (
 <GlassCard key={pyq.id} className="p-5 flex flex-col group hover:-translate-y-1 transition-transform">
 <div className="flex justify-between items-start mb-4">
 <div className="badge-gold px-2 py-0.5 text-xs font-bold rounded-md uppercase tracking-wider">{pyq.year}</div>
 <DifficultyChip level={pyq.diff} />
 </div>
 
 <h3 className="font-display font-bold text-white text-lg mb-1">{pyq.chapter}</h3>
 <p className="text-sm text-text-muted mb-6">{pyq.exam} • {pyq.shift}</p>

 <div className="mt-auto pt-4 border-t border-glass-border flex gap-2">
 <button className="flex-1 py-2 rounded-lg bg-cyan/20 text-cyan text-sm font-semibold hover:bg-cyan/20 transition-colors">
 Solve Now
 </button>
 <button className="px-3 py-2 rounded-lg border border-glass-border text-text-muted hover:text-white hover:bg-glass-fill transition-colors" title="View Solution">
 <FileText size={16} />
 </button>
 </div>
 </GlassCard>
 ))}
 </div>
 </div>
 );
}
