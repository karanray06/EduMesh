import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Settings2, Play, Clock, FileText } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { useMockTestStore } from '../../hooks/useMockTest';

export default function TestConfig() {
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();
 const preset = searchParams.get('preset');
 
 const [config, setConfig] = useState({
 type: preset || 'custom',
 subjects: ['Physics', 'Chemistry', 'Mathematics'],
 duration: preset === 'jee_adv' ? '180' : preset === 'neet' ? '200' : '180',
 questionCount: preset === 'jee_adv' ? 54 : preset === 'neet' ? 200 : 90,
 });

 const { initTest } = useMockTestStore();

 const handleStart = () => {
 initTest(config);
 navigate('/mock-test/session');
 };

 return (
 <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up pb-10">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-12 h-12 rounded-xl bg-cyan/20 flex items-center justify-center border border-cyan/50">
 <Settings2 size={24} className="text-cyan" />
 </div>
 <div>
 <h1 className="display-heading text-2xl">Configure Test</h1>
 <p className="text-sm text-text-secondary">Set up your exam parameters before starting.</p>
 </div>
 </div>

 <GlassCard className="p-6 space-y-6">
 <div>
 <label className="block text-sm font-semibold text-white mb-3">Exam Target</label>
 <select 
 value={config.type}
 onChange={(e) => setConfig({ ...config, type: e.target.value })}
 className="w-full bg-glass-fill border border-glass-border rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
 >
 <option value="jee_main">JEE Main</option>
 <option value="jee_adv">JEE Advanced</option>
 <option value="neet">NEET</option>
 <option value="custom">Custom Part Test</option>
 </select>
 </div>

 <div className="grid grid-cols-2 gap-4">
 <div>
 <label className="block text-sm font-semibold text-white mb-3">Duration (mins)</label>
 <div className="relative">
 <Clock className="absolute left-4 top-3 text-text-secondary" size={18} />
 <input 
 type="number" 
 value={config.duration}
 onChange={(e) => setConfig({ ...config, duration: e.target.value })}
 className="w-full bg-glass-fill border border-glass-border rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-cyan transition-colors"
 />
 </div>
 </div>
 <div>
 <label className="block text-sm font-semibold text-white mb-3">Questions</label>
 <div className="relative">
 <FileText className="absolute left-4 top-3 text-text-secondary" size={18} />
 <input 
 type="number" 
 value={config.questionCount}
 onChange={(e) => setConfig({ ...config, questionCount: Number(e.target.value) })}
 className="w-full bg-glass-fill border border-glass-border rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-cyan transition-colors"
 />
 </div>
 </div>
 </div>

 <div>
 <label className="block text-sm font-semibold text-white mb-3">Subjects</label>
 <div className="flex flex-wrap gap-2">
 {['Physics', 'Chemistry', 'Mathematics', 'Biology'].map(sub => {
 const isActive = config.subjects.includes(sub);
 return (
 <button
 key={sub}
 onClick={() => {
 const newSubs = isActive 
 ? config.subjects.filter(s => s !== sub)
 : [...config.subjects, sub];
 setConfig({ ...config, subjects: newSubs });
 }}
 className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
 isActive 
 ? 'bg-cyan/20 border-cyan text-cyan' 
 : 'bg-glass-fill border-glass-border text-text-secondary hover:bg-glass-fill hover:text-white'
 }`}
 >
 {sub}
 </button>
 );
 })}
 </div>
 </div>
 </GlassCard>

 <div className="flex gap-4">
 <button onClick={() => navigate(-1)} className="flex-1 py-4 rounded-xl border border-glass-border text-white hover:bg-glass-fill transition-colors font-semibold">
 Cancel
 </button>
 <button onClick={handleStart} className="flex-1 py-4 rounded-xl bg-cyan text-bg-primary font-bold flex items-center justify-center gap-2 hover:bg-[#00bfff] transition-colors">
 <Play size={20} className="fill-current" /> Begin Exam
 </button>
 </div>
 </div>
 );
}
