import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Pages - Existing
import Landing from './pages/Landing';
import Login from './pages/Login';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Flashcards from './pages/Flashcards';
import Feynman from './pages/Feynman';
import KnowledgeGraph from './pages/KnowledgeGraph';
import MindTree from './pages/MindTree';
import Pricing from './pages/Pricing';
import Features from './pages/Features';
import Courses from './pages/Courses';
import Blog from './pages/Blog';

// Pages - Phase 2: Core Learning
import OnboardingStep1 from './pages/Onboarding/OnboardingStep1';
import OnboardingStep2 from './pages/Onboarding/OnboardingStep2';
import OnboardingStep3 from './pages/Onboarding/OnboardingStep3';
import OnboardingStep4 from './pages/Onboarding/OnboardingStep4';
import AryaChat from './pages/Tutor/AryaChat';
import SubjectList from './pages/Subjects/SubjectList';
import SubjectDetail from './pages/Subjects/SubjectDetail';
import TopicView from './pages/Subjects/TopicView';
import QuizHome from './pages/Practice/QuizHome';
import QuizSession from './pages/Practice/QuizSession';
import QuizResult from './pages/Practice/QuizResult';

// Pages - Phase 3: Assessment Suite
import MockTestHome from './pages/MockTest/MockTestHome';
import TestConfig from './pages/MockTest/TestConfig';
import TestSession from './pages/MockTest/TestSession';
import TestReview from './pages/MockTest/TestReview';
import TestAnalysis from './pages/MockTest/TestAnalysis';
import PYQBrowser from './pages/PYQ/PYQBrowser';
import PYQAnalysis from './pages/PYQ/PYQAnalysis';

// Pages - Phase 4: Study Tools
import NotesHome from './pages/Notes/NotesHome';
import NoteEditor from './pages/Notes/NoteEditor';
import AINotesGenerator from './pages/Notes/AINotesGenerator';
import FormulaVault from './pages/Formulas/FormulaVault';
import PlannerHome from './pages/Planner/PlannerHome';

// Pages - Phase 7: Degree Mode
import DegreeHome from './pages/Degree/DegreeHome';
import SemesterView from './pages/Degree/SemesterView';
import DegreeSubject from './pages/Degree/DegreeSubject';
import VivaPrep from './pages/Degree/VivaPrep';
import PlacementPrep from './pages/Degree/PlacementPrep';

// Pages - Phase 8: New App Pages
import AnalyticsDashboard from './pages/Analytics/AnalyticsDashboard';
import GroupsHome from './pages/Groups/GroupsHome';
import GroupHub from './pages/Groups/GroupHub';
import ProfilePage from './pages/Profile/ProfilePage';

// Layout & Components
import MainLayout from './components/layout/MainLayout';
import ToastContainer from './components/ui/ToastContainer';
import ProtectedRoute from './components/auth/ProtectedRoute';

