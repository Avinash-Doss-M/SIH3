import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { DashboardLayout } from './layout/DashboardLayout';
import { Landing } from './pages/Landing';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ToastViewport } from './components/ui/Toast';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { ThemeProvider } from './context/ThemeContext';
import type { UserRole } from './types/auth';
import {
  AdminStudentsPage,
  EmployerInsightsPage,
  MentorMentorshipPage,
  MentorStudentsPage,
  PlacementApplicationsPage,
  PlacementInsightsPage,
  PlacementMentorshipPage,
  PlacementStudentsPage,
  ProfilePage,
  StudentApplicationsPage,
} from './pages/dashboard/FeaturePages';

// Lazy load dashboards (placeholder logic)
const StudentDashboard = lazy(() => import('./pages/dashboard/StudentDashboard'));
const MentorDashboard = lazy(() => import('./pages/dashboard/MentorDashboard'));
const EmployerDashboard = lazy(() => import('./pages/dashboard/EmployerDashboard'));
const PlacementDashboard = lazy(() => import('./pages/dashboard/PlacementCellDashboard'));
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'));

const roleRoutes: Record<UserRole, string> = {
  student: '/dashboard/student',
  mentor: '/dashboard/mentor',
  employer: '/dashboard/employer',
  placement: '/dashboard/placement',
  admin: '/dashboard/admin',
};

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Suspense fallback={<div className="loading-shimmer p-10 text-center glass-card">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {Object.entries(roleRoutes).map(([role, path]) => (
              <Route
                key={role}
                path={path}
                element={
                  <ProtectedRoute roles={[role as UserRole]}>
                    <DashboardLayout>
                      {role === 'student' && <StudentDashboard />}
                      {role === 'mentor' && <MentorDashboard />}
                      {role === 'employer' && <EmployerDashboard />}
                      {role === 'placement' && <PlacementDashboard />}
                      {role === 'admin' && <AdminDashboard />}
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
            ))}
            <Route
              path="/dashboard/student/applications"
              element={
                <ProtectedRoute roles={['student']}>
                  <DashboardLayout>
                    <StudentApplicationsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/placement/applications"
              element={
                <ProtectedRoute roles={['placement']}>
                  <DashboardLayout>
                    <PlacementApplicationsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/mentor/mentorship"
              element={
                <ProtectedRoute roles={['mentor']}>
                  <DashboardLayout>
                    <MentorMentorshipPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/placement/mentorship"
              element={
                <ProtectedRoute roles={['placement']}>
                  <DashboardLayout>
                    <PlacementMentorshipPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/mentor/students"
              element={
                <ProtectedRoute roles={['mentor']}>
                  <DashboardLayout>
                    <MentorStudentsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/placement/students"
              element={
                <ProtectedRoute roles={['placement']}>
                  <DashboardLayout>
                    <PlacementStudentsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin/students"
              element={
                <ProtectedRoute roles={['admin']}>
                  <DashboardLayout>
                    <AdminStudentsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/employer/insights"
              element={
                <ProtectedRoute roles={['employer']}>
                  <DashboardLayout>
                    <EmployerInsightsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/placement/insights"
              element={
                <ProtectedRoute roles={['placement']}>
                  <DashboardLayout>
                    <PlacementInsightsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <ProfilePage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
        <ToastViewport />
      </BrowserRouter>
    </ThemeProvider>
  );
}

