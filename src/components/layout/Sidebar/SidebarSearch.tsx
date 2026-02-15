/**
 * Sidebar search input with magnifying glass icon.
 */
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

import { IconSearch } from './SidebarIcons';

interface SidebarSearchProps {
  isCollapsed: boolean;
}

export const SidebarSearch = ({
  isCollapsed,
}: SidebarSearchProps): JSX.Element | null => {
  if (isCollapsed) return null;

  return (
    <div className="px-3 py-2">
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-text-muted">
          <IconSearch />
        </span>
        <input
          aria-label={FM('sidebar.searchNavigation')}
          className="sidebar-search-input w-full rounded-md border border-border bg-transparent py-1.5 pl-8 pr-3 text-sm text-text-primary placeholder:text-text-muted"
          data-testid={TestIds.SIDEBAR_SEARCH}
          placeholder={FM('sidebar.searchNavigation')}
          type="text"
        />
      </div>
    </div>
  );
};
