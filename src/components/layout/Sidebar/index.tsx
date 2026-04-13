/**
 * Sidebar orchestrator component.
 * Composes SidebarHeader, SidebarSearch, SidebarMainNav/SidebarSubNav,
 * and SidebarBottomItems based on current navigation state.
 *
 * On mobile viewports, the sidebar auto-collapses and renders as
 * a fixed overlay with a backdrop when expanded.
 */
import { useEffect, useRef, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { useSidebarStore } from '@/stores/useSidebarStore';
import { isValueDefined } from '@/utils/is';

import { SidebarBottomItems } from './components/SidebarBottomItems';
import { SidebarHeader } from './components/SidebarHeader';
import { SidebarMainNav } from './components/SidebarMainNav';
import { SidebarSearch } from './components/SidebarSearch';
import { SidebarSubNav } from './components/SidebarSubNav';

interface SidebarProps {
  isMobile?: boolean;
}

export const Sidebar = ({ isMobile = false }: SidebarProps): JSX.Element | null => {
  const { isCollapsed, toggle, setCollapsed, activeSubNav } = useSidebarStore();
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const sidebarRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Auto-collapse sidebar when entering mobile viewport
  useEffect(() => {
    if (isMobile) setCollapsed(true);
  }, [isMobile, setCollapsed]);

  const effectivelyCollapsed = isCollapsed && !isHovered;
  const collapsedClass = effectivelyCollapsed ? 'collapsed' : '';
  const hasSubNav = isValueDefined(activeSubNav);

  // On mobile, if sidebar is expanded (user toggled), show as overlay
  const showMobileOverlay = isMobile && !isCollapsed;

  useEffect(() => {
    const el = sidebarRef.current;
    if (!isValueDefined(el)) return;
    // Disable hover expansion on mobile
    if (isMobile) return;

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
  }, [isCollapsed, isMobile]);

  const handleBackdropClick = (): void => {
    setCollapsed(true);
  };

  const sidebarElement = (
    <aside
      ref={sidebarRef}
      className={`sidebar ${collapsedClass} flex flex-col overflow-hidden transition-all duration-normal ${showMobileOverlay ? 'mobile-sidebar-overlay' : ''}`}
      data-collapsed={isCollapsed ? 'true' : 'false'}
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

  // On mobile, wrap sidebar in fixed overlay container with backdrop
  if (showMobileOverlay)
    return (
      <div className="mobile-panel-container" role="dialog">
        <button
          aria-label={FM('sidebar.closeOverlay')}
          className="mobile-panel-backdrop"
          data-testid={TestIds.SIDEBAR_BACKDROP}
          tabIndex={-1}
          type="button"
          onClick={handleBackdropClick}
        />
        {sidebarElement}
      </div>
    );

  // On mobile when collapsed, hide the sidebar entirely from the grid
  if (isMobile && isCollapsed) return null;

  return sidebarElement;
};
