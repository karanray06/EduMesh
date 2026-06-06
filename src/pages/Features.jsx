import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Target, Compass, BarChart2 } from 'lucide-react';

export default function Features() {
 return (
 <div className="min-h-screen bg-bg-primary text-white pt-[70px] pb-24">
 <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16">
 
 {/* Header */}
 <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
 <div className="text-indigo-light font-bold tracking-widest text-sm mb-4 uppercase">Features</div>
 <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
 The intelligent engine behind your success
 </h1>
 <p className="text-text-secondary text-lg">
 EduMesh replaces scattered PDFs, generic video lectures, and expensive private tutors with a unified, AI-driven learning OS.
 </p>
 </div>

 {/* Feature Grid */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 
 <div className="glass-card p-10 animate-fade-in-up d1 relative overflow-hidden group">
 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-indigo/20 transition-colors" />
 <Brain size={48} className="text-indigo-light mb-6" />
 <h3 className="text-2xl font-display font-bold mb-4">Arya AI Tutor</h3>
 <p className="text-text-secondary leading-relaxed mb-6">
 Available 24/7. Arya doesn't just give you the answer. She asks probing questions, uses analogies tailored to your interests, and breaks down complex calculus or physics concepts step-by-step.
 </p>
 <ul className="space-y-3 text-sm text-text-muted">
 <li className="flex items-center gap-2"><span className="text-indigo">✦</span> Solves image doubts instantly</li>
 <li className="flex items-center gap-2"><span className="text-indigo">✦</span> Hinglish & regional language support</li>
 <li className="flex items-center gap-2"><span className="text-indigo">✦</span> Feynman technique emulation</li>
 </ul>
 </div>

 <div className="glass-card p-10 animate-fade-in-up d2 relative overflow-hidden group">
 <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-cyan/20 transition-colors" />
 <Target size={48} className="text-cyan mb-6" />
 <h3 className="text-2xl font-display font-bold mb-4">Adaptive Practice</h3>
 <p className="text-text-secondary leading-relaxed mb-6">
 Our spaced repetition engine maps every chapter to your proficiency. If you're weak in Rotational Mechanics, the engine will gently increase difficulty day-by-day until you master it.
 </p>
 <ul className="space-y-3 text-sm text-text-muted">
 <li className="flex items-center gap-2"><span className="text-cyan">✦</span> Infinite AI-generated variations</li>
 <li className="flex items-center gap-2"><span className="text-cyan">✦</span> Automated weakness targeting</li>
 <li className="flex items-center gap-2"><span className="text-cyan">✦</span> Real-time accuracy metrics</li>
 </ul>
 </div>

 <div className="glass-card p-10 animate-fade-in-up d3 relative overflow-hidden group">
 <div className="absolute top-0 right-0 w-64 h-64 bg-amber/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-amber/20 transition-colors" />
 <Compass size={48} className="text-amber mb-6" />
 <h3 className="text-2xl font-display font-bold mb-4">PYQ Intelligence</h3>
 <p className="text-text-secondary leading-relaxed mb-6">
 Every JEE and NEET question from the last 20 years, meticulously tagged by AI. Understand exact weightages, repeated concept clusters, and probability maps for the upcoming exam.
 </p>
 <ul className="space-y-3 text-sm text-text-muted">
 <li className="flex items-center gap-2"><span className="text-amber">✦</span> 2000-2025 Database</li>
 <li className="flex items-center gap-2"><span className="text-amber">✦</span> Auto-generated pattern insights</li>
 <li className="flex items-center gap-2"><span className="text-amber">✦</span> Generate "predicted papers"</li>
 </ul>
 </div>

 <div className="glass-card p-10 animate-fade-in-up d4 relative overflow-hidden group">
 <div className="absolute top-0 right-0 w-64 h-64 bg-pink/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-pink/20 transition-colors" />
 <BarChart2 size={48} className="text-pink mb-6" />
 <h3 className="text-2xl font-display font-bold mb-4">Mock Battle Mode</h3>
 <p className="text-text-secondary leading-relaxed mb-6">
 Experience the real NTA interface before exam day. Post-test, our AI deep-dives into your performance: identifying silly mistakes, time-wasting questions, and optimal attempt strategies.
 </p>
 <ul className="space-y-3 text-sm text-text-muted">
 <li className="flex items-center gap-2"><span className="text-pink">✦</span> Live Rank Predictor</li>
 <li className="flex items-center gap-2"><span className="text-pink">✦</span> Time-management heatmaps</li>
 <li className="flex items-center gap-2"><span className="text-pink">✦</span> Subject-wise recovery plans</li>
 </ul>
 </div>
 
 </div>

 <div className="mt-20 text-center animate-fade-in-up d4">
 <Link to="/onboarding/step1" className="btn-primary px-10 py-4 text-lg">
 Experience the Engine &rarr;
 </Link>
 </div>

 </div>
 </div>
 );
}
