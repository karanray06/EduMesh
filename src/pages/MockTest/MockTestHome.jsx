import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, BarChart3, Target, Award } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { DifficultyChip } from '../../components/ui/DifficultyChip';

const EXAM_TYPES = [
 { id: 'jee_main', title: 'JEE Main Full Syllabus', time: '180 mins', qCount: 90, icon: Target, color: 'text-cyan' },
 { id: 'jee_adv', title: 'JEE Advanced Paper 1', time: '180 mins', qCount: 54, icon: Award, color: 'text-amber' },
 { id: 'neet', title: 'NEET Full Syllabus', time: '200 mins', qCount: 200, icon: FileText, color: 'text-[#ef4444]' },
];

export default function MockTestHome() {
 const navigate = useNavigate();

 return (
 <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="flex justify-between items-end mb-8">
 <div>
 <h1 className="display-heading text-3xl mb-2">Mock Test Center</h1>
 <p className="text-text-secondary">Simulate real exam conditions and identify your weak spots.</p>
 </div>
 <button 
 onClick={() => navigate('/mock-test/config')}
 className="px-5 py-2.5 bg-cyan text-bg-primary rounded-xl font-bold hover:bg-[#00bfff] transition-colors"
 >
 Custom Test
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {EXAM_TYPES.map(exam => (
 <GlassCard key={exam.id} className="p-6 flex flex-col h-full group cursor-pointer" onClick={() => navigate('/mock-test/config?preset=' + exam.id)}>
 <div className={`w-12 h-12 rounded-xl bg-glass-fill flex items-center justify-center mb-4 ${exam.color}`}>
 <exam.icon size={24} />
 </div>
 <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-cyan transition-colors">{exam.title}</h3>
 
 <div className="flex gap-3 mb-6">
 <span className="flex items-center gap-1.5 text-xs text-text-secondary"><Clock size={14} /> {exam.time}</span>
 <span className="flex items-center gap-1.5 text-xs text-text-secondary"><FileText size={14} /> {exam.qCount} Qs</span>
 </div>
 
 <div className="mt-auto pt-4 border-t border-glass-border flex justify-between items-center">
 <DifficultyChip level={exam.id === 'jee_adv' ? 'hard' : 'medium'} />
 <span className="text-sm font-semibold text-cyan">Start Test →</span>
 </div>
 </GlassCard>
 ))}
 </div>

 <div className="mt-10">
 <h2 className="font-display font-bold text-2xl text-white mb-4">Recent Performance</h2>
 <GlassCard className="p-6 overflow-hidden">
 <div className="flex items-center justify-between p-4 bg-glass-fill rounded-xl border border-glass-border">
 <div className="flex items-center gap-4">
 <div className="w-10 h-10 rounded-full bg-cyan/20 text-cyan flex items-center justify-center font-bold">
 85
 </div>
 <div>
 <h4 className="font-bold text-white">JEE Main Part Test - Physics</h4>
 <p className="text-xs text-text-secondary">2 days ago • 85/100 marks</p>
 </div>
 </div>
 <button 
 onClick={() => navigate('/mock-test/analysis')}
 className="flex items-center gap-2 text-sm text-cyan hover:text-white transition-colors"
 >
 <BarChart3 size={16} /> Analysis
 </button>
 </div>
 </GlassCard>
 </div>
 </div>
 );
}
