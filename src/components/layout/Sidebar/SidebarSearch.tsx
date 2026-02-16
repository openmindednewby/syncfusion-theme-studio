/**
 * Sidebar search input with magnifying glass icon.
 */
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { SearchInput } from '@/components/ui/shared/SearchInput';

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
        inputClassName="sidebar-search-input"
        placeholder={FM('sidebar.searchNavigation')}
        renderIcon={() => <IconSearch />}
        testId={TestIds.SIDEBAR_SEARCH}
      />
    </div>
  );
};
