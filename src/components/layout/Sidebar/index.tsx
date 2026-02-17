/**
 * Sidebar orchestrator component.
 * Composes SidebarHeader, SidebarSearch, SidebarMainNav/SidebarSubNav,
 * and SidebarBottomItems based on current navigation state.
 */
import { useCallback, useState } from 'react';

import { TestIds } from '@/shared/testIds';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { isValueDefined } from '@/utils/is';

import { SidebarBottomItems } from './SidebarBottomItems';
import { SidebarHeader } from './SidebarHeader';
import { SidebarMainNav } from './SidebarMainNav';
import { SidebarSearch } from './SidebarSearch';
import { SidebarSubNav } from './SidebarSubNav';

export const Sidebar = (): JSX.Element => {
  const { isCollapsed, toggle, activeSubNav } = useSidebarStore();
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const effectivelyCollapsed = isCollapsed && !isHovered;
  const collapsedClass = effectivelyCollapsed ? 'collapsed' : '';
  const hasSubNav = isValueDefined(activeSubNav);

  const handleMouseEnter = useCallback(() => {
    if (isCollapsed) setIsHovered(true);
  }, [isCollapsed]);

  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <aside
      className={`sidebar ${collapsedClass} flex flex-col transition-all duration-normal`}
      data-collapsed={effectivelyCollapsed ? 'true' : 'false'}
      data-testid={TestIds.SIDEBAR}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarHeader isCollapsed={effectivelyCollapsed} onToggle={toggle} />
      <SidebarSearch
        isCollapsed={effectivelyCollapsed}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {hasSubNav ? (
        <SidebarSubNav subNavId={activeSubNav} />
      ) : (
        <SidebarMainNav
          isCollapsed={effectivelyCollapsed}
          searchQuery={searchQuery}
        />
      )}

      <SidebarBottomItems
        isCollapsed={effectivelyCollapsed}
        searchQuery={searchQuery}
      />
    </aside>
  );
};
