import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Target, CalendarDays, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const TABS = [
 { icon: Home, label: 'Home', path: '/dashboard' },
 { icon: Target, label: 'Practice', path: '/practice' },
 { icon: Brain, label: 'Mock Tests', path: '/mock-test' },
 { icon: CalendarDays, label: 'Plan', path: '/planner' },
];

export default function BottomTabBar() {
 const location = useLocation();

 return (
 <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-bg-surface/90 backdrop-blur-2xl border-t border-glass-border z-40 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.5)]">
 <div className="flex items-center justify-around h-full px-2">
 {TABS.map((tab) => {
 const isActive = location.pathname.startsWith(tab.path);
 return (
 <NavLink
 key={tab.path}
 to={tab.path}
 className={`relative flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
 isActive ? 'text-indigo-light' : 'text-text-muted hover:text-text-secondary'
 }`}
 >
 {isActive && (
 <motion.div
 layoutId="bottom-tab-active"
 className="absolute -top-1 w-12 h-1 bg-indigo-light rounded-b-full shadow-[0_0_8px_rgba(129,140,248,0.5)]"
 />
 )}
 <tab.icon size={22} className={isActive ? 'text-indigo-light' : 'text-text-muted'} />
 <span className="text-[10px] font-bold">{tab.label}</span>
 </NavLink>
 );
 })}
 </div>
 </div>
 );
}
