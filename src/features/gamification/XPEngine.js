// XP Award Definitions for all student actions
export const XP_ACTIONS = {
 DAILY_LOGIN: 10,
 COMPLETE_QUIZ: 25,
 QUIZ_PERFECT_SCORE: 50,
 COMPLETE_CHAPTER: 100,
 STREAK_3_DAY: 30,
 STREAK_7_DAY: 75,
 STREAK_14_DAY: 150,
 STREAK_30_DAY: 300,
 MOCK_TEST_COMPLETE: 50,
 MOCK_TEST_90_PLUS: 100,
 NOTE_CREATED: 15,
 FEYNMAN_SESSION: 40,
 FLASHCARD_REVIEW_10: 20,
 FORMULA_MASTERED: 10,
 STUDY_PLAN_DAY_DONE: 35,
 FIRST_DOUBT_ASKED: 20,
 PYQ_SOLVED_10: 30,
};

// Rank Tier Thresholds
export const RANK_TIERS = [
 { name: 'Bronze', minXP: 0, color: '#B58A63', icon: '🥉' },
 { name: 'Silver', minXP: 500, color: '#8D99AE', icon: '🥈' },
 { name: 'Gold', minXP: 2000, color: '#D4A373', icon: '🥇' },
 { name: 'Platinum', minXP: 5000, color: '#00A8E8', icon: '💎' },
 { name: 'Diamond', minXP: 10000, color: '#a855f7', icon: '👑' },
];

/**
 * Calculate the current rank tier based on total XP
 */
export function getRankTier(totalXP) {
 let tier = RANK_TIERS[0];
 for (const t of RANK_TIERS) {
 if (totalXP >= t.minXP) tier = t;
 else break;
 }
 return tier;
}

/**
 * Calculate progress to the next tier (0-100)
 */
export function getTierProgress(totalXP) {
 const currentTier = getRankTier(totalXP);
 const currentIdx = RANK_TIERS.indexOf(currentTier);
 const nextTier = RANK_TIERS[currentIdx + 1];
 
 if (!nextTier) return 100; // Max tier
 
 const rangeXP = nextTier.minXP - currentTier.minXP;
 const progressXP = totalXP - currentTier.minXP;
 return Math.min(Math.round((progressXP / rangeXP) * 100), 100);
}