const AppContent = () => {
 const { initializeAuth, isInitializing } = useAuthStore();

 useEffect(() => {
 initializeAuth();
 }, [initializeAuth]);

 if (isInitializing) {
 return (
 <div className="flex items-center justify-center min-h-screen bg-navy">
 <div className="text-center">
 <div className="w-16 h-16 rounded-full border-4 border-[rgba(0,168,232,0.15)] border-t-cyan animate-spin mx-auto mb-4" />
 <p className="text-indigo-light font-display font-bold tracking-widest uppercase text-xs">Loading EduMesh...</p>
 </div>
 </div>
 );
 }

 return (
 <>
 <Routes>
 {/* Public Routes */}
 <Route path="/" element={<Landing />} />
 <Route path="/login" element={<Login />} />
 <Route path="/auth/callback" element={<AuthCallback />} />
 <Route path="/features" element={<Features />} />
 <Route path="/courses" element={<Courses />} />
 <Route path="/pricing" element={<Pricing />} />
 <Route path="/blog" element={<Blog />} />

 {/* Protected Routes */}
 <Route path="/onboarding/step1" element={<ProtectedRoute><OnboardingStep1 /></ProtectedRoute>} />
 <Route path="/onboarding/step2" element={<ProtectedRoute><OnboardingStep2 /></ProtectedRoute>} />
 <Route path="/onboarding/step3" element={<ProtectedRoute><OnboardingStep3 /></ProtectedRoute>} />
 <Route path="/onboarding/step4" element={<ProtectedRoute><OnboardingStep4 /></ProtectedRoute>} />
 <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
 <Route path="/tutor" element={<ProtectedRoute><MainLayout><AryaChat /></MainLayout></ProtectedRoute>} />
 
 {/* Subject Routes */}
 <Route path="/subjects" element={<ProtectedRoute><MainLayout><SubjectList /></MainLayout></ProtectedRoute>} />
 <Route path="/subjects/:subjectId" element={<ProtectedRoute><MainLayout><SubjectDetail /></MainLayout></ProtectedRoute>} />
 <Route path="/subjects/:subjectId/:chapterId/:topicId" element={<ProtectedRoute><MainLayout><TopicView /></MainLayout></ProtectedRoute>} />

 {/* Practice Routes */}
 <Route path="/practice" element={<ProtectedRoute><MainLayout><QuizHome /></MainLayout></ProtectedRoute>} />
 <Route path="/practice/session" element={<ProtectedRoute><MainLayout><QuizSession /></MainLayout></ProtectedRoute>} />
 <Route path="/practice/result" element={<ProtectedRoute><MainLayout><QuizResult /></MainLayout></ProtectedRoute>} />

 {/* Mock Test Routes (Phase 3) */}
 <Route path="/mock-test" element={<ProtectedRoute><MainLayout><MockTestHome /></MainLayout></ProtectedRoute>} />
 <Route path="/mock-test/config" element={<ProtectedRoute><MainLayout><TestConfig /></MainLayout></ProtectedRoute>} />
 <Route path="/mock-test/session" element={<ProtectedRoute><TestSession /></ProtectedRoute>} />
 <Route path="/mock-test/review" element={<ProtectedRoute><MainLayout><TestReview /></MainLayout></ProtectedRoute>} />
 <Route path="/mock-test/analysis" element={<ProtectedRoute><MainLayout><TestAnalysis /></MainLayout></ProtectedRoute>} />

 {/* PYQ Routes (Phase 3) */}
 <Route path="/pyq" element={<ProtectedRoute><MainLayout><PYQBrowser /></MainLayout></ProtectedRoute>} />
 <Route path="/pyq/analysis" element={<ProtectedRoute><MainLayout><PYQAnalysis /></MainLayout></ProtectedRoute>} />

 {/* Notes Routes (Phase 4) */}
 <Route path="/notes" element={<ProtectedRoute><MainLayout><NotesHome /></MainLayout></ProtectedRoute>} />
 <Route path="/notes/editor" element={<ProtectedRoute><MainLayout><NoteEditor /></MainLayout></ProtectedRoute>} />
 <Route path="/notes/generate" element={<ProtectedRoute><MainLayout><AINotesGenerator /></MainLayout></ProtectedRoute>} />

 {/* Formula Routes (Phase 4) */}
 <Route path="/formulas" element={<ProtectedRoute><MainLayout><FormulaVault /></MainLayout></ProtectedRoute>} />

 {/* Planner Routes (Phase 4) */}
 <Route path="/planner" element={<ProtectedRoute><MainLayout><PlannerHome /></MainLayout></ProtectedRoute>} />

 {/* Degree Routes (Phase 7) */}
 <Route path="/degree" element={<ProtectedRoute><MainLayout><DegreeHome /></MainLayout></ProtectedRoute>} />
 <Route path="/degree/viva" element={<ProtectedRoute><MainLayout><VivaPrep /></MainLayout></ProtectedRoute>} />
 <Route path="/degree/placement" element={<ProtectedRoute><MainLayout><PlacementPrep /></MainLayout></ProtectedRoute>} />
 <Route path="/degree/:degreeId" element={<ProtectedRoute><MainLayout><SemesterView /></MainLayout></ProtectedRoute>} />
 <Route path="/degree/:degreeId/:semId" element={<ProtectedRoute><MainLayout><DegreeSubject /></MainLayout></ProtectedRoute>} />

 {/* Phase 8 Routes */}
 <Route path="/analytics" element={<ProtectedRoute><MainLayout><AnalyticsDashboard /></MainLayout></ProtectedRoute>} />
 <Route path="/groups" element={<ProtectedRoute><MainLayout><GroupsHome /></MainLayout></ProtectedRoute>} />
 <Route path="/groups/:groupId" element={<ProtectedRoute><MainLayout><GroupHub /></MainLayout></ProtectedRoute>} />
 <Route path="/profile" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />

 {/* Legacy/Other Routes */}
 <Route path="/flashcards" element={<ProtectedRoute><MainLayout><Flashcards /></MainLayout></ProtectedRoute>} />
 <Route path="/feynman" element={<ProtectedRoute><MainLayout><Feynman /></MainLayout></ProtectedRoute>} />
 <Route path="/knowledge-graph" element={<ProtectedRoute><MainLayout><KnowledgeGraph /></MainLayout></ProtectedRoute>} />
 <Route path="/mindtree" element={<ProtectedRoute><MainLayout><MindTree /></MainLayout></ProtectedRoute>} />
 <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />

 {/* Catch-all */}
 <Route path="*" element={<Navigate to="/dashboard" replace />} />
 </Routes>
 <ToastContainer />
 </>
 );
};

const App = () => {
 return <AppContent />;
};

export default App;
