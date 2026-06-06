import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Clock, Brain, AlertTriangle } from 'lucide-react';

const accuracyData = [
 { name: 'Physics', score: 68 },
 { name: 'Chemistry', score: 82 },
 { name: 'Math', score: 54 },
];

export default function AnalyticsDashboard() {
 return (
 <div className="space-y-6 animate-fade-in-up pb-10">
 <div className="flex justify-between items-center mb-8">
 <h1 className="text-3xl font-display font-bold">Analytics Deep-Dive</h1>
 <div className="px-4 py-2 bg-indigo/10 text-indigo-light rounded-xl font-bold text-sm border border-indigo/20">
 Last 30 Days
 </div>
 </div>

 {/* Top Stats */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {[
 { icon: Target, label: 'Exam Readiness', val: '68%', col: 'text-indigo-light' },
 { icon: Brain, label: 'Questions Solved', val: '1,420', col: 'text-cyan' },
 { icon: Clock, label: 'Avg Time/Q', val: '1m 45s', col: 'text-amber' },
 { icon: AlertTriangle, label: 'Silly Mistakes', val: '12%', col: 'text-pink' },
 ].map((stat, i) => (
 <div key={i} className="glass-card p-6 flex flex-col justify-between">
 <div className="flex justify-between items-start mb-4">
 <span className="text-text-secondary text-sm font-semibold uppercase tracking-wider">{stat.label}</span>
 <stat.icon className={stat.col} size={20} />
 </div>
 <div className="text-3xl font-display font-bold text-white">{stat.val}</div>
 </div>
 ))}
 </div>

 {/* Charts Row */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
 <div className="glass-card p-6">
 <h3 className="text-lg font-bold mb-6">Subject Accuracy</h3>
 <div className="h-64">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={accuracyData}>
 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
 <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
 <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
 <Tooltip cursor={{fill: '#ffffff05'}} contentStyle={{backgroundColor: '#0C0C1E', borderColor: '#ffffff20', borderRadius: '12px'}} />
 <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={40} />
 </BarChart>
 </ResponsiveContainer>
 </div>
 </div>

 <div className="glass-card p-6">
 <h3 className="text-lg font-bold mb-6">AI Insights</h3>
 <div className="space-y-4">
 <div className="p-4 bg-amber/10 border border-amber/20 rounded-xl">
 <h4 className="font-bold text-amber mb-1 flex items-center gap-2"><AlertTriangle size={16}/> Warning: Calculus</h4>
 <p className="text-sm text-text-secondary leading-relaxed">Your accuracy in Integration dropped by 15% this week. We've added 10 remedial questions to your daily practice.</p>
 </div>
 <div className="p-4 bg-cyan/10 border border-cyan/20 rounded-xl">
 <h4 className="font-bold text-cyan mb-1 flex items-center gap-2"><Target size={16}/> On Track: Physics</h4>
 <p className="text-sm text-text-secondary leading-relaxed">You are solving Kinematics questions 30 seconds faster than last month. Excellent pacing.</p>
 </div>
 </div>
 </div>
 </div>

 </div>
 );
}
