import React from 'react';
import { CalendarDays, Plus, Target, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { ProgressRing } from '../../components/ui/ProgressRing';

export default function PlannerHome() {
 return (
 <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="flex justify-between items-end mb-8">
 <div>
 <h1 className="display-heading text-3xl mb-2 flex items-center gap-2"><CalendarDays size={28}/> Study Planner</h1>
 <p className="text-text-secondary">Manage your daily targets and long-term exam strategy.</p>
 </div>
 <button className="px-4 py-2.5 bg-cyan text-bg-primary rounded-xl font-bold hover:bg-[#00bfff] transition-colors flex items-center gap-2">
 <Plus size={18} /> New Plan
 </button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Daily Mission - Embedded */}
 <GlassCard className="p-6 lg:col-span-1 border-l-4 border-l-gold flex flex-col">
 <h2 className="font-display font-bold text-xl text-white mb-6">Today's Mission</h2>
 
 <div className="space-y-4 mb-8">
 <div className="flex items-start gap-3">
 <button className="mt-1 w-5 h-5 rounded-md border border-glass-border flex items-center justify-center hover:bg-cyan/20 hover:border-cyan text-transparent hover:text-cyan transition-colors">
 <CheckCircle2 size={14} />
 </button>
 <div>
 <p className="text-sm font-bold text-white mb-0.5">Solve 20 Kinematics PYQs</p>
 <p className="text-xs text-text-secondary">Est: 45 mins • Physics</p>
 </div>
 </div>
 <div className="flex items-start gap-3 opacity-50">
 <div className="mt-1 w-5 h-5 rounded-md bg-[#22c55e] text-bg-primary flex items-center justify-center">
 <CheckCircle2 size={14} />
 </div>
 <div>
 <p className="text-sm font-bold text-white mb-0.5"><strike>Revise Thermodynamics Notes</strike></p>
 <p className="text-xs text-text-secondary">Completed</p>
 </div>
 </div>
 </div>
 
 <div className="mt-auto bg-glass-fill rounded-xl p-4 flex items-center gap-4 border border-glass-border">
 <ProgressRing progress={50} size={50} strokeWidth={4} color="#D4A373">
 <span className="text-xs font-bold font-mono">1/2</span>
 </ProgressRing>
 <div>
 <p className="font-bold text-white text-sm">Halfway there!</p>
 <p className="text-xs text-text-secondary">Keep up the streak 🔥</p>
 </div>
 </div>
 </GlassCard>

 {/* Weekly Overview */}
 <GlassCard className="p-6 lg:col-span-2">
 <div className="flex justify-between items-center mb-6">
 <h2 className="font-display font-bold text-xl text-white">This Week</h2>
 <select className="bg-glass-fill text-xs text-text-secondary border border-glass-border rounded-md px-2 py-1 outline-none">
 <option>JEE Main 60-Day Plan</option>
 </select>
 </div>
 
 <div className="grid grid-cols-7 gap-2">
 {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
 <div key={day} className={`flex flex-col items-center p-3 rounded-xl border ${i === 2 ? 'bg-cyan/20 border-cyan' : 'bg-glass-fill border-glass-border'}`}>
 <span className={`text-[10px] uppercase font-bold mb-1 ${i === 2 ? 'text-cyan' : 'text-text-secondary'}`}>{day}</span>
 <span className="text-lg font-mono font-bold text-white mb-2">{10 + i}</span>
 <div className="flex gap-1">
 {i < 3 && <div className="w-1.5 h-1.5 rounded-full bg-cyan" />}
 {i === 2 && <div className="w-1.5 h-1.5 rounded-full bg-amber" />}
 </div>
 </div>
 ))}
 </div>

 <div className="mt-8 space-y-3">
 <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Target size={16}/> Upcoming Milestones</h3>
 <div className="p-3 bg-glass-fill rounded-lg border border-glass-border flex justify-between items-center">
 <div>
 <p className="text-sm font-bold text-white">Full Mock Test 1</p>
 <p className="text-xs text-text-secondary">Sunday, 10:00 AM</p>
 </div>
 <span className="px-2 py-1 bg-amber/20 text-amber text-xs rounded-md font-bold">In 4 days</span>
 </div>
 </div>
 </GlassCard>
 </div>
 </div>
 );
}
