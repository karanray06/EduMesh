import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Lock, Target } from 'lucide-react';

const GROUPS = [
 { id: '1', name: 'JEE 2026 Droppers 🚀', members: 124, type: 'Public', topic: 'JEE Main' },
 { id: '2', name: 'NEET Bio Sprinters', members: 89, type: 'Public', topic: 'NEET' },
 { id: '3', name: 'School Friends', members: 4, type: 'Private', topic: 'Class 12 Boards' },
];

export default function GroupsHome() {
 return (
 <div className="space-y-6 animate-fade-in-up pb-10">
 <div className="flex justify-between items-center mb-8">
 <div>
 <h1 className="text-3xl font-display font-bold mb-2">Study Groups</h1>
 <p className="text-text-secondary">Join forces, compete in live mock battles, and share notes.</p>
 </div>
 <button className="btn-primary">Create Group</button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {GROUPS.map((group) => (
 <div key={group.id} className="glass-card p-6 flex flex-col justify-between group cursor-pointer hover:border-indigo">
 <div>
 <div className="flex justify-between items-start mb-4">
 <span className="text-xs font-bold px-2 py-1 rounded bg-glass-fill border border-glass-border flex items-center gap-1">
 {group.type === 'Private' ? <Lock size={12} className="text-amber" /> : <Users size={12} className="text-cyan" />}
 {group.type}
 </span>
 <span className="text-xs font-bold px-2 py-1 rounded bg-indigo/10 text-indigo-light border border-indigo/20">
 {group.topic}
 </span>
 </div>
 <h3 className="text-xl font-bold mb-2">{group.name}</h3>
 <p className="text-sm text-text-secondary mb-6 flex items-center gap-2">
 <Users size={16} /> {group.members} Members
 </p>
 </div>
 <Link to={`/groups/${group.id}`} className="btn-ghost w-full text-center py-2">
 Enter Group
 </Link>
 </div>
 ))}
 </div>
 </div>
 );
}
