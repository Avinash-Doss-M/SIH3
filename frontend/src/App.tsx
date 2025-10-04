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
          </Routes>
        </Suspense>
        <ToastViewport />
      </BrowserRouter>
    </ThemeProvider>
  );
}

