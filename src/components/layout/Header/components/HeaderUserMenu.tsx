import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { useAuthStore } from '@/stores/useAuthStore';
import { isValueDefined } from '@/utils';

interface AuthUser {
  name: string;
  role: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const selectUser = (s: { user: AuthUser | null }): AuthUser | null => s.user;
const selectLogout = (s: { logout: () => void }): (() => void) => s.logout;
const AVATAR_SIZE = 'h-7 w-7';

export const HeaderUserMenu = (): JSX.Element | null => {
  const user = useAuthStore(selectUser);
  const logout = useAuthStore(selectLogout);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    Promise.resolve(navigate('/login')).catch(() => undefined);
  }, [logout, navigate]);

  if (!isValueDefined(user)) return null;

  const initials = getInitials(user.name);

  return (
    <div className="flex items-center gap-2">
      <div
        aria-label={FM('header.userMenu')}
        className={`flex ${AVATAR_SIZE} items-center justify-center rounded-full bg-primary-600 text-xs font-medium text-white`}
        data-testid={TestIds.HEADER_USER_MENU}
      >
        {initials}
      </div>
      <div className="hidden flex-col lg:flex">
        <span className="text-sm leading-tight text-text-secondary">{user.name}</span>
        <span className="text-xs leading-tight text-text-tertiary">{user.role}</span>
      </div>
      <button
        aria-label={FM('header.logout')}
        className="flex items-center justify-center rounded-md p-2 text-text-secondary hover:bg-surface hover:text-text-primary"
        data-testid={TestIds.HEADER_LOGOUT}
        type="button"
        onClick={handleLogout}
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>
    </div>
  );
};
