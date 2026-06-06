import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageSquare, Calendar, Trophy, Users } from 'lucide-react';

export default function GroupHub() {
 const { groupId } = useParams();

 return (
 <div className="space-y-6 animate-fade-in-up pb-10">
 <Link to="/groups" className="text-text-muted hover:text-white text-sm font-semibold mb-4 inline-block">&larr; Back to Groups</Link>
 
 <div className="glass-card p-8 bg-gradient-to-br from-indigo/5 to-cyan/5 border-indigo/20">
 <div className="flex justify-between items-start">
 <div>
 <div className="flex gap-2 mb-3">
 <span className="text-xs font-bold px-2 py-1 rounded bg-indigo/10 text-indigo-light border border-indigo/20">JEE Main</span>
 <span className="text-xs font-bold px-2 py-1 rounded bg-glass-fill border border-glass-border"><Users size={12} className="inline mr-1" /> 124</span>
 </div>
 <h1 className="text-3xl font-display font-bold mb-2">JEE 2026 Droppers 🚀</h1>
 <p className="text-text-secondary">Dedicated group for 2026 JEE Droppers. Daily targets and weekly mock analysis.</p>
 </div>
 <button className="btn-primary">Leave Group</button>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
 <div className="lg:col-span-2 glass-card p-6 h-[500px] flex flex-col">
 <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><MessageSquare size={18} /> Discussion Board</h3>
 <div className="flex-1 bg-glass-fill border border-glass-border rounded-xl p-4 flex flex-col justify-end text-sm text-text-muted">
 <div className="text-center pb-4">No recent messages. Start the discussion!</div>
 </div>
 <div className="mt-4 flex gap-2">
 <input type="text" placeholder="Type a message or share a doubt..." className="flex-1 bg-glass-fill border border-glass-border rounded-xl px-4 focus:border-indigo outline-none" />
 <button className="btn-primary px-6">Send</button>
 </div>
 </div>

 <div className="space-y-6">
 <div className="glass-card p-6">
 <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Calendar size={18} /> Upcoming Events</h3>
 <div className="space-y-3">
 <div className="p-3 bg-glass-fill rounded-lg border border-glass-border">
 <div className="text-sm font-bold text-white">Full Syllabus Mock</div>
 <div className="text-xs text-text-muted mt-1">Sunday, 10:00 AM</div>
 </div>
 <div className="p-3 bg-glass-fill rounded-lg border border-glass-border">
 <div className="text-sm font-bold text-white">Physics Doubt Clearing</div>
 <div className="text-xs text-text-muted mt-1">Wednesday, 7:00 PM</div>
 </div>
 </div>
 </div>

 <div className="glass-card p-6">
 <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Trophy size={18} /> Group Leaderboard</h3>
 <div className="space-y-3">
 {['Rohan Kumar', 'Aisha Patel', 'Vikram Singh'].map((name, i) => (
 <div key={i} className="flex justify-between items-center p-2 border-b border-glass-border last:border-0">
 <div className="flex items-center gap-3">
 <span className={`text-sm font-bold ${i === 0 ? 'text-amber' : i === 1 ? 'text-text-secondary' : 'text-amber/70'}`}>#{i+1}</span>
 <span className="text-sm text-white">{name}</span>
 </div>
 <span className="text-xs text-text-muted">{1500 - (i*120)} XP</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}
