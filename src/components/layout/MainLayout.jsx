import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';
import BottomTabBar from './BottomTabBar';

export default function MainLayout({ children }) {
 const location = useLocation();

 return (
 <div className="min-h-screen flex flex-col font-body bg-bg-primary text-white selection:bg-indigo/30 selection:text-white">
 {/* AppHeader (now sits to the right of the sidebar on desktop) */}
 <AppHeader />

 {/* Fixed Sidebar */}
 <Sidebar />

 {/* Main Content Area */}
 <main className="flex-1 min-w-0 lg:ml-[280px] pt-[70px] pb-[72px] lg:pb-0 flex flex-col h-screen">
 <AnimatePresence mode="wait">
 <motion.div
 key={location.pathname}
 initial={{ opacity: 0, y: 16 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -16 }}
 transition={{ duration: 0.2, ease: 'easeOut' }}
 className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 flex flex-col"
 >
 {children}
 </motion.div>
 </AnimatePresence>
 </main>

 {/* Bottom Nav for mobile */}
 <BottomTabBar />
 </div>
 );
}
