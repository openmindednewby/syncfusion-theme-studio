/**
 * Scrollable main navigation section of the sidebar.
 * Renders both simple and expandable nav items from sidebarNavData.
 * Supports filtering via searchQuery prop.
 */
import { useMemo } from 'react';

import { NavLink } from 'react-router-dom';

import { FM } from '@/localization/helpers';

import { HighlightMatch } from './HighlightMatch';
import { getIcon } from './iconMap';
import { NavExpandableItem } from './NavExpandableItem';
import { filterMainNavItems } from './sidebarFilterUtils';
import {
  MAIN_NAV_ITEMS,
  isExpandableEntry,
} from './sidebarNavData';

interface SidebarMainNavProps {
  isCollapsed: boolean;
  searchQuery: string;
}

export const SidebarMainNav = ({
  isCollapsed,
  searchQuery,
}: SidebarMainNavProps): JSX.Element => {
  const filteredItems = useMemo(
    () => filterMainNavItems(MAIN_NAV_ITEMS, searchQuery),
    [searchQuery],
  );
  const isSearching = searchQuery.trim() !== '';

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
                  `sidebar-item flex items-center gap-3 rounded-md py-2 text-sm transition-colors ${
                    isCollapsed ? 'px-3' : 'pl-[38px] pr-3'
                  } ${isActive ? 'active' : ''}`
                }
                data-testid={entry.testId}
                to={entry.path ?? '#'}
              >
                {iconNode}
                {!isCollapsed && (
                <span>
                  <HighlightMatch query={searchQuery} text={FM(entry.labelKey)} />
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
