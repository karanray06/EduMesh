import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { SYLLABUS, MOCK_PROGRESS } from '../../data/syllabus';
import { GlassCard } from '../../components/ui/GlassCard';
import { ProgressRing } from '../../components/ui/ProgressRing';

const SUBJECT_COLORS = {
 Physics: '#00A8E8',
 Chemistry: '#D4A373',
 Mathematics: '#8D99AE',
};

export default function SubjectList() {
 const { user } = useAuthStore();
 const targetExam = 'JEE'; // Hardcoded for now
 
 const subjects = Object.keys(SYLLABUS[targetExam]).map(sub => {
 const chapters = SYLLABUS[targetExam][sub];
 let totalTopics = 0;
 let completedTopics = 0;
 
 chapters.forEach(ch => {
 totalTopics += ch.totalTopics;
 if (MOCK_PROGRESS[ch.id]) {
 completedTopics += MOCK_PROGRESS[ch.id].completed;
 }
 });

 return {
 name: sub,
 chapterCount: chapters.length,
 completion: totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0,
 accuracy: 76, // Mock overall accuracy
 color: SUBJECT_COLORS[sub]
 };
 });

 return (
 <div className="space-y-8 animate-fade-in-up">
 <header className="flex flex-col gap-2">
 <h1 className="display-heading text-3xl">Your Subjects</h1>
 <p className="text-text-secondary text-sm">
 {user?.display_name || 'Student'}, you've covered about <strong className="text-white">15%</strong> of the {targetExam} syllabus. Keep going!
 </p>
 </header>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {subjects.map(subject => (
 <Link key={subject.name} to={`/subjects/${subject.name.toLowerCase()}`} className="block group">
 <GlassCard className="relative overflow-hidden h-full flex flex-col p-6">
 {/* Top Accent Strip */}
 <div 
 className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
 style={{ backgroundColor: subject.color }}
 />
 
 <div className="flex justify-between items-start mb-6 mt-2">
 <div>
 <h2 className="font-display font-bold text-2xl text-white mb-1">{subject.name}</h2>
 <span className="text-xs font-mono text-text-secondary uppercase tracking-wider">{subject.chapterCount} Chapters</span>
 </div>
 
 <ProgressRing 
 progress={subject.completion} 
 size={56} 
 strokeWidth={5} 
 color={subject.color}
 >
 <span className="text-xs font-bold font-mono text-white">{subject.completion}%</span>
 </ProgressRing>
 </div>

 <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-glass-border">
 <div>
 <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Avg Accuracy</div>
 <div className="text-lg font-bold text-white">{subject.accuracy}%</div>
 </div>
 <div>
 <div className="text-[10px] text-text-secondary uppercase tracking-wider mb-1">Last Studied</div>
 <div className="text-sm font-medium text-text-muted mt-0.5">2 days ago</div>
 </div>
 </div>
 </GlassCard>
 </Link>
 ))}
 </div>
 </div>
 );
}
