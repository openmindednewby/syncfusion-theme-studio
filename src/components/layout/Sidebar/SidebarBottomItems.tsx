/**
 * Bottom-pinned navigation items (Administration Hub, Marketplace).
 */
import { useMemo } from 'react';

import { NavLink } from 'react-router-dom';

import { FM } from '@/localization/helpers';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { isValueDefined } from '@/utils/is';

import { getIcon } from './iconMap';
import { HighlightMatch } from './HighlightMatch';
import { filterBottomNavItems } from './sidebarFilterUtils';
import { BOTTOM_NAV_ITEMS } from './sidebarNavData';

interface SidebarBottomItemsProps {
  isCollapsed: boolean;
  searchQuery: string;
}

export const SidebarBottomItems = ({
  isCollapsed,
  searchQuery,
}: SidebarBottomItemsProps): JSX.Element => {
  const { activeSubNav, setActiveSubNav } = useSidebarStore();
  const filteredItems = useMemo(
    () => filterBottomNavItems(BOTTOM_NAV_ITEMS, searchQuery),
    [searchQuery],
  );

  return (
    <div className="sidebar-bottom-items border-t border-border p-2">
      <ul className="space-y-0.5">
        {filteredItems.map((item) => {
          const IconComp = getIcon(item.iconName);
          const iconNode = <IconComp className="shrink-0" />;
          const isActive =
            isValueDefined(item.subNavId) &&
            activeSubNav === item.subNavId;

          if (isValueDefined(item.path))
            return (
              <li key={item.id}>
                <NavLink
                  aria-label={FM(item.labelKey)}
                  className={`sidebar-item flex items-center gap-3 rounded-md py-2 text-sm transition-colors ${
                    isCollapsed ? 'px-3' : 'pl-[38px] pr-3'
                  } ${isActive ? 'active' : ''}`}
                  data-testid={item.testId}
                  to={item.path}
                >
                  {iconNode}
                  {!isCollapsed && (
                  <span>
                    <HighlightMatch query={searchQuery} text={FM(item.labelKey)} />
                  </span>
                )}
                </NavLink>
              </li>
            );

          if (!isValueDefined(item.subNavId)) return null;

          const { subNavId } = item;

          return (
            <li key={item.id}>
              <button
                aria-label={FM(item.labelKey)}
                className={`sidebar-item flex w-full items-center gap-3 rounded-md py-2 text-sm transition-colors ${
                  isCollapsed ? 'px-3' : 'pl-[38px] pr-3'
                } ${isActive ? 'active' : ''}`}
                data-testid={item.testId}
                type="button"
                onClick={() => setActiveSubNav(subNavId)}
              >
                {iconNode}
                {!isCollapsed && (
                  <span>
                    <HighlightMatch query={searchQuery} text={FM(item.labelKey)} />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
