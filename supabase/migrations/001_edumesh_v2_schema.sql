-- ============================================================
-- EduMesh v3.0 (2.0 Target) — Supabase Migration
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. Students Profile
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  name TEXT, 
  email TEXT, 
  phone TEXT,
  board TEXT DEFAULT 'CBSE', 
  current_class TEXT, 
  exam_target TEXT,
  language_pref TEXT DEFAULT 'english',
  daily_study_hours INTEGER DEFAULT 4,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Subject Profiles (Progress Tracking)
CREATE TABLE IF NOT EXISTS subject_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  subject TEXT, 
  chapter TEXT, 
  topic TEXT,
  proficiency INTEGER DEFAULT 0 CHECK (proficiency BETWEEN 0 AND 100),
  accuracy_7d NUMERIC, 
  accuracy_30d NUMERIC,
  last_studied TIMESTAMPTZ, 
  attempts_count INTEGER DEFAULT 0,
  UNIQUE(student_id, subject, chapter, topic)
);

-- 3. Questions Bank (PYQ + Practice)
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject TEXT, 
  chapter TEXT, 
  topic TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy','medium','hard')),
  question_type TEXT, 
  question_text TEXT, 
  options JSONB,
  correct_answer TEXT, 
  detailed_solution TEXT,
  exam_source TEXT, 
  exam_year INTEGER,
  tags TEXT[], 
  is_pyq BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Study Sessions
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  subject TEXT, 
  chapter TEXT, 
  duration_minutes INTEGER,
  questions_attempted INTEGER, 
  correct_count INTEGER,
  accuracy NUMERIC, 
  session_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Mock Tests
CREATE TABLE IF NOT EXISTS mock_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  test_type TEXT, 
  exam_target TEXT, 
  subject TEXT,
  questions_json JSONB, 
  score NUMERIC, 
  max_score NUMERIC,
  time_taken_seconds INTEGER,
  analysis_json JSONB, 
  percentile NUMERIC,
  attempted_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Spaced Repetitions (Flashcards)
CREATE TABLE IF NOT EXISTS spaced_repetitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  concept_id TEXT, 
  subject TEXT, 
  chapter TEXT, 
  topic TEXT,
  next_review_date DATE DEFAULT CURRENT_DATE,
  interval_days INTEGER DEFAULT 1,
  ease_factor NUMERIC DEFAULT 2.5,
  repetitions INTEGER DEFAULT 0
);

-- 7. Notes
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  subject TEXT, 
  chapter TEXT, 
  title TEXT,
  content_md TEXT, 
  is_ai_generated BOOLEAN DEFAULT true,
  is_highlighted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Gamification & Stats
CREATE TABLE IF NOT EXISTS student_stats (
  student_id UUID REFERENCES students(id) PRIMARY KEY,
  total_xp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_active DATE DEFAULT CURRENT_DATE,
  badges_json JSONB DEFAULT '[]'::jsonb,
  rank_tier TEXT DEFAULT 'Bronze',
  weekly_study_minutes INTEGER DEFAULT 0
);

-- 9. AI Response Cache
CREATE TABLE IF NOT EXISTS ai_cache (
  cache_key TEXT PRIMARY KEY,
  response_text TEXT, 
  provider TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ
);

-- ============================================================
-- RLS POLICIES & INDEXES
-- ============================================================

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE spaced_repetitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Create basic policies (Users can only access their own data)
CREATE POLICY "Users can view own student record" ON students FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own student record" ON students FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own subject profiles" ON subject_profiles FOR ALL USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own study sessions" ON study_sessions FOR ALL USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own mock tests" ON mock_tests FOR ALL USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own spaced repetitions" ON spaced_repetitions FOR ALL USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own notes" ON notes FOR ALL USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));
CREATE POLICY "Users can manage own stats" ON student_stats FOR ALL USING (student_id IN (SELECT id FROM students WHERE user_id = auth.uid()));

-- Questions are public read-only
CREATE POLICY "Questions are readable by all authenticated users" ON questions FOR SELECT TO authenticated USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_student_profiles ON subject_profiles(student_id, subject, chapter);
CREATE INDEX IF NOT EXISTS idx_questions_lookup ON questions(subject, chapter, topic, difficulty);
CREATE INDEX IF NOT EXISTS idx_spaced_rep_date ON spaced_repetitions(student_id, next_review_date);
CREATE INDEX IF NOT EXISTS idx_ai_cache_expires ON ai_cache(expires_at);
