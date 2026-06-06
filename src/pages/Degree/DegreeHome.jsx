import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Briefcase, ChevronRight, BookOpen } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { DEGREE_PROGRAMS } from '../../data/degree-syllabus';

export default function DegreeHome() {
 const navigate = useNavigate();

 return (
 <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="text-center mb-10">
 <div className="w-16 h-16 rounded-2xl bg-amber/20 flex items-center justify-center mx-auto mb-4 border border-amber/50">
 <GraduationCap size={32} className="text-amber" />
 </div>
 <h1 className="display-heading text-3xl mb-2">Undergraduate Hub</h1>
 <p className="text-text-secondary max-w-xl mx-auto">University curriculum made simple. Navigate your semesters, prepare for vivas, and get placement-ready.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
 {DEGREE_PROGRAMS.map(prog => (
 <GlassCard key={prog.id} className="p-6 group cursor-pointer hover:-translate-y-1 transition-transform" onClick={() => navigate(`/degree/${prog.id}`)}>
 <div className="flex justify-between items-start mb-4">
 <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ borderColor: `${prog.color}40`, backgroundColor: `${prog.color}10`, color: prog.color }}>
 <BookOpen size={20} />
 </div>
 <span className="text-[10px] font-mono font-bold text-text-secondary uppercase tracking-wider bg-glass-fill px-2 py-1 rounded">
 {prog.duration}
 </span>
 </div>
 <h2 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-amber transition-colors">{prog.name}</h2>
 <div className="flex items-center gap-1 text-sm text-amber font-semibold mt-6">
 View Semesters <ChevronRight size={16} />
 </div>
 </GlassCard>
 ))}
 </div>

 <h2 className="font-display font-bold text-2xl text-white mb-4">Career & Interviews</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard className="p-6 flex items-center gap-5 cursor-pointer hover:border-cyan/50 transition-colors" onClick={() => navigate('/degree/viva')}>
 <div className="w-14 h-14 rounded-2xl bg-cyan/20 flex items-center justify-center">
 <GraduationCap size={24} className="text-cyan" />
 </div>
 <div>
 <h3 className="font-bold text-white text-lg">AI Viva Simulator</h3>
 <p className="text-sm text-text-secondary">Mock practical vivas for lab exams.</p>
 </div>
 </GlassCard>
 <GlassCard className="p-6 flex items-center gap-5 cursor-pointer hover:border-[#a855f7]/50 transition-colors" onClick={() => navigate('/degree/placement')}>
 <div className="w-14 h-14 rounded-2xl bg-[rgba(168,85,247,0.1)] flex items-center justify-center">
 <Briefcase size={24} className="text-[#c084fc]" />
 </div>
 <div>
 <h3 className="font-bold text-white text-lg">Placement Prep</h3>
 <p className="text-sm text-text-secondary">DSA, System Design, and CS Core.</p>
 </div>
 </GlassCard>
 </div>
 </div>
 );
}
