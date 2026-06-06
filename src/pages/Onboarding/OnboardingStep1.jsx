import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { BookOpen, GraduationCap, Code, Microscope, Target } from 'lucide-react';

const EXAM_TARGETS = [
 { id: 'jee_main', label: 'JEE Main', icon: Target, color: 'text-indigo-light', bg: 'bg-indigo/10', border: 'border-indigo/30' },
 { id: 'jee_adv', label: 'JEE Advanced', icon: Target, color: 'text-violet', bg: 'bg-violet/10', border: 'border-violet/30' },
 { id: 'neet', label: 'NEET', icon: Microscope, color: 'text-cyan', bg: 'bg-cyan/10', border: 'border-cyan/30' },
 { id: 'class_6_10', label: 'Class 6–10', icon: BookOpen, color: 'text-amber', bg: 'bg-amber/10', border: 'border-amber/30' },
 { id: 'class_11_12', label: 'Class 11–12', icon: BookOpen, color: 'text-pink', bg: 'bg-pink/10', border: 'border-pink/30' },
 { id: 'btech', label: 'B.Tech', icon: Code, color: 'text-green', bg: 'bg-green/10', border: 'border-green/30' },
 { id: 'bca', label: 'BCA', icon: Code, color: 'text-green', bg: 'bg-green/10', border: 'border-green/30' },
 { id: 'bsc', label: 'BSc', icon: GraduationCap, color: 'text-indigo-light', bg: 'bg-indigo/10', border: 'border-indigo/30' },
];

export default function OnboardingStep1() {
 const navigate = useNavigate();
 const { studentProfile, updateStudentProfile } = useAuthStore();

 const handleSelect = (id) => {
 updateStudentProfile({ examTarget: id });
 };

 const handleNext = () => {
 if (studentProfile.examTarget) {
 navigate('/onboarding/step2');
 }
 };

 return (
 <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 relative overflow-hidden">
 {/* Background Glow */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo/10 rounded-full blur-[120px] pointer-events-none" />

 <div className="w-full max-w-2xl relative z-10 animate-fade-in-up">
 <div className="text-center mb-10">
 <div className="text-indigo-light font-bold tracking-widest text-sm mb-4 uppercase">Step 1 of 4</div>
 <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">What's your goal?</h1>
 <p className="text-text-secondary text-lg">Select your target exam or class so we can map out your syllabus.</p>
 </div>

 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
 {EXAM_TARGETS.map((target) => {
 const isSelected = studentProfile.examTarget === target.id;
 const Icon = target.icon;
 return (
 <button
 key={target.id}
 onClick={() => handleSelect(target.id)}
 className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 ${
 isSelected 
 ? `bg-glass-fill border-indigo shadow-glow-indigo transform -translate-y-1` 
 : `bg-glass-fill border-glass-border hover:bg-glass-hover hover:border-text-text-secondary`
 }`}
 >
 <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${target.bg} ${target.border} border`}>
 <Icon className={target.color} size={24} />
 </div>
 <span className={`font-semibold ${isSelected ? 'text-white' : 'text-text-secondary'}`}>
 {target.label}
 </span>
 </button>
 );
 })}
 </div>

 <div className="flex justify-between items-center">
 <div className="flex gap-2">
 <div className="w-8 h-2 rounded-full bg-indigo"></div>
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 </div>
 <button
 onClick={handleNext}
 disabled={!studentProfile.examTarget}
 className={`btn-primary px-8 py-3 ${!studentProfile.examTarget ? 'opacity-50 cursor-not-allowed' : ''}`}
 >
 Continue &rarr;
 </button>
 </div>
 </div>
 </div>
 );
}
