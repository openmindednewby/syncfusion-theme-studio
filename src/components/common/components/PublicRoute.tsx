import type { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/useAuthStore';

import { LoadingSpinner } from './LoadingSpinner';

interface Props {
  children: ReactNode;
}

const selectIsAuthenticated = (s: { isAuthenticated: boolean }): boolean => s.isAuthenticated;
const selectIsLoading = (s: { isLoading: boolean }): boolean => s.isLoading;

export const PublicRoute = ({ children }: Props): ReactNode => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isLoading = useAuthStore(selectIsLoading);

  if (isLoading) return <LoadingSpinner fullScreen />;
  if (isAuthenticated) return <Navigate replace to="/dashboard" />;

  return children;
};
