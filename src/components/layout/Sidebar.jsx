import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useLayoutStore } from '../../store/layoutStore';
import {
 Home, Bot, BookOpen, Brain, LogOut, Settings as SettingsIcon,
 Layers, Target, FileText, Calculator, CalendarDays,
 Trophy, Zap, Network, GitBranch, X, GraduationCap,
 Users, BarChart2, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_SECTIONS = [
 {
 label: 'LEARN',
 items: [
 { icon: Home, label: 'Dashboard', path: '/dashboard' },
 { icon: Bot, label: 'AI Tutor', path: '/tutor' },
 { icon: BookOpen, label: 'Subjects', path: '/subjects' },
 { icon: Layers, label: 'Flashcards', path: '/flashcards' },
 ],
 },
 {
 label: 'ASSESS',
 items: [
 { icon: Target, label: 'Practice', path: '/practice' },
 { icon: Brain, label: 'Mock Tests', path: '/mock-test' },
 { icon: FileText, label: 'PYQ Bank', path: '/pyq' },
 ],
 },
 {
 label: 'PLAN',
 items: [
 { icon: CalendarDays, label: 'Study Plan', path: '/planner' },
 { icon: FileText, label: 'Notes', path: '/notes' },
 { icon: Calculator, label: 'Formula Vault', path: '/formulas' },
 ],
 },
 {
 label: 'MORE',
 items: [
 { icon: GraduationCap, label: 'Degree Hub', path: '/degree' },
 { icon: BarChart2, label: 'Analytics', path: '/analytics' },
 { icon: Users, label: 'Study Groups', path: '/groups' },
 { icon: Zap, label: 'Feynman Mode', path: '/feynman' },
 { icon: Network, label: 'Knowledge Graph', path: '/knowledge-graph' },
 ],
 },
];

export default function Sidebar() {
 const { signOut } = useAuthStore();
 const { sidebarOpen, closeSidebar } = useLayoutStore();
 const location = useLocation();

 return (
 <>
 {/* Mobile Backdrop */}
 <AnimatePresence>
 {sidebarOpen && (
 <motion.div
 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
 onClick={closeSidebar}
 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
 />
 )}
 </AnimatePresence>

 <aside
 className={`fixed top-0 left-0 h-screen w-[280px] bg-bg-surface/80 lg:bg-bg-primary/95 backdrop-blur-2xl border-r border-glass-border z-50 flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-[0_4px_30px_rgba(0,0,0,0.5)] lg:shadow-none`}
 >
 <div className="h-[70px] flex items-center justify-between px-6 shrink-0 border-b border-glass-border">
 <div className="flex items-center gap-2">
 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo to-cyan flex items-center justify-center text-white">✦</div>
 <span className="font-display text-2xl font-bold text-white ml-1">EduMesh</span>
 <span className="px-2 py-0.5 rounded-full bg-indigo/20 text-indigo-light text-[10px] font-bold border border-indigo/30">v2.5</span>
 </div>
 <button onClick={closeSidebar} className="lg:hidden p-2 text-text-secondary hover:text-white hover:bg-glass-hover rounded-lg">
 <X size={20} />
 </button>
 </div>

 <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 hide-scrollbar">
 {NAV_SECTIONS.map((section, idx) => (
 <div key={idx}>
 <h3 className="px-3 mb-3 text-[11px] font-bold text-text-muted tracking-widest uppercase">{section.label}</h3>
 <nav className="space-y-1">
 {section.items.map((item) => {
 const isActive = location.pathname.startsWith(item.path);
 return (
 <NavLink
 key={item.path}
 to={item.path}
 onClick={() => window.innerWidth < 1024 && closeSidebar()}
 className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
 isActive ? 'text-white' : 'text-text-secondary hover:text-white hover:bg-glass-hover'
 }`}
 >
 {isActive && (
 <motion.div layoutId="sidebar-active" className="absolute inset-0 bg-indigo/10 border border-indigo/20 rounded-xl" />
 )}
 <item.icon size={20} className={`relative z-10 transition-colors ${isActive ? 'text-indigo-light' : 'text-text-muted group-hover:text-indigo-light'}`} />
 <span className="relative z-10">{item.label}</span>
 </NavLink>
 );
 })}
 </nav>
 </div>
 ))}
 </div>

 <div className="p-4 border-t border-glass-border bg-bg-primary/50 backdrop-blur-md">
 <NavLink to="/profile" onClick={() => window.innerWidth < 1024 && closeSidebar()} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:text-white hover:bg-glass-hover transition-colors mb-1">
 <User size={20} className="text-text-muted" /> Profile
 </NavLink>
 <NavLink to="/settings" onClick={() => window.innerWidth < 1024 && closeSidebar()} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:text-white hover:bg-glass-hover transition-colors mb-2">
 <SettingsIcon size={20} className="text-text-muted" /> Settings
 </NavLink>
 <button onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-pink hover:bg-pink/10 transition-colors">
 <LogOut size={20} /> Logout
 </button>
 </div>
 </aside>
 </>
 );
}
