import type { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { RoutePath } from '@/app/routePaths';
import { type Permission } from '@/shared/permissions';
import { useAuthStore } from '@/stores/useAuthStore';
import { isValueDefined } from '@/utils/is';

import { LoadingSpinner } from './LoadingSpinner';

interface Props {
  children: ReactNode;
  /** If set, user must have this permission or they see the 403 page. */
  requiredPermission?: Permission;
  /** If set, user must have this exact role or they see the 403 page. */
  requiredRole?: string;
}

const selectIsAuthenticated = (s: { isAuthenticated: boolean }): boolean =>
  s.isAuthenticated;
const selectIsLoading = (s: { isLoading: boolean }): boolean => s.isLoading;
const selectPermissions = (s: { permissions: Permission[] }): Permission[] =>
  s.permissions;

interface UserWithRole {
  role: string;
}

const selectUserRole = (s: { user: UserWithRole | null }): string | null =>
  s.user?.role ?? null;

export const ProtectedRoute = ({
  children,
  requiredPermission,
  requiredRole,
}: Props): ReactNode => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isLoading = useAuthStore(selectIsLoading);
  const permissions = useAuthStore(selectPermissions);
  const userRole = useAuthStore(selectUserRole);

  if (isLoading) return <LoadingSpinner fullScreen />;
  if (!isAuthenticated) return <Navigate replace to="/login" />;

  if (isValueDefined(requiredPermission) && !permissions.includes(requiredPermission))
    return <Navigate replace to={RoutePath.Forbidden} />;

  if (isValueDefined(requiredRole) && userRole !== requiredRole)
    return <Navigate replace to={RoutePath.Forbidden} />;

  return children;
};
