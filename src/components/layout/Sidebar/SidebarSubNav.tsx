/**
 * Sub-navigation view shown when a bottom item (e.g. Administration Hub) is active.
 * Displays "< Main Menu" back link and expandable sub-sections.
 */
import { useState, useCallback } from 'react';

import { NavLink } from 'react-router-dom';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useSidebarStore } from '@/stores/useSidebarStore';

import { ADMIN_HUB_SECTIONS } from './sidebarSubNavData';
import { SubNavId } from './subNavId';

import type { SubNavSection } from './sidebarSubNavData';

const EXPAND_ARROW = '\u25B8';

interface SubNavSectionItemProps {
  section: SubNavSection;
}

const SubNavSectionItem = ({
  section,
}: SubNavSectionItemProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <li>
      <button
        aria-expanded={isExpanded}
        className="sidebar-item flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors"
        data-testid={section.expandTestId}
        type="button"
        onClick={handleToggle}
      >
        <span
          aria-hidden="true"
          className={`text-xs transition-transform ${isExpanded ? 'rotate-90' : ''}`}
        >
          {EXPAND_ARROW}
        </span>
        <span className="flex-1 text-left">{FM(section.labelKey)}</span>
      </button>

      {isExpanded ? <ul className="ml-6 mt-1 space-y-0.5">
          {section.children.map((child) => (
            <li key={child.testId}>
              <NavLink
                aria-label={FM(child.labelKey)}
                className={({ isActive }) =>
                  `sidebar-item flex items-center gap-2 rounded-md px-3 py-1 text-xs transition-colors ${
                    isActive ? 'active' : ''
                  }`
                }
                data-testid={child.testId}
                to={child.path}
              >
                <span>{FM(child.labelKey)}</span>
              </NavLink>
            </li>
          ))}
        </ul> : null}
    </li>
  );
};

interface SidebarSubNavProps {
  subNavId: SubNavId;
}

export const SidebarSubNav = ({
  subNavId,
}: SidebarSubNavProps): JSX.Element => {
  const { returnToMainMenu } = useSidebarStore();

  const isAdminHub = subNavId === SubNavId.AdminHub;
  const title = isAdminHub
    ? FM('sidebar.nav.adminHub')
    : FM('sidebar.nav.marketplace');
  const sections = isAdminHub ? ADMIN_HUB_SECTIONS : [];

  return (
    <nav className="flex-1 overflow-y-auto p-2">
      {/* Header with back link */}
      <div className="mb-2 flex items-center justify-between px-3 py-1">
        <span className="text-sm font-semibold text-text-primary">
          {title}
        </span>
        <button
          aria-label={FM('sidebar.backToMainMenu')}
          className="sidebar-item flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors"
          data-testid={TestIds.SIDEBAR_BACK_MAIN}
          type="button"
          onClick={returnToMainMenu}
        >
          <span aria-hidden="true">&lt;</span>
          <span>{FM('sidebar.mainMenu')}</span>
        </button>
      </div>

      {/* Sub-navigation sections */}
      <ul className="space-y-0.5">
        {sections.map((section) => (
          <SubNavSectionItem key={section.id} section={section} />
        ))}
      </ul>
    </nav>
  );
};
