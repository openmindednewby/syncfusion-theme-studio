import type { ReactNode } from 'react';

import { type Permission } from '@/shared/permissions';
import { useAuthStore } from '@/stores/useAuthStore';

interface Props {
  permission: Permission;
  children: ReactNode;
  /** Optional fallback to render when permission is missing. */
  fallback?: ReactNode;
}

const selectPermissions = (s: { permissions: Permission[] }): Permission[] =>
  s.permissions;

/**
 * Conditionally renders children only if the current user
 * has the specified permission.
 */
export function IfPermission({
  permission,
  children,
  fallback = null,
}: Props): ReactNode {
  const permissions = useAuthStore(selectPermissions);
  if (!permissions.includes(permission)) return fallback;
  return children;
}
