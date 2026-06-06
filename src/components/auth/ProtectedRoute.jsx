import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

/**
 * ProtectedRoute component
 * Wraps routes that require authentication. Redirects to login
 * if the user is not authenticated. Also enforces onboarding completion.
 */
export default function ProtectedRoute({ children }) {
 const { isAuthenticated, isInitializing, onboardingComplete } = useAuthStore();
 const location = useLocation();

 if (isInitializing) {
 return (
 <div className="min-h-screen bg-bg-primary flex items-center justify-center">
 <div className="w-12 h-12 border-4 border-indigo/20 border-t-indigo rounded-full animate-spin" />
 </div>
 );
 }

 if (!isAuthenticated) {
 return <Navigate to="/login" state={{ from: location }} replace />;
 }

 // If authenticated but onboarding is incomplete, redirect to onboarding step 1
 // unless they are already on an onboarding route
 if (!onboardingComplete && !location.pathname.startsWith('/onboarding')) {
 return <Navigate to="/onboarding/step1" replace />;
 }

 // If onboarding IS complete, but they try to go back to onboarding, redirect to dashboard
 if (onboardingComplete && location.pathname.startsWith('/onboarding')) {
 return <Navigate to="/dashboard" replace />;
 }

 return children;
}
