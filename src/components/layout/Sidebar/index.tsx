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
  const headerRef = useRef<HTMLDivElement>(null);

  const effectivelyCollapsed = isCollapsed && !isHovered;
  const collapsedClass = effectivelyCollapsed ? 'collapsed' : '';
  const hasSubNav = isValueDefined(activeSubNav);

  useEffect(() => {
    const el = sidebarRef.current;
    if (!isValueDefined(el)) return;
    const isOverHeader = (target: EventTarget | null): boolean => {
      const header = headerRef.current;
      return isValueDefined(header) && target instanceof Node && header.contains(target);
    };
    const enter = (e: MouseEvent): void => {
      if (!isCollapsed) return;
      if (isOverHeader(e.target)) return;
      setIsHovered(true);
    };
    const leave = (): void => setIsHovered(false);
    const move = (e: MouseEvent): void => {
      if (!isCollapsed) return;
      setIsHovered(!isOverHeader(e.target));
    };
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    el.addEventListener('mousemove', move);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
      el.removeEventListener('mousemove', move);
    };
  }, [isCollapsed]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${collapsedClass} flex flex-col transition-all duration-normal`}
      data-collapsed={effectivelyCollapsed ? 'true' : 'false'}
      data-testid={TestIds.SIDEBAR}
    >
      <SidebarHeader headerRef={headerRef} isCollapsed={effectivelyCollapsed} onToggle={toggle} />
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
