import { useState, useCallback, useEffect } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { FM } from '@/localization/helpers';

import { NavSubGroup } from './NavSubGroup';

export interface SubNavItem {
  path: string;
  labelKey: string;
  testId: string;
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
}

export const NavExpandableItem = ({
  labelKey,
  icon,
  expandTestId,
  pathPrefix,
  children,
  isCollapsed,
}: NavExpandableItemProps): JSX.Element => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(pathPrefix);
  const [isExpanded, setIsExpanded] = useState(isActive);

  useEffect(() => {
    if (isActive) setIsExpanded(true);
  }, [isActive]);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const showChildren = isExpanded && !isCollapsed;
  const sectionName = FM(labelKey);
  const expandLabel = isExpanded
    ? FM('accessibility.collapseSection', sectionName)
    : FM('accessibility.expandSection', sectionName);

  return (
    <li>
      <button
        aria-controls={`nav-children-${expandTestId}`}
        aria-expanded={isExpanded}
        aria-label={expandLabel}
        className={`sidebar-item flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors ${
          isActive ? 'active' : ''
        }`}
        data-testid={expandTestId}
        type="button"
        onClick={handleToggle}
      >
        <span aria-hidden="true" className="shrink-0">{icon}</span>
        {!isCollapsed && (
          <>
            <svg
              aria-hidden="true"
              className={`size-4 shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            </svg>
            <span className="flex-1 text-left">{sectionName}</span>
          </>
        )}
      </button>

      {showChildren ? (
        <ul className="ml-6 mt-1 space-y-1" id={`nav-children-${expandTestId}`}>
          {children.map((child) =>
            isSubNavGroup(child) ? (
              <NavSubGroup
                key={child.testId}
                expandTestId={child.expandTestId}
                items={child.items}
                labelKey={child.labelKey}
                path={child.path}
                testId={child.testId}
              />
            ) : (
              <li key={child.path}>
                <NavLink
                  aria-label={FM(child.labelKey)}
                  className={({ isActive: childActive }) =>
                    `sidebar-item flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                      childActive ? 'active' : ''
                    }`
                  }
                  data-testid={child.testId}
                  to={child.path}
                >
                  <span>{FM(child.labelKey)}</span>
                </NavLink>
              </li>
            )
          )}
        </ul>
      ) : null}
    </li>
  );
};
