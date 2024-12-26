import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { validateToken } from '../utils/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, user } = useAuthStore();
  const location = useLocation();

  const isValidToken = token && validateToken(token);
  const isAdmin = user?.role === 'admin';

  if (!isValidToken || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}