import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
 User, Settings as SettingsIcon, MessageCircle, Shield,
 LogOut, Save, Key, Copy, CheckCircle2, ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { GlassCard } from '../components/ui/GlassCard';

const TabButton = ({ active, icon: Icon, label, onClick }) => (
 <button
 onClick={onClick}
 className={`flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 w-full ${
 active 
 ? 'bg-cyan/20 text-cyan border border-cyan/50' 
 : 'text-text-secondary hover:bg-glass-fill hover:text-white border border-transparent'
 }`}
 >
 <Icon size={18} />
 {label}
 </button>
);

export default function Settings() {
 const { user, signOut } = useAuthStore();
 const [activeTab, setActiveTab] = useState('account');
 const [copied, setCopied] = useState(false);
 const [apiKey, setApiKey] = useState('edumesh_sk_demo_9a8b7c6d5e4f3g2h1'); // Mock key for UI

 const handleCopy = () => {
 navigator.clipboard.writeText(apiKey);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };

 const regenerateKey = () => {
 setApiKey(`edumesh_sk_${Math.random().toString(36).substr(2, 16)}`);
 };

 return (
 <motion.div 
 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
 className="max-w-5xl mx-auto pb-10 space-y-10"
 >
 <header className="space-y-2">
 <h1 className="text-[2.2rem] font-bold font-display tracking-tight text-white">Settings</h1>
 <p className="text-sm font-semibold text-text-secondary uppercase tracking-widest">Configure your EduMesh experience</p>
 </header>

 <div className="grid lg:grid-cols-4 gap-8">
 {/* Sidebar Nav */}
 <div className="flex flex-col gap-2">
 <TabButton active={activeTab === 'account'} icon={User} label="Account" onClick={() => setActiveTab('account')} />
 <TabButton active={activeTab === 'preferences'} icon={SettingsIcon} label="Preferences" onClick={() => setActiveTab('preferences')} />
 <TabButton active={activeTab === 'openclaw'} icon={MessageCircle} label="OpenClaw Integration" onClick={() => setActiveTab('openclaw')} />
 <TabButton active={activeTab === 'security'} icon={Shield} label="Security" onClick={() => setActiveTab('security')} />
 </div>

 {/* Content Area */}
 <div className="lg:col-span-3">
 <AnimatePresence mode="wait">
 {activeTab === 'account' && (
 <motion.div key="account" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
 <GlassCard className="p-8 space-y-8">
 <div className="flex items-center gap-6">
 <img src={user?.avatar_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${user?.email || 'demo'}&backgroundColor=e5e5e5`} className="w-20 h-20 rounded-[28%] border-[2px] border-glass-border" alt="Avatar" />
 <div>
 <h2 className="text-xl font-bold text-white">{user?.display_name || user?.email?.split('@')[0] || 'Student'}</h2>
 <p className="text-sm font-medium text-text-secondary">{user?.email || 'demo@edumesh.local'}</p>
 </div>
 </div>

 <div className="space-y-3">
 <label className="text-[0.75rem] font-bold uppercase tracking-widest text-text-secondary ml-1">Display Name</label>
 <input 
 type="text" 
 defaultValue={user?.display_name || user?.email?.split('@')[0] || 'Student'}
 className="w-full bg-glass-fill border border-glass-border rounded-xl px-4 py-3 text-white outline-none focus:border-cyan transition-colors"
 />
 </div>

 <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-glass-border">
 <button className="w-full sm:w-auto bg-cyan text-bg-primary font-bold rounded-xl px-6 py-3 hover:bg-[#00bfff] transition-colors flex items-center justify-center gap-2">
 <Save size={18}/> Save Changes
 </button>
 <button onClick={signOut} className="w-full sm:w-auto border border-[rgba(239,68,68,0.3)] text-[#ef4444] rounded-xl px-6 py-3 hover:bg-[rgba(239,68,68,0.1)] transition-colors flex items-center justify-center gap-2">
 <LogOut size={18} /> Sign Out
 </button>
 </div>
 </GlassCard>
 </motion.div>
 )}

 {activeTab === 'openclaw' && (
 <motion.div key="openclaw" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
 <GlassCard className="p-8 space-y-6 border-t-4 border-t-[#25D366]">
 <div>
 <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
 <MessageCircle className="text-[#25D366]" /> WhatsApp / Telegram Bot
 </h2>
 <p className="text-sm text-text-secondary leading-relaxed">
 Connect EduMesh to your favorite messaging app using OpenClaw. You can chat with Arya, take quick quizzes, and check your study plan directly from your phone.
 </p>
 </div>

 <div className="p-5 bg-glass-fill rounded-xl border border-glass-border">
 <label className="text-[0.75rem] font-bold uppercase tracking-widest text-text-secondary block mb-3">Your API Key</label>
 <div className="flex items-center gap-3 mb-4">
 <div className="flex-1 bg-glass-fill border border-glass-border rounded-lg px-4 py-3 font-mono text-cyan text-sm">
 {apiKey}
 </div>
 <button 
 onClick={handleCopy}
 className="w-11 h-11 bg-glass-fill border border-glass-border rounded-lg flex items-center justify-center text-text-muted hover:text-white hover:border-cyan transition-colors"
 >
 {copied ? <CheckCircle2 size={18} className="text-[#22c55e]" /> : <Copy size={18} />}
 </button>
 </div>
 <button 
 onClick={regenerateKey}
 className="text-xs text-text-secondary hover:text-white transition-colors flex items-center gap-1 font-semibold"
 >
 <Key size={12} /> Regenerate Key
 </button>
 </div>

 <div className="space-y-3">
 <h3 className="text-sm font-bold text-white">Setup Instructions</h3>
 <ol className="list-decimal pl-5 text-sm text-text-secondary space-y-2">
 <li>Ensure your OpenClaw server is running.</li>
 <li>Install the <code className="bg-glass-fill px-1.5 py-0.5 rounded text-cyan">edumesh</code> skill in your OpenClaw admin panel.</li>
 <li>Paste the API Key above into the skill configuration.</li>
 <li>Message your bot: <code className="bg-glass-fill px-1.5 py-0.5 rounded text-cyan">/doubt What is kinematics?</code></li>
 </ol>
 </div>
 </GlassCard>
 </motion.div>
 )}

 {/* Other tabs omitted for brevity, fallback content provided */}
 {(activeTab === 'preferences' || activeTab === 'security') && (
 <motion.div key="stub" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
 <GlassCard className="p-8 text-center text-text-secondary">
 This section is under construction.
 </GlassCard>
 </motion.div>
 )}

 </AnimatePresence>
 </div>
 </div>
 </motion.div>
 );
}
