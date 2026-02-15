/**
 * Scrollable main navigation section of the sidebar.
 * Renders both simple and expandable nav items from sidebarNavData.
 */
import { NavLink } from 'react-router-dom';

import { FM } from '@/localization/helpers';

import { getIcon } from './iconMap';
import { NavExpandableItem } from './NavExpandableItem';
import {
  MAIN_NAV_ITEMS,
  isExpandableEntry,
} from './sidebarNavData';

interface SidebarMainNavProps {
  isCollapsed: boolean;
}

export const SidebarMainNav = ({
  isCollapsed,
}: SidebarMainNavProps): JSX.Element => (
  <nav className="sidebar-main-nav flex-1 overflow-y-auto p-2">
    <ul className="space-y-0.5">
      {MAIN_NAV_ITEMS.map((entry) => {
        const IconComp = getIcon(entry.iconName);
        const iconNode = <IconComp className="shrink-0" />;

        if (isExpandableEntry(entry)) 
          return (
            <NavExpandableItem
              key={entry.id}
              expandTestId={entry.expandTestId}
              icon={iconNode}
              isCollapsed={isCollapsed}
              labelKey={entry.labelKey}
              pathPrefix={entry.pathPrefix}
            >
              {entry.children}
            </NavExpandableItem>
          );
        

        return (
          <li key={entry.id}>
            <NavLink
              aria-label={FM(entry.labelKey)}
              className={({ isActive }) =>
                `sidebar-item flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive ? 'active' : ''
                }`
              }
              data-testid={entry.testId}
              to={entry.path ?? '#'}
            >
              {iconNode}
              {!isCollapsed && <span>{FM(entry.labelKey)}</span>}
            </NavLink>
          </li>
        );
      })}
    </ul>
  </nav>
);
