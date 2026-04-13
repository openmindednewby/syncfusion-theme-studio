/**
 * Scrollable main navigation section of the sidebar.
 * Renders both simple and expandable nav items from sidebarNavData.
 * Supports filtering via searchQuery prop and user permissions.
 */
import { useMemo } from 'react';

import { NavLink } from 'react-router-dom';

import { useMockServerWebNotificationsUnreadCount } from '@/api/generated/mockserver/notifications/notifications';
import { FM } from '@/localization/utils/helpers';
import { type Permission } from '@/shared/permissions';
import { TestIds } from '@/shared/testIds';
import { useAuthStore } from '@/stores/useAuthStore';

import { HighlightMatch } from './HighlightMatch';
import { NavExpandableItem } from './NavExpandableItem';
import {
  MAIN_NAV_ITEMS,
  isExpandableEntry,
} from '../sidebarNavData';
import { getIcon } from '../utils/iconMap';
import { filterMainNavItems } from '../utils/sidebarFilterUtils';

interface SidebarMainNavProps {
  isCollapsed: boolean;
  searchQuery: string;
}

const selectPermissions = (s: { permissions: Permission[] }): Permission[] =>
  s.permissions;

const MAX_BADGE_COUNT = 99;

export const SidebarMainNav = ({
  isCollapsed,
  searchQuery,
}: SidebarMainNavProps): JSX.Element => {
  const permissions = useAuthStore(selectPermissions);
  const filteredItems = useMemo(
    () => filterMainNavItems(MAIN_NAV_ITEMS, searchQuery, permissions),
    [searchQuery, permissions],
  );
  const isSearching = searchQuery.trim() !== '';

  const { data: unreadData } = useMockServerWebNotificationsUnreadCount();
  const unreadCount = unreadData?.data.count ?? 0;
  const badgeText = unreadCount > MAX_BADGE_COUNT ? '99+' : String(unreadCount);

  return (
    <nav className="sidebar-main-nav flex-1 overflow-y-auto p-2">
      <ul className="space-y-0.5">
        {filteredItems.map((entry) => {
          const IconComp = getIcon(entry.iconName);
          const iconNode = <IconComp className="sidebar-nav-icon shrink-0" />;

          if (isExpandableEntry(entry))
            return (
              <NavExpandableItem
                key={entry.id}
                expandTestId={entry.expandTestId}
                forceExpanded={isSearching}
                icon={iconNode}
                isCollapsed={isCollapsed}
                labelKey={entry.labelKey}
                pathPrefix={entry.pathPrefix}
                searchQuery={searchQuery}
              >
                {entry.children}
              </NavExpandableItem>
            );

          return (
            <li key={entry.id}>
              <NavLink
                end
                aria-label={FM(entry.labelKey)}
                className={({ isActive }) =>
                  `sidebar-item flex items-center gap-3 py-2 text-sm transition-colors ${
                    isCollapsed ? 'px-3' : 'pl-[38px] pr-3'
                  } ${isActive ? 'active' : ''}`
                }
                data-testid={entry.testId}
                to={entry.path ?? '#'}
              >
                {iconNode}
                {!isCollapsed && (
                  <span className="flex flex-1 items-center justify-between">
                    <HighlightMatch query={searchQuery} text={FM(entry.labelKey)} />
                    {entry.id === 'notifications' && unreadCount > 0 && (
                      <span
                        className="rounded-full bg-error-500 px-1.5 py-0.5 text-xs font-bold leading-none text-white"
                        data-testid={TestIds.NAV_NOTIFICATIONS_BADGE}
                      >
                        {badgeText}
                      </span>
                    )}
                  </span>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
