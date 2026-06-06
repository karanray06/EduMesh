import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Sparkles, Brain, ArrowRight } from 'lucide-react';

export default function OnboardingStep4() {
 const navigate = useNavigate();
 const { studentProfile, completeOnboarding } = useAuthStore();
 const [isProcessing, setIsProcessing] = useState(false);

 const handleComplete = () => {
 setIsProcessing(true);
 // Simulate AI setting up the study plan
 setTimeout(() => {
 completeOnboarding();
 navigate('/dashboard');
 }, 1500);
 };

 return (
 <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 relative overflow-hidden">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/10 rounded-full blur-[120px] pointer-events-none" />

 <div className="w-full max-w-2xl relative z-10 animate-fade-in-up">
 <button onClick={() => !isProcessing && navigate(-1)} className="text-text-muted hover:text-white mb-8 flex items-center gap-2 text-sm font-semibold transition-colors disabled:opacity-50">
 &larr; Back
 </button>

 <div className="text-center mb-10">
 <div className="text-amber font-bold tracking-widest text-sm mb-4 uppercase">Step 4 of 4</div>
 <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">You're all set!</h1>
 <p className="text-text-secondary text-lg">Arya is building your personalized learning OS.</p>
 </div>

 <div className="glass-card p-8 mb-12 max-w-md mx-auto relative overflow-hidden">
 <div className="absolute -top-10 -right-10 text-amber/10">
 <Brain size={120} />
 </div>
 
 <div className="relative z-10">
 <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
 <Sparkles className="text-amber" size={20} /> Profile Summary
 </h3>
 
 <div className="space-y-4">
 <div className="flex justify-between items-center border-b border-glass-border pb-3">
 <span className="text-text-muted text-sm">Target</span>
 <span className="font-bold text-white uppercase">{studentProfile.examTarget?.replace('_', ' ')}</span>
 </div>
 <div className="flex justify-between items-center border-b border-glass-border pb-3">
 <span className="text-text-muted text-sm">Subjects</span>
 <span className="font-bold text-white capitalize">{studentProfile.subjects?.length || 0} selected</span>
 </div>
 <div className="flex justify-between items-center border-b border-glass-border pb-3">
 <span className="text-text-muted text-sm">Commitment</span>
 <span className="font-bold text-white">{studentProfile.dailyHours} hrs/day</span>
 </div>
 <div className="flex justify-between items-center">
 <span className="text-text-muted text-sm">Exam Date</span>
 <span className="font-bold text-white">{studentProfile.examDate || 'Not set'}</span>
 </div>
 </div>
 </div>
 </div>

 <div className="flex justify-between items-center">
 <div className="flex gap-2">
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 <div className="w-8 h-2 rounded-full bg-amber"></div>
 </div>
 <button
 onClick={handleComplete}
 disabled={isProcessing}
 className="btn-primary px-8 py-3 flex items-center gap-2"
 style={{ background: 'linear-gradient(135deg, #F59E0B, #4ADE80)' }}
 >
 {isProcessing ? 'Setting up workspace...' : 'Enter EduMesh'} <ArrowRight size={18} />
 </button>
 </div>
 </div>
 </div>
 );
}
