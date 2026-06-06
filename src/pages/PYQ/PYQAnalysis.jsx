import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';

export default function PYQAnalysis() {
 return (
 <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-10">
 <div className="text-center mb-8">
 <h1 className="display-heading text-3xl mb-2">Trend Analysis</h1>
 <p className="text-text-secondary">AI-generated insights on JEE Main chapter weightage and repeating concepts.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <GlassCard className="p-6">
 <div className="flex items-center justify-between mb-6">
 <h3 className="font-display font-bold text-white text-xl">High Weightage Chapters</h3>
 <TrendingUp className="text-cyan" size={20} />
 </div>
 <div className="space-y-4">
 {[
 { name: 'Current Electricity', weight: 8.5 },
 { name: 'Modern Physics', weight: 7.2 },
 { name: 'Optics', weight: 6.8 }
 ].map(item => (
 <div key={item.name}>
 <div className="flex justify-between text-sm mb-1">
 <span className="text-white">{item.name}</span>
 <span className="text-cyan font-mono">{item.weight}%</span>
 </div>
 <div className="h-1.5 bg-glass-fill rounded-full overflow-hidden">
 <div className="h-full bg-cyan" style={{ width: `${item.weight * 10}%` }} />
 </div>
 </div>
 ))}
 </div>
 </GlassCard>

 <GlassCard className="p-6 border-l-4 border-l-gold">
 <h3 className="font-display font-bold text-white text-xl mb-4">Arya's Prediction</h3>
 <p className="text-text-secondary leading-relaxed">
 Based on the last 5 years of JEE Main papers, questions combining <strong className="text-white">Work, Energy & Power</strong> with <strong className="text-white">Circular Motion</strong> have appeared in 68% of shifts. Make sure you practice multi-concept problems involving conservation laws.
 </p>
 </GlassCard>
 </div>
 </div>
 );
}
