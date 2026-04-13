import { type Role } from '@/shared/permissions';
import { useAuthStore } from '@/stores/useAuthStore';

interface UserWithRole {
  role: string;
}

const selectUserRole = (s: { user: UserWithRole | null }): string | null =>
  s.user?.role ?? null;

/** Returns true if the current user has the specified role. */
export function useHasRole(role: Role): boolean {
  const userRole = useAuthStore(selectUserRole);
  return userRole === String(role);
}
