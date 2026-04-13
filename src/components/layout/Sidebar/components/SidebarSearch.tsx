/**
 * Sidebar search input with magnifying glass icon.
 */
import { type ChangeEvent, useCallback } from 'react';

import { IconSearch } from '@/components/icons';
import { SearchInput } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';


interface SidebarSearchProps {
  isCollapsed: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SidebarSearch = ({
  isCollapsed,
  searchQuery,
  onSearchChange,
}: SidebarSearchProps): JSX.Element | null => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value),
    [onSearchChange],
  );

  if (isCollapsed) return null;

  return (
    <div className="px-3 py-2">
      <SearchInput
        aria-label={FM('sidebar.searchNavigation')}
        containerClassName="relative"
        iconClassName="pointer-events-none absolute inset-y-0 left-2.5 flex items-center !text-[color:var(--component-sidebar-text-color)]"
        inputClassName="sidebar-search-input w-full"
        placeholder={FM('sidebar.searchNavigation')}
        renderIcon={() => <IconSearch />}
        testId={TestIds.SIDEBAR_SEARCH}
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};
