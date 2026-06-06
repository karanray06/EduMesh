import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Play } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { DEGREE_PROGRAMS, SUBJECT_UNITS } from '../../data/degree-syllabus';

export default function DegreeSubject() {
 const { degreeId, semId } = useParams();
 const navigate = useNavigate();
 
 const program = DEGREE_PROGRAMS.find(p => p.id === degreeId);
 const semester = program?.semesters.find(s => s.id === semId);
 const subjects = semester?.subjects || [];

 return (
 <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="flex items-center gap-4 mb-8">
 <button 
 onClick={() => navigate(-1)}
 className="w-10 h-10 rounded-xl bg-glass-fill border border-glass-border flex items-center justify-center text-text-muted hover:text-white hover:bg-glass-fill transition-colors"
 >
 <ChevronLeft size={20} />
 </button>
 <div>
 <h1 className="display-heading text-3xl">{semester?.name}</h1>
 <p className="text-sm text-text-secondary">{program?.name}</p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="md:col-span-1 space-y-2">
 <h3 className="text-[10px] uppercase font-bold text-text-secondary tracking-wider ml-1 mb-3">Subjects</h3>
 {subjects.map(sub => (
 <button key={sub} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${sub === 'Operating Systems' ? 'bg-amber/20 text-amber border border-amber/30' : 'bg-glass-fill border border-glass-border text-text-secondary hover:text-white hover:bg-glass-fill'}`}>
 {sub}
 </button>
 ))}
 </div>

 <div className="md:col-span-2 space-y-4">
 <GlassCard className="p-6 border-t-4 border-t-gold mb-6">
 <h2 className="font-display font-bold text-2xl text-white mb-2">Operating Systems</h2>
 <div className="flex gap-3">
 <button className="px-4 py-2 bg-cyan/20 text-cyan rounded-lg text-sm font-bold flex items-center gap-2"><Play size={16}/> Study Notes</button>
 <button className="px-4 py-2 bg-glass-fill border border-glass-border text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-glass-fill"><ExternalLink size={16}/> PYQs</button>
 </div>
 </GlassCard>

 <h3 className="text-[10px] uppercase font-bold text-text-secondary tracking-wider ml-1 mb-2">Units</h3>
 {SUBJECT_UNITS['Operating Systems']?.map((unit, i) => (
 <GlassCard key={i} className="p-5">
 <h4 className="font-bold text-white mb-3">{unit.name}</h4>
 <div className="flex flex-wrap gap-2">
 {unit.topics.map((t, idx) => (
 <span key={idx} className="px-2 py-1 bg-glass-fill border border-glass-border rounded-md text-xs text-text-secondary">{t}</span>
 ))}
 </div>
 </GlassCard>
 ))}
 </div>
 </div>
 </div>
 );
}
