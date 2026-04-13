import { useState, useCallback, useEffect } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

import { HighlightMatch } from './HighlightMatch';
import { NavSubGroup } from './NavSubGroup';
import { getIcon } from '../utils/iconMap';
import { NAV_BULLET } from '../utils/navConstants';

import type { IconName } from '../utils/iconName';

export interface SubNavItem {
  path: string;
  labelKey: string;
  testId: string;
  iconName?: IconName;
}

export interface SubNavGroup {
  labelKey: string;
  testId: string;
  expandTestId: string;
  path?: string;
  items: SubNavItem[];
}

export type NavChild = SubNavItem | SubNavGroup;

export function isSubNavGroup(child: NavChild): child is SubNavGroup {
  return 'items' in child;
}

interface NavExpandableItemProps {
  labelKey: string;
  icon: React.ReactNode;
  expandTestId: string;
  pathPrefix: string;
  children: NavChild[];
  isCollapsed: boolean;
  /** Force expand when search is active */
  forceExpanded?: boolean;
  /** Current search query for highlighting matched text */
  searchQuery?: string;
}

export const NavExpandableItem = ({
  labelKey,
  icon,
  expandTestId,
  pathPrefix,
  children,
  isCollapsed,
  forceExpanded = false,
  searchQuery = '',
}: NavExpandableItemProps): JSX.Element => {
  const location = useLocation();
  const matchesChildPath = children.some(
    (child) => !isSubNavGroup(child) && location.pathname.startsWith(child.path),
  );
  const isActive = location.pathname.startsWith(pathPrefix) || matchesChildPath;
  const [isExpanded, setIsExpanded] = useState(isActive);

  useEffect(() => {
    if (isActive) setIsExpanded(true);
  }, [isActive]);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const effectiveExpanded = forceExpanded || isExpanded;
  const showChildren = effectiveExpanded && !isCollapsed;
  const sectionName = FM(labelKey);
  const expandLabel = effectiveExpanded
    ? FM('accessibility.collapseSection', sectionName)
    : FM('accessibility.expandSection', sectionName);

  return (
    <li>
      <button
        aria-controls={`nav-children-${expandTestId}`}
        aria-expanded={effectiveExpanded}
        aria-label={expandLabel}
        className={`sidebar-item flex w-full items-center gap-3 px-3 py-2 transition-colors ${
          isActive ? 'active' : ''
        }`}
        data-testid={expandTestId}
        type="button"
        onClick={handleToggle}
      >
        {!isCollapsed && (
          <svg
            aria-hidden="true"
            className={`size-3.5 shrink-0 transition-transform ${effectiveExpanded ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        )}
        <span aria-hidden="true" className="shrink-0">{icon}</span>
        {!isCollapsed && (
          <span className="flex-1 whitespace-nowrap text-left">
            <HighlightMatch query={searchQuery} text={sectionName} />
          </span>
        )}
      </button>

      {!isCollapsed && (
        <div className={`sidebar-expandable-children ${showChildren ? 'expanded' : 'collapsed'}`}>
          <ul className="ml-10 mt-1 space-y-1" id={`nav-children-${expandTestId}`}>
            {children.map((child) =>
              isSubNavGroup(child) ? (
                <NavSubGroup
                  key={child.testId}
                  expandTestId={child.expandTestId}
                  forceExpanded={forceExpanded}
                  items={child.items}
                  labelKey={child.labelKey}
                  searchQuery={searchQuery}
                  testId={child.testId}
                  {...(isValueDefined(child.path) ? { path: child.path } : {})}
                />
              ) : (
                <li key={child.path}>
                  <NavLink
                    aria-label={FM(child.labelKey)}
                    className={({ isActive: childActive }) =>
                      `sidebar-item flex items-center gap-2 px-3 py-1.5 text-sm transition-colors ${
                        childActive ? 'active' : ''
                      }`
                    }
                    data-testid={child.testId}
                    to={child.path}
                  >
                    {isValueDefined(child.iconName) ? (
                      <span aria-hidden="true" className="shrink-0">{getIcon(child.iconName)({})}</span>
                    ) : (
                      <span aria-hidden="true" className="inline-flex size-[18px] shrink-0 items-center justify-center text-xs opacity-70">{NAV_BULLET}</span>
                    )}
                    <span>
                      <HighlightMatch query={searchQuery} text={FM(child.labelKey)} />
                    </span>
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </li>
  );
};
