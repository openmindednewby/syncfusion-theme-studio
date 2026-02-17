/**
 * Sidebar orchestrator component.
 * Composes SidebarHeader, SidebarSearch, SidebarMainNav/SidebarSubNav,
 * and SidebarBottomItems based on current navigation state.
 */
import { useState } from 'react';
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

  const effectivelyCollapsed = isCollapsed && !isHovered;
  const collapsedClass = effectivelyCollapsed ? 'collapsed' : '';
  const hasSubNav = isValueDefined(activeSubNav);

  return (
    <aside
      className={`sidebar ${collapsedClass} flex flex-col transition-all duration-normal`}
      data-collapsed={effectivelyCollapsed ? 'true' : 'false'}
      data-testid={TestIds.SIDEBAR}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <SidebarHeader isCollapsed={effectivelyCollapsed} onToggle={toggle} />
      <SidebarSearch isCollapsed={effectivelyCollapsed} />

      {hasSubNav ? (
        <SidebarSubNav subNavId={activeSubNav} />
      ) : (
        <SidebarMainNav isCollapsed={effectivelyCollapsed} />
      )}

      <SidebarBottomItems isCollapsed={effectivelyCollapsed} />
    </aside>
  );
};
