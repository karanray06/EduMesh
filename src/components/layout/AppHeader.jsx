import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { useLayoutStore } from '../../store/layoutStore';
import { useGamificationStore } from '../../features/gamification/GamificationStore';
import { Menu, ChevronRight } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const ROUTE_LABELS = {
 '/dashboard': 'Dashboard',
 '/tutor': 'Arya AI Tutor',
 '/subjects': 'Subjects',
 '/practice': 'Adaptive Practice',
 '/mock-test': 'Mock Tests',
 '/pyq': 'PYQ Bank',
 '/planner': 'Study Planner',
 '/notes': 'Smart Notes',
 '/formulas': 'Formula Vault',
 '/degree': 'Degree Hub',
};

export default function AppHeader() {
 const { user } = useAuthStore();
 const { toggleSidebar } = useLayoutStore();
 const { streakDays, totalXP, currentTier, tierProgress } = useGamificationStore();
 const location = useLocation();
 const displayName = user?.display_name || user?.email?.split('@')[0] || 'Student';
 const initials = displayName.charAt(0).toUpperCase();

 const currentLabel = ROUTE_LABELS[location.pathname] || 'EduMesh';
 const daysToExam = 138;

 return (
 <header className="fixed top-0 left-0 lg:left-[280px] right-0 h-[70px] z-40 bg-bg-surface/80 backdrop-blur-xl border-b border-glass-border shadow-sm flex items-center justify-between px-4 sm:px-8">
 
 <div className="flex items-center gap-3">
 <button onClick={toggleSidebar} className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-white hover:bg-glass-hover rounded-lg transition-colors">
 <Menu size={24} />
 </button>
 <div className="flex items-center gap-2 text-sm font-semibold text-text-secondary hidden sm:flex lg:hidden">
 <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo to-cyan flex items-center justify-center text-xs text-white">✦</div>
 <span className="font-display text-lg text-white ml-1">EduMesh</span>
 <ChevronRight size={14} className="text-indigo-light mx-1" />
 </div>
 <div className="hidden lg:flex font-display font-bold text-white text-xl">
 {currentLabel}
 </div>
 <div className="sm:hidden font-display font-bold text-white">
 {currentLabel}
 </div>
 </div>

 <div className="flex items-center gap-4 sm:gap-6">
 
 {/* Exam Countdown */}
 {daysToExam && (
 <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber/10 border border-amber/30 rounded-2xl text-xs font-bold text-amber">
 Target: {daysToExam}d
 </div>
 )}

 {/* Streak */}
 <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-2xl ${streakDays >= 7 ? 'bg-amber/20 border border-amber/40 text-amber' : 'bg-glass-fill border border-glass-border text-white'}`}>
 <span className={streakDays >= 7 ? 'animate-pulse' : ''}>🔥</span>
 <span className="font-bold text-sm font-mono">{streakDays}</span>
 </div>

 {/* XP bar */}
 <div className="hidden sm:flex items-center gap-2 min-w-[120px]" title={`${currentTier.name} Tier`}>
 <span className="text-[10px] font-bold font-mono tracking-wider" style={{ color: currentTier.color }}>XP</span>
 <div className="flex-1 h-2 bg-glass-fill rounded-full overflow-hidden border border-glass-border">
 <div
 className="h-full rounded-full transition-all duration-700"
 style={{ width: `${tierProgress}%`, backgroundColor: currentTier.color }}
 />
 </div>
 <span className="text-[10px] text-text-muted font-mono">{totalXP}</span>
 </div>

 {/* Avatar */}
 <Link to="/settings" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
 <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-indigo to-violet p-[2px] shadow-sm">
 <div className="w-full h-full rounded-[12px] bg-bg-surface flex items-center justify-center overflow-hidden">
 {user?.avatar_url ? (
 <img src={user.avatar_url} alt="Profile" className="w-full h-full object-cover" />
 ) : (
 <span className="text-text-accent font-display font-bold">{initials}</span>
 )}
 </div>
 </div>
 </Link>
 </div>
 </header>
 );
}
