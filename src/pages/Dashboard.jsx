import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useGamificationStore } from '../features/gamification/GamificationStore';
import { GlassCard } from '../components/ui/GlassCard';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Target, Play, Brain, Clock, ChevronRight, Award } from 'lucide-react';
import { BADGES } from '../features/gamification/BadgeSystem';

export default function Dashboard() {
 const navigate = useNavigate();
 const { user } = useAuthStore();
 const { recordDailyLogin, streakDays, totalXP, currentTier, badges } = useGamificationStore();
 const displayName = user?.display_name || user?.email?.split('@')[0] || 'Student';

 // Record daily login when dashboard mounts
 useEffect(() => {
 recordDailyLogin();
 }, [recordDailyLogin]);

 return (
 <div className="space-y-6 animate-fade-in-up pb-10 max-w-7xl mx-auto">
 {/* Top Section - Welcome & Quick Stats */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 
 {/* Welcome Card */}
 <GlassCard className="p-8 lg:col-span-2 bg-gradient-to-br from-[rgba(26,37,48,0.8)] to-[rgba(43,45,66,0.9)] relative overflow-hidden border border-glass-border">
 <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
 
 <div className="relative z-10 flex flex-col h-full justify-between">
 <div>
 <h1 className="font-display font-bold text-3xl text-white mb-2">Welcome back, {displayName}!</h1>
 <p className="text-text-secondary max-w-md leading-relaxed">
 You've got a solid <strong className="text-amber">{streakDays}-day streak</strong> going. Let's tackle some Physics PYQs today.
 </p>
 </div>
 
 <div className="mt-8 flex gap-4">
 <button 
 onClick={() => navigate('/practice')}
 className="px-6 py-3 rounded-xl bg-cyan text-bg-primary font-bold flex items-center gap-2 hover:bg-[#00bfff] transition-colors shadow-glow-indigo"
 >
 <Play size={18} className="fill-current" /> Start Practice
 </button>
 <button 
 onClick={() => navigate('/tutor')}
 className="px-6 py-3 rounded-xl bg-cyan/20 border border-cyan/50 text-cyan font-semibold flex items-center gap-2 hover:bg-cyan/20 transition-colors"
 >
 <Brain size={18} /> Ask Arya
 </button>
 </div>
 </div>
 </GlassCard>

 {/* Profile/Gamification Summary */}
 <GlassCard className="p-6 flex flex-col justify-center relative overflow-hidden">
 <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: currentTier.color }} />
 
 <div className="flex items-center gap-4 mb-6">
 <div className="w-16 h-16 rounded-2xl bg-glass-fill border border-glass-border flex items-center justify-center text-3xl shadow-glass">
 {currentTier.icon}
 </div>
 <div>
 <h3 className="font-display font-bold text-xl text-white" style={{ color: currentTier.color }}>{currentTier.name}</h3>
 <p className="text-sm font-mono text-text-secondary uppercase tracking-wider">{totalXP} XP Total</p>
 </div>
 </div>

 <div className="space-y-4">
 <div className="flex justify-between items-center p-3 rounded-xl bg-amber/10 border border-amber/30">
 <span className="flex items-center gap-2 text-sm text-white"><span className="text-xl">🔥</span> Current Streak</span>
 <span className="font-mono font-bold text-amber text-lg">{streakDays} days</span>
 </div>
 <div className="flex justify-between items-center p-3 rounded-xl bg-glass-fill border border-glass-border">
 <span className="flex items-center gap-2 text-sm text-white"><Award size={18} className="text-text-secondary"/> Badges Earned</span>
 <span className="font-mono font-bold text-white text-lg">{badges.length} <span className="text-xs text-text-secondary">/ {BADGES.length}</span></span>
 </div>
 </div>
 </GlassCard>

 </div>

 {/* Middle Section - Today's Mission & AI Insight */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 
 {/* Today's Mission widget (from Planner) */}
 <GlassCard className="p-6 border-l-4 border-l-cyan">
 <div className="flex justify-between items-center mb-6">
 <h2 className="font-display font-bold text-xl text-white flex items-center gap-2">
 <Target className="text-cyan" /> Today's Mission
 </h2>
 <button onClick={() => navigate('/planner')} className="text-xs text-text-secondary hover:text-cyan transition-colors">View Planner</button>
 </div>
 
 <div className="space-y-3">
 {[
 { text: 'Solve 20 Kinematics PYQs', sub: 'Physics • 45 mins' },
 { text: 'Revise Thermodynamics Notes', sub: 'Chemistry • 30 mins' }
 ].map((task, i) => (
 <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-glass-fill border border-glass-border group hover:border-cyan/30 transition-colors cursor-pointer">
 <div className="w-5 h-5 rounded-md border border-glass-border group-hover:border-cyan" />
 <div>
 <p className="text-sm font-bold text-white">{task.text}</p>
 <p className="text-xs text-text-secondary">{task.sub}</p>
 </div>
 </div>
 ))}
 </div>
 </GlassCard>

 {/* Arya's Insight */}
 <GlassCard className="p-6">
 <h2 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
 <Brain className="text-amber" /> Arya's Insight
 </h2>
 <div className="p-4 rounded-xl bg-amber/10 border border-amber/30 text-text-secondary leading-relaxed text-sm h-[132px]">
 "Your accuracy in <strong>Calculus</strong> has improved by 15% this week! However, you're spending too much time on <em>Integration by Parts</em>. Let's do a targeted 10-minute speed drill today to build muscle memory."
 </div>
 </GlassCard>

 </div>

 {/* Bottom Section - Subjects Overview */}
 <h2 className="font-display font-bold text-2xl text-white pt-4 mb-4">Your Subjects</h2>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
 {[
 { name: 'Physics', progress: 35, color: '#00A8E8' },
 { name: 'Chemistry', progress: 42, color: '#D4A373' },
 { name: 'Mathematics', progress: 18, color: '#8D99AE' }
 ].map(sub => (
 <GlassCard key={sub.name} className="p-5 flex items-center gap-5 cursor-pointer hover:-translate-y-1 transition-transform group" onClick={() => navigate('/subjects/' + sub.name.toLowerCase())}>
 <ProgressRing progress={sub.progress} size={60} strokeWidth={5} color={sub.color}>
 <span className="text-[10px] font-bold font-mono text-white">{sub.progress}%</span>
 </ProgressRing>
 <div>
 <h3 className="font-display font-bold text-lg text-white group-hover:text-cyan transition-colors">{sub.name}</h3>
 <p className="text-xs text-text-secondary mt-1 uppercase tracking-wider font-mono">View Syllabus <ChevronRight size={12} className="inline"/></p>
 </div>
 </GlassCard>
 ))}
 </div>
 </div>
 );
}
