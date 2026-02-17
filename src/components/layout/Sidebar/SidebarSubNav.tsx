/**
 * Sub-navigation view shown when a bottom item (e.g. Administration Hub) is active.
 * Displays "< Main Menu" back link and expandable sub-sections.
 * Uses the same chevron, icon, and styling patterns as the main sidebar.
 */
import { useState, useCallback } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';
import { useSidebarStore } from '@/stores/useSidebarStore';

import { getIcon } from './iconMap';
import { ADMIN_HUB_SECTIONS } from './sidebarSubNavData';
import { SubNavId } from './subNavId';

import type { SubNavSection } from './sidebarSubNavData';

interface SubNavSectionItemProps {
  section: SubNavSection;
}

const SubNavSectionItem = ({
  section,
}: SubNavSectionItemProps): JSX.Element => {
  const location = useLocation();
  const isChildActive = section.children.some(
    (child) => location.pathname === child.path,
  );
  const [isExpanded, setIsExpanded] = useState(isChildActive);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const IconComp = getIcon(section.iconName);
  const sectionName = FM(section.labelKey);

  return (
    <li>
      <button
        aria-controls={`subnav-${section.testId}`}
        aria-expanded={isExpanded}
        aria-label={
          isExpanded
            ? FM('accessibility.collapseSection', sectionName)
            : FM('accessibility.expandSection', sectionName)
        }
        className={`sidebar-item flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors ${
          isChildActive ? 'active' : ''
        }`}
        data-testid={section.expandTestId}
        type="button"
        onClick={handleToggle}
      >
        <svg
          aria-hidden="true"
          className={`size-3.5 shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M6 4l4 4-4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
        <span aria-hidden="true" className="shrink-0">
          <IconComp className="shrink-0" />
        </span>
        <span className="flex-1 text-left">{sectionName}</span>
      </button>

      {isExpanded ? (
        <ul
          className="ml-6 mt-1 space-y-1"
          id={`subnav-${section.testId}`}
        >
          {section.children.map((child) => (
            <li key={child.testId}>
              <NavLink
                aria-label={FM(child.labelKey)}
                className={({ isActive }) =>
                  `sidebar-item flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
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
        </ul>
      ) : null}
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
    <nav className="sidebar-main-nav flex-1 overflow-y-auto p-2">
      {/* Header with back link */}
      <div className="mb-2 flex items-center justify-between px-3 py-1">
        <span className="text-sm font-semibold">
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
