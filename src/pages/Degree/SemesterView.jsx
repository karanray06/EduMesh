import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Layers } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { DEGREE_PROGRAMS } from '../../data/degree-syllabus';

export default function SemesterView() {
 const { degreeId } = useParams();
 const navigate = useNavigate();
 const program = DEGREE_PROGRAMS.find(p => p.id === degreeId);

 if (!program) return <div className="p-8 text-white">Program not found.</div>;

 return (
 <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="flex items-center gap-4 mb-8">
 <button 
 onClick={() => navigate('/degree')}
 className="w-10 h-10 rounded-xl bg-glass-fill border border-glass-border flex items-center justify-center text-text-muted hover:text-white hover:bg-glass-fill transition-colors"
 >
 <ChevronLeft size={20} />
 </button>
 <div>
 <h1 className="display-heading text-3xl">{program.name}</h1>
 <p className="text-sm text-amber font-bold">{program.duration}</p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
 {program.semesters.map(sem => (
 <GlassCard key={sem.id} className="p-5 flex flex-col group hover:border-amber/30 transition-colors">
 <h3 className="font-display font-bold text-white text-xl mb-4 border-b border-glass-border pb-3">
 {sem.name}
 </h3>
 <ul className="space-y-2 mb-6">
 {sem.subjects.slice(0, 3).map((sub, i) => (
 <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
 <span className="text-amber mt-1">•</span> <span className="line-clamp-1" title={sub}>{sub}</span>
 </li>
 ))}
 {sem.subjects.length > 3 && (
 <li className="text-xs text-text-muted italic">+{sem.subjects.length - 3} more</li>
 )}
 </ul>
 <button 
 onClick={() => navigate(`/degree/${degreeId}/${sem.id}`)}
 className="mt-auto w-full py-2.5 rounded-lg bg-amber/20 text-amber text-sm font-bold flex items-center justify-center gap-2 hover:bg-amber/20 transition-colors"
 >
 <Layers size={16} /> Open Semester
 </button>
 </GlassCard>
 ))}
 </div>
 </div>
 );
}
