/**
 * Sidebar orchestrator component.
 * Composes SidebarHeader, SidebarSearch, SidebarMainNav/SidebarSubNav,
 * and SidebarBottomItems based on current navigation state.
 */
import { useEffect, useRef, useState } from 'react';

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
  const sidebarRef = useRef<HTMLElement>(null);

  const effectivelyCollapsed = isCollapsed && !isHovered;
  const collapsedClass = effectivelyCollapsed ? 'collapsed' : '';
  const hasSubNav = isValueDefined(activeSubNav);

  useEffect(() => {
    const el = sidebarRef.current;
    if (!isValueDefined(el)) return;
    const enter = (): void => { if (isCollapsed) setIsHovered(true); };
    const leave = (): void => setIsHovered(false);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, [isCollapsed]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${collapsedClass} flex flex-col transition-all duration-normal`}
      data-collapsed={effectivelyCollapsed ? 'true' : 'false'}
      data-testid={TestIds.SIDEBAR}
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
