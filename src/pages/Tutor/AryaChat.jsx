import React, { useState, useRef, useEffect } from 'react';
import { useAryaStore } from '../../store/aryaStore';
import { sendAryaDoubt } from '../../services/ai';
import { KaTeXBlock } from '../../components/ui/KaTeXBlock';
import { Send, Image as ImageIcon, Mic, X, MoreVertical, Copy, Bookmark } from 'lucide-react';
import { useToastStore } from '../../store/toastStore';
import { motion } from 'framer-motion';

const SUBJECTS = ['Physics', 'Chemistry', 'Mathematics', 'Biology'];

export default function AryaChat() {
 const { messages, addMessage, updateLastMessage, subject, setSubject, hinglishMode, toggleHinglish, isLoading, setLoading, clearHistory } = useAryaStore();
 const [input, setInput] = useState('');
 const bottomRef = useRef(null);
 const addToast = useToastStore(s => s.addToast);

 // Auto-scroll to bottom
 useEffect(() => {
 bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
 }, [messages, isLoading]);

 const handleSend = async () => {
 if (!input.trim()) return;
 const userMsg = input.trim();
 setInput('');
 addMessage('user', userMsg);
 setLoading(true);

 try {
 let prompt = userMsg;
 if (hinglishMode) prompt += " (Explain this clearly in Hinglish with Indian analogies).";
 
 const response = await sendAryaDoubt(prompt, subject);
 addMessage('ai', response);
 } catch (error) {
 addMessage('ai', "❌ I'm sorry, I encountered an error. Please try again.");
 } finally {
 setLoading(false);
 }
 };

 const handleKeyDown = (e) => {
 if (e.key === 'Enter' && !e.shiftKey) {
 e.preventDefault();
 handleSend();
 }
 };

 const copyText = (text) => {
 navigator.clipboard.writeText(text);
 addToast('Copied to clipboard', 'success');
 };

 return (
 <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] relative">
 {/* Left Panel - Desktop */}
 <div className="hidden lg:flex flex-col w-[300px] shrink-0 gap-6">
 <div className="glass-card p-6">
 <h2 className="font-display font-bold text-lg text-white mb-4">Context</h2>
 <div className="space-y-4">
 <div>
 <span className="text-xs font-bold text-text-muted uppercase tracking-widest block mb-3">Subject</span>
 <div className="grid grid-cols-2 gap-2">
 {SUBJECTS.map(s => (
 <button
 key={s}
 onClick={() => setSubject(s)}
 className={`text-sm py-2 px-1 rounded-xl border transition-all font-semibold ${
 subject === s ? 'bg-cyan/10 border-cyan text-cyan shadow-glow-cyan' : 'bg-glass-fill border-glass-border text-text-muted hover:text-white hover:bg-glass-hover'
 }`}
 >
 {s}
 </button>
 ))}
 </div>
 </div>

 <div className="pt-2 border-t border-glass-border">
 <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-glass-hover border border-transparent hover:border-glass-border transition-colors">
 <input type="checkbox" checked={hinglishMode} onChange={toggleHinglish} className="accent-cyan w-4 h-4 rounded" />
 <span className="text-sm font-semibold text-white">Hinglish Mode</span>
 </label>
 </div>
 </div>
 </div>

 <div className="glass-card p-6 flex-1 overflow-hidden flex flex-col">
 <div className="flex justify-between items-center mb-4 border-b border-glass-border pb-3">
 <h2 className="font-display font-bold text-lg text-white">History</h2>
 <button onClick={clearHistory} className="text-xs font-bold text-text-muted hover:text-cyan transition-colors">Clear</button>
 </div>
 <div className="flex-1 overflow-y-auto space-y-3 pr-2 hide-scrollbar">
 {messages.filter(m => m.role === 'user').slice(-10).reverse().map((m, i) => (
 <div key={i} className="text-sm text-text-secondary truncate cursor-pointer hover:text-cyan transition-colors p-2 rounded-lg hover:bg-glass-hover">
 {m.text}
 </div>
 ))}
 {messages.length === 0 && <p className="text-xs text-text-muted text-center mt-6">No recent doubts</p>}
 </div>
 </div>
 </div>

 {/* Main Chat Area */}
 <div className="flex-1 flex flex-col glass-card overflow-hidden">
 {/* Mobile Header */}
 <div className="lg:hidden flex items-center justify-between p-4 border-b border-glass-border bg-glass-fill">
 <select 
 value={subject} 
 onChange={e => setSubject(e.target.value)}
 className="bg-bg-surface text-white font-semibold text-sm rounded-xl px-3 py-2 border border-glass-border outline-none focus:border-cyan"
 >
 {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
 </select>
 <button onClick={toggleHinglish} className={`text-xs font-bold px-3 py-2 rounded-xl border transition-colors ${hinglishMode ? 'border-cyan text-cyan bg-cyan/10' : 'border-glass-border text-text-secondary bg-glass-fill'}`}>
 Hinglish
 </button>
 </div>

 {/* Chat Log */}
 <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 chat-scroll">
 {messages.length === 0 ? (
 <div className="h-full flex flex-col items-center justify-center opacity-80 animate-fade-in-up">
 <div className="w-20 h-20 rounded-full bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6 shadow-glow-cyan">
 <span className="text-cyan font-display font-bold text-3xl">A</span>
 </div>
 <h3 className="text-2xl font-bold text-white font-display mb-2">Hi, I'm Arya!</h3>
 <p className="text-text-secondary mt-2 max-w-sm text-center leading-relaxed">Your personal AI tutor. Ask me any doubt in Physics, Chemistry, Math, or Biology.</p>
 </div>
 ) : (
 messages.map((msg, idx) => (
 <motion.div 
 key={idx}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
 >
 {msg.role === 'ai' && (
 <div className="w-10 h-10 rounded-full bg-cyan/10 border border-cyan/30 shrink-0 flex items-center justify-center text-cyan font-display font-bold text-lg mr-4 mt-1 shadow-glow-cyan">
 A
 </div>
 )}
 
 <div className={`max-w-[85%] sm:max-w-[75%] relative group ${
 msg.role === 'user' 
 ? 'bg-glass-fill border border-glass-border text-white px-5 py-4 rounded-3xl rounded-tr-sm' 
 : 'bg-indigo/5 border border-indigo/20 px-6 py-5 rounded-3xl rounded-tl-sm text-white shadow-sm'
 }`}>
 {msg.role === 'ai' ? (
 <>
 <KaTeXBlock content={msg.text} className="text-[15px] leading-relaxed" />
 <div className="absolute right-2 -top-10 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 bg-bg-surface p-1.5 rounded-lg border border-glass-border shadow-glass z-10">
 <button onClick={() => copyText(msg.text)} className="p-1.5 hover:text-cyan text-text-secondary rounded-md hover:bg-glass-fill" title="Copy"><Copy size={14}/></button>
 <button className="p-1.5 hover:text-amber text-text-secondary rounded-md hover:bg-glass-fill" title="Save to Notes"><Bookmark size={14}/></button>
 </div>
 </>
 ) : (
 <div className="whitespace-pre-wrap text-[15px]">{msg.text}</div>
 )}
 </div>
 </motion.div>
 ))
 )}
 
 {isLoading && (
 <div className="flex justify-start">
 <div className="w-10 h-10 rounded-full bg-cyan/10 border border-cyan/30 shrink-0 flex items-center justify-center text-cyan font-display font-bold text-lg mr-4 mt-1 shadow-glow-cyan">A</div>
 <div className="bg-indigo/5 border border-indigo/20 px-6 py-5 rounded-3xl rounded-tl-sm flex gap-1.5 items-center">
 <span className="w-2 h-2 rounded-full bg-cyan animate-bounce" style={{animationDelay: '0ms'}}/>
 <span className="w-2 h-2 rounded-full bg-cyan animate-bounce" style={{animationDelay: '150ms'}}/>
 <span className="w-2 h-2 rounded-full bg-cyan animate-bounce" style={{animationDelay: '300ms'}}/>
 </div>
 </div>
 )}
 <div ref={bottomRef} />
 </div>

 {/* Input Area */}
 <div className="p-4 border-t border-glass-border bg-bg-surface/50">
 <div className="relative flex items-end gap-3 bg-glass-fill p-2 rounded-2xl border border-glass-border focus-within:border-cyan/50 focus-within:shadow-glow-cyan transition-all">
 <button className="p-3 text-text-muted hover:text-cyan transition-colors rounded-xl hover:bg-glass-hover" title="Upload Image">
 <ImageIcon size={20} />
 </button>
 <textarea
 value={input}
 onChange={(e) => setInput(e.target.value)}
 onKeyDown={handleKeyDown}
 placeholder={`Ask Arya a ${subject} doubt...`}
 className="flex-1 max-h-[120px] bg-transparent resize-none outline-none text-white text-[15px] placeholder:text-text-muted py-3 chat-scroll"
 rows={1}
 style={{ minHeight: '48px' }}
 />
 <button className="p-3 text-text-muted hover:text-cyan transition-colors rounded-xl hover:bg-glass-hover" title="Voice Input">
 <Mic size={20} />
 </button>
 <button 
 onClick={handleSend}
 disabled={!input.trim() || isLoading}
 className="p-3 bg-cyan text-bg-primary rounded-xl disabled:opacity-50 disabled:bg-glass-fill disabled:text-text-muted hover:bg-[#00bfff] transition-colors"
 >
 <Send size={18} className="ml-0.5" />
 </button>
 </div>
 </div>
 </div>
 </div>
 );
}
