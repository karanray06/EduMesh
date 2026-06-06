import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const COURSES = [
 { id: 'jee', title: 'JEE (Main & Advanced)', desc: 'Complete Physics, Chemistry, Math from 11th-12th standard with mock tests and previous year questions.', tags: ['Class 11', 'Class 12', 'Dropper'], color: 'indigo' },
 { id: 'neet', title: 'NEET (UG)', desc: 'In-depth Biology, Physics, and Chemistry mapped to NCERT with specialized memory tools.', tags: ['Class 11', 'Class 12', 'Dropper'], color: 'cyan' },
 { id: 'foundation', title: 'Foundation (Class 6-10)', desc: 'Build the strongest base for competitive exams early. Math and Science taught visually.', tags: ['CBSE', 'ICSE', 'State Board'], color: 'amber' },
 { id: 'btech', title: 'B.Tech / Engineering', desc: 'Computer Science fundamentals, OS, DBMS, Networks, and Data Structures for placements.', tags: ['Semester Exams', 'Placements', 'GATE'], color: 'pink' }
];

export default function Courses() {
 return (
 <div className="min-h-screen bg-bg-primary text-white pt-[70px] pb-24">
 <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16">
 
 <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
 <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
 Pick your track
 </h1>
 <p className="text-text-secondary text-lg">
 One subscription unlocks every track. Seamlessly transition from 10th grade to JEE, to your CS Degree.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {COURSES.map((course, i) => (
 <div key={course.id} className={`glass-card p-8 animate-fade-in-up d${(i%4)+1} flex flex-col justify-between group cursor-pointer hover:border-${course.color}`}>
 <div>
 <div className="flex gap-2 mb-4 flex-wrap">
 {course.tags.map(t => (
 <span key={t} className={`text-xs font-bold px-3 py-1 rounded-full bg-${course.color}/10 text-${course.color} border border-${course.color}/20`}>
 {t}
 </span>
 ))}
 </div>
 <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-white transition-colors">{course.title}</h3>
 <p className="text-text-secondary text-sm leading-relaxed mb-8">{course.desc}</p>
 </div>
 <Link to="/onboarding/step1" className={`flex items-center gap-2 text-sm font-bold text-${course.color} hover:underline`}>
 Start Learning <ChevronRight size={16} />
 </Link>
 </div>
 ))}
 </div>

 </div>
 </div>
 );
}
