import React from 'react';
import { Briefcase, Code, Database, Server } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export default function PlacementPrep() {
 return (
 <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="flex items-center gap-4 mb-8 border-b border-glass-border pb-6">
 <div className="w-12 h-12 rounded-xl bg-[rgba(168,85,247,0.1)] flex items-center justify-center border border-[#a855f7]/30">
 <Briefcase size={24} className="text-[#c084fc]" />
 </div>
 <div>
 <h1 className="display-heading text-3xl mb-1">Placement Prep Dashboard</h1>
 <p className="text-text-secondary">Core CS subjects, System Design, and Aptitude.</p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <GlassCard className="p-6">
 <Code className="text-cyan mb-4" size={32} />
 <h3 className="font-bold text-white text-xl mb-2">Data Structures & Algos</h3>
 <p className="text-sm text-text-secondary mb-4">Top 150 interview questions grouped by patterns.</p>
 <div className="h-1.5 bg-glass-fill rounded-full overflow-hidden mb-2">
 <div className="h-full bg-cyan w-[20%]" />
 </div>
 <span className="text-[10px] font-mono text-text-secondary">30/150 Solved</span>
 </GlassCard>

 <GlassCard className="p-6">
 <Database className="text-amber mb-4" size={32} />
 <h3 className="font-bold text-white text-xl mb-2">CS Core Fundamentals</h3>
 <p className="text-sm text-text-secondary mb-4">OS, DBMS, and Computer Networks crash course.</p>
 <div className="h-1.5 bg-glass-fill rounded-full overflow-hidden mb-2">
 <div className="h-full bg-amber w-[45%]" />
 </div>
 <span className="text-[10px] font-mono text-text-secondary">45% Completed</span>
 </GlassCard>

 <GlassCard className="p-6">
 <Server className="text-[#c084fc] mb-4" size={32} />
 <h3 className="font-bold text-white text-xl mb-2">System Design</h3>
 <p className="text-sm text-text-secondary mb-4">Scalability concepts and LLD/HLD case studies.</p>
 <button className="w-full py-2 bg-[rgba(168,85,247,0.1)] text-[#c084fc] font-bold rounded-lg hover:bg-[rgba(168,85,247,0.15)] transition-colors mt-auto">
 Start Learning
 </button>
 </GlassCard>
 </div>
 </div>
 );
}
