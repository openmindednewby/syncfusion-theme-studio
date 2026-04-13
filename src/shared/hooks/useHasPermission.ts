import { type Permission } from '@/shared/permissions';
import { useAuthStore } from '@/stores/useAuthStore';

const selectPermissions = (s: { permissions: Permission[] }): Permission[] =>
  s.permissions;

/** Returns true if the current user has the specified permission. */
export function useHasPermission(permission: Permission): boolean {
  const permissions = useAuthStore(selectPermissions);
  return permissions.includes(permission);
}
