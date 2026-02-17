/**
 * Sidebar search input with magnifying glass icon.
 */
import { SearchInput } from '@/components/ui/native';
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
      <SearchInput
        aria-label={FM('sidebar.searchNavigation')}
        inputClassName="sidebar-search-input w-full"
        containerClassName="relative"
        iconClassName="pointer-events-none absolute inset-y-0 left-2.5 flex items-center !text-[color:var(--component-sidebar-text-color)]"
        placeholder={FM('sidebar.searchNavigation')}
        renderIcon={() => <IconSearch />}
        testId={TestIds.SIDEBAR_SEARCH}
      />
    </div>
  );
};
