import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { LogOut, Settings, Award, Flame } from 'lucide-react';

export default function ProfilePage() {
 const { user, signOut } = useAuthStore();

 return (
 <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-10">
 
 <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
 
 <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo to-cyan p-1">
 <div className="w-full h-full bg-bg-surface rounded-full flex items-center justify-center text-4xl font-display font-bold">
 {user?.display_name?.charAt(0) || 'U'}
 </div>
 </div>

 <div className="flex-1">
 <h1 className="text-3xl font-display font-bold mb-2">{user?.display_name || 'Student Name'}</h1>
 <p className="text-text-secondary mb-4">{user?.email}</p>
 
 <div className="flex flex-wrap gap-4 justify-center md:justify-start">
 <div className="flex items-center gap-2 px-4 py-2 bg-amber/10 border border-amber/20 text-amber rounded-full text-sm font-bold">
 <Flame size={16} /> 12 Day Streak
 </div>
 <div className="flex items-center gap-2 px-4 py-2 bg-indigo/10 border border-indigo/20 text-indigo-light rounded-full text-sm font-bold">
 <Award size={16} /> Level 8 Scholar
 </div>
 </div>
 </div>

 <div className="flex flex-col gap-3 w-full md:w-auto">
 <button className="btn-ghost flex items-center justify-center gap-2 w-full"><Settings size={18} /> Edit Profile</button>
 <button onClick={signOut} className="px-6 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 font-bold transition-colors flex items-center justify-center gap-2 w-full">
 <LogOut size={18} /> Logout
 </button>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="glass-card p-6">
 <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Award size={18} className="text-cyan"/> Badges Earned</h3>
 <div className="grid grid-cols-3 gap-4">
 {[1,2,3,4,5].map(i => (
 <div key={i} className="aspect-square bg-glass-fill border border-glass-border rounded-xl flex items-center justify-center text-3xl opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
 🎖️
 </div>
 ))}
 </div>
 </div>

 <div className="glass-card p-6">
 <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Flame size={18} className="text-amber"/> Activity Heatmap</h3>
 <div className="bg-glass-fill border border-glass-border rounded-xl h-40 flex items-center justify-center text-text-muted text-sm">
 GitHub style contribution graph goes here
 </div>
 </div>
 </div>

 </div>
 );
}
