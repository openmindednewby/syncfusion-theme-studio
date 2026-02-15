/**
 * Sidebar orchestrator component.
 * Composes SidebarHeader, SidebarSearch, SidebarMainNav/SidebarSubNav,
 * and SidebarBottomItems based on current navigation state.
 */
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

  const collapsedClass = isCollapsed ? 'collapsed' : '';
  const hasSubNav = isValueDefined(activeSubNav);

  return (
    <aside
      className={`sidebar ${collapsedClass} flex flex-col transition-all duration-normal`}
      data-collapsed={isCollapsed ? 'true' : 'false'}
      data-testid={TestIds.SIDEBAR}
    >
      <SidebarHeader isCollapsed={isCollapsed} onToggle={toggle} />
      <SidebarSearch isCollapsed={isCollapsed} />

      {hasSubNav ? (
        <SidebarSubNav subNavId={activeSubNav} />
      ) : (
        <SidebarMainNav isCollapsed={isCollapsed} />
      )}

      <SidebarBottomItems isCollapsed={isCollapsed} />
    </aside>
  );
};
