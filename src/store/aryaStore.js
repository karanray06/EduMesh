import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAryaStore = create(
 persist(
 (set, get) => ({
 messages: [],
 subject: 'Physics',
 currentMode: 'default', // 'default', 'step-by-step'
 hinglishMode: false,
 isLoading: false,

 addMessage: (role, text, imageBase64 = null) => set((state) => ({
 messages: [...state.messages, { role, text, imageBase64, timestamp: Date.now() }]
 })),

 updateLastMessage: (text) => set((state) => {
 const newMessages = [...state.messages];
 if (newMessages.length > 0) {
 newMessages[newMessages.length - 1].text = text;
 }
 return { messages: newMessages };
 }),

 setSubject: (subject) => set({ subject }),
 setMode: (mode) => set({ currentMode: mode }),
 toggleHinglish: () => set((state) => ({ hinglishMode: !state.hinglishMode })),
 setLoading: (isLoading) => set({ isLoading }),
 clearHistory: () => set({ messages: [] }),
 }),
 {
 name: 'arya-storage',
 // Only keep messages less than 24h old
 partialize: (state) => ({
 ...state,
 messages: state.messages.filter(m => Date.now() - m.timestamp < 24 * 60 * 60 * 1000)
 }),
 }
 )
);
