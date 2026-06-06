import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export default function OnboardingStep3() {
 const navigate = useNavigate();
 const { studentProfile, updateStudentProfile } = useAuthStore();
 
 const dailyHours = studentProfile.dailyHours || 2;
 const examDate = studentProfile.examDate || '';

 const handleNext = () => {
 if (dailyHours && examDate) {
 navigate('/onboarding/step4');
 }
 };

 return (
 <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 relative overflow-hidden">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet/10 rounded-full blur-[120px] pointer-events-none" />

 <div className="w-full max-w-2xl relative z-10 animate-fade-in-up">
 <button onClick={() => navigate(-1)} className="text-text-muted hover:text-white mb-8 flex items-center gap-2 text-sm font-semibold transition-colors">
 &larr; Back
 </button>

 <div className="text-center mb-10">
 <div className="text-violet font-bold tracking-widest text-sm mb-4 uppercase">Step 3 of 4</div>
 <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Set your pace</h1>
 <p className="text-text-secondary text-lg">Tell us your study hours and exam date to generate a personalized study plan.</p>
 </div>

 <div className="space-y-8 mb-12 max-w-md mx-auto">
 <div className="glass-card p-6">
 <label className="block text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">
 Daily Study Commitment
 </label>
 <div className="flex items-center gap-6">
 <input 
 type="range" 
 min="1" max="14" step="1" 
 value={dailyHours} 
 onChange={(e) => updateStudentProfile({ dailyHours: parseInt(e.target.value) })}
 className="w-full h-2 bg-glass-fill rounded-lg appearance-none cursor-pointer accent-violet"
 />
 <div className="text-3xl font-display font-bold text-white min-w-[3rem] text-center">
 {dailyHours}<span className="text-sm text-text-muted">h</span>
 </div>
 </div>
 </div>

 <div className="glass-card p-6">
 <label className="block text-sm font-bold text-text-secondary uppercase tracking-widest mb-4">
 Expected Exam Date
 </label>
 <input 
 type="month" 
 value={examDate}
 onChange={(e) => updateStudentProfile({ examDate: e.target.value })}
 className="w-full bg-glass-fill border border-glass-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet transition-colors color-scheme-dark"
 style={{ colorScheme: 'dark' }}
 />
 </div>
 </div>

 <div className="flex justify-between items-center">
 <div className="flex gap-2">
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 <div className="w-8 h-2 rounded-full bg-violet"></div>
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 </div>
 <button
 onClick={handleNext}
 disabled={!examDate}
 className={`btn-primary px-8 py-3 ${!examDate ? 'opacity-50 cursor-not-allowed' : ''}`}
 style={examDate ? { background: 'linear-gradient(135deg, #7C3AED, #F59E0B)' } : {}}
 >
 Continue &rarr;
 </button>
 </div>
 </div>
 </div>
 );
}
