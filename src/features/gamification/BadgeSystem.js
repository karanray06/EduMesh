export const BADGES = [
 // Streak Badges
 { id: 'streak_3', name: 'Spark', icon: '⚡', desc: '3-day study streak', category: 'streak' },
 { id: 'streak_7', name: 'Flame', icon: '🔥', desc: '7-day study streak', category: 'streak' },
 { id: 'streak_14', name: 'Inferno', icon: '🌋', desc: '14-day study streak', category: 'streak' },
 { id: 'streak_30', name: 'Eternal Fire', icon: '☀️', desc: '30-day study streak', category: 'streak' },
 { id: 'streak_60', name: 'Supernova', icon: '💫', desc: '60-day study streak', category: 'streak' },
 { id: 'streak_100', name: 'Legend', icon: '👑', desc: '100-day study streak', category: 'streak' },

 // Achievement Badges
 { id: 'first_doubt', name: 'Curious Mind', icon: '🧠', desc: 'Asked your first doubt to Arya', category: 'achievement' },
 { id: 'quiz_master', name: 'Quiz Master', icon: '🎯', desc: 'Scored 100% on 5 quizzes', category: 'achievement' },
 { id: 'note_taker', name: 'Scholar', icon: '📝', desc: 'Created 10 study notes', category: 'achievement' },
 { id: 'mock_warrior', name: 'Mock Warrior', icon: '⚔️', desc: 'Completed 10 mock tests', category: 'achievement' },
 { id: 'formula_sage', name: 'Formula Sage', icon: '🔬', desc: 'Mastered 50 formulas', category: 'achievement' },
 { id: 'feynman_guru', name: 'Feynman Guru', icon: '🎓', desc: 'Scored 80+ in 5 Feynman sessions', category: 'achievement' },
 { id: 'pyq_hunter', name: 'PYQ Hunter', icon: '🏹', desc: 'Solved 100 PYQ questions', category: 'achievement' },
 { id: 'subject_master', name: 'Subject Master', icon: '🏆', desc: '90%+ proficiency in any subject', category: 'achievement' },

 // Rank Badges
 { id: 'rank_silver', name: 'Silver Scholar', icon: '🥈', desc: 'Reached Silver rank (500 XP)', category: 'rank' },
 { id: 'rank_gold', name: 'Gold Scholar', icon: '🥇', desc: 'Reached Gold rank (2000 XP)', category: 'rank' },
 { id: 'rank_platinum', name: 'Platinum Mind', icon: '💎', desc: 'Reached Platinum rank (5000 XP)', category: 'rank' },
 { id: 'rank_diamond', name: 'Diamond Brain', icon: '👑', desc: 'Reached Diamond rank (10000 XP)', category: 'rank' },

 // Special
 { id: 'early_adopter', name: 'Early Adopter', icon: '🚀', desc: 'Joined EduMesh in its early days', category: 'special' },
 { id: 'night_owl', name: 'Night Owl', icon: '🦉', desc: 'Studied past midnight 10 times', category: 'special' },
];

export function getBadge(id) {
 return BADGES.find(b => b.id === id);
}
