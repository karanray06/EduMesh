import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const SUBJECT_LIST = [
 { id: 'physics', label: 'Physics', color: '#06B6D4' },
 { id: 'chemistry', label: 'Chemistry', color: '#7C3AED' },
 { id: 'math', label: 'Mathematics', color: '#4F46E5' },
 { id: 'biology', label: 'Biology', color: '#10B981' },
 { id: 'cs', label: 'Computer Science', color: '#F59E0B' },
 { id: 'english', label: 'English', color: '#EC4899' },
 { id: 'social', label: 'Social Science', color: '#F97316' },
];

export default function OnboardingStep2() {
 const navigate = useNavigate();
 const { studentProfile, updateStudentProfile } = useAuthStore();
 const selectedSubjects = studentProfile.subjects || [];

 const toggleSubject = (id) => {
 if (selectedSubjects.includes(id)) {
 updateStudentProfile({ subjects: selectedSubjects.filter(s => s !== id) });
 } else {
 updateStudentProfile({ subjects: [...selectedSubjects, id] });
 }
 };

 const handleNext = () => {
 if (selectedSubjects.length > 0) {
 navigate('/onboarding/step3');
 }
 };

 return (
 <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 relative overflow-hidden">
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />

 <div className="w-full max-w-2xl relative z-10 animate-fade-in-up">
 <button onClick={() => navigate(-1)} className="text-text-muted hover:text-white mb-8 flex items-center gap-2 text-sm font-semibold transition-colors">
 &larr; Back
 </button>

 <div className="text-center mb-10">
 <div className="text-cyan font-bold tracking-widest text-sm mb-4 uppercase">Step 2 of 4</div>
 <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Choose your subjects</h1>
 <p className="text-text-secondary text-lg">Select all the subjects you are preparing for.</p>
 </div>

 <div className="flex flex-wrap gap-4 justify-center mb-12">
 {SUBJECT_LIST.map((subject) => {
 const isSelected = selectedSubjects.includes(subject.id);
 return (
 <button
 key={subject.id}
 onClick={() => toggleSubject(subject.id)}
 className={`px-6 py-3 rounded-full border text-sm font-bold transition-all duration-300 flex items-center gap-3 ${
 isSelected 
 ? `bg-glass-fill border-cyan shadow-glow-cyan text-white transform scale-105` 
 : `bg-glass-fill border-glass-border text-text-secondary hover:bg-glass-hover hover:border-text-text-secondary`
 }`}
 >
 <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: subject.color }}></div>
 {subject.label}
 </button>
 );
 })}
 </div>

 <div className="flex justify-between items-center">
 <div className="flex gap-2">
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 <div className="w-8 h-2 rounded-full bg-cyan"></div>
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 <div className="w-2 h-2 rounded-full bg-glass-border"></div>
 </div>
 <button
 onClick={handleNext}
 disabled={selectedSubjects.length === 0}
 className={`btn-primary px-8 py-3 ${selectedSubjects.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
 style={selectedSubjects.length > 0 ? { background: 'linear-gradient(135deg, #06B6D4, #4F46E5)' } : {}}
 >
 Continue &rarr;
 </button>
 </div>
 </div>
 </div>
 );
}
