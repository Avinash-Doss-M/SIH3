import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';
import { useAuth, getDashboardRoute } from '../context/AuthContext';
import type { UserRole } from '../types/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: UserRole[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { session, role, initializing, refreshRole } = useAuth();
  const location = useLocation();
  const [checkingRole, setCheckingRole] = useState(false);

  useEffect(() => {
    if (!initializing && session && !role && !checkingRole) {
      setCheckingRole(true);
      refreshRole().finally(() => setCheckingRole(false));
    }
  }, [initializing, session, role, checkingRole, refreshRole]);

  if (initializing || checkingRole) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">
        Checking your session...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && role && !roles.includes(role)) {
    return <Navigate to={getDashboardRoute(role)} replace />;
  }

  return <>{children}</>;
}
