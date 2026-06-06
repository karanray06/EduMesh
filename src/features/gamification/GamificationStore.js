import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { XP_ACTIONS, getRankTier, getTierProgress } from './XPEngine';

export const useGamificationStore = create(
 persist(
 (set, get) => ({
 totalXP: 0,
 streakDays: 0,
 lastActiveDate: null, // ISO date string (YYYY-MM-DD)
 badges: [], // Array of badge IDs
 weeklyStudyMinutes: 0,

 // --- XP ---
 awardXP: (action) => {
 const amount = XP_ACTIONS[action] || 0;
 if (amount <= 0) return;
 set((s) => ({ totalXP: s.totalXP + amount }));
 },

 awardCustomXP: (amount) => {
 if (amount <= 0) return;
 set((s) => ({ totalXP: s.totalXP + amount }));
 },

 // --- Streaks ---
 recordDailyLogin: () => {
 const today = new Date().toISOString().slice(0, 10);
 const { lastActiveDate, streakDays } = get();

 if (lastActiveDate === today) return; // Already recorded today

 const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
 let newStreak = 1;

 if (lastActiveDate === yesterday) {
 newStreak = streakDays + 1;
 }

 set({ lastActiveDate: today, streakDays: newStreak });

 // Award streak milestones
 if (newStreak === 3) get().awardXP('STREAK_3_DAY');
 if (newStreak === 7) get().awardXP('STREAK_7_DAY');
 if (newStreak === 14) get().awardXP('STREAK_14_DAY');
 if (newStreak === 30) get().awardXP('STREAK_30_DAY');

 // Award daily login XP
 get().awardXP('DAILY_LOGIN');
 },

 // --- Badges ---
 unlockBadge: (badgeId) => set((s) => {
 if (s.badges.includes(badgeId)) return s;
 return { badges: [...s.badges, badgeId] };
 }),

 hasBadge: (badgeId) => get().badges.includes(badgeId),

 // --- Study Time ---
 addStudyMinutes: (mins) => set((s) => ({
 weeklyStudyMinutes: s.weeklyStudyMinutes + mins
 })),

 resetWeeklyMinutes: () => set({ weeklyStudyMinutes: 0 }),

 // --- Computed ---
 get currentTier() { return getRankTier(get().totalXP); },
 get tierProgress() { return getTierProgress(get().totalXP); },
 }),
 {
 name: 'edumesh-gamification',
 }
 )
);
