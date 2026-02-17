import { useState, useCallback, useEffect } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { FM } from '@/localization/helpers';
import { isValueDefined } from '@/utils/is';


interface SubNavItem {
  path: string;
  labelKey: string;
  testId: string;
}

interface NavSubGroupProps {
  labelKey: string;
  testId: string;
  expandTestId: string;
  /** Optional path used for active-state detection */
  path?: string | undefined;
  items: SubNavItem[];
}

export const NavSubGroup = ({
  labelKey,
  testId,
  expandTestId,
  path,
  items,
}: NavSubGroupProps): JSX.Element => {
  const location = useLocation();
  const isChildActive = items.some((item) => location.pathname === item.path);
  const isHeaderActive = isValueDefined(path) && path !== '' ? location.pathname === path : false;
  const [isExpanded, setIsExpanded] = useState(isChildActive || isHeaderActive);

  // Auto-expand when navigating to a child or header route (never auto-collapse)
  useEffect(() => {
    if (isChildActive || isHeaderActive) setIsExpanded(true);
  }, [isChildActive, isHeaderActive]);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const sectionName = FM(labelKey);
  const expandLabel = isExpanded
    ? FM('accessibility.collapseSection', sectionName)
    : FM('accessibility.expandSection', sectionName);

  return (
    <li>
      <button
        aria-controls={`subgroup-${testId}`}
        aria-expanded={isExpanded}
        aria-label={expandLabel}
        className={`sidebar-item flex w-full items-center gap-3 rounded-md px-3 py-1.5 text-sm transition-colors ${
          isChildActive || isHeaderActive ? 'active' : ''
        }`}
        data-testid={expandTestId}
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
          <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </svg>
        <span className="flex-1 text-left">{sectionName}</span>
      </button>

      {isExpanded ? (
        <ul className="ml-4 mt-1 space-y-0.5" id={`subgroup-${testId}`}>
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                aria-label={FM(item.labelKey)}
                className={({ isActive: childActive }) =>
                  `sidebar-item flex items-center gap-2 rounded-md px-3 py-1 text-xs transition-colors ${
                    childActive ? 'active' : ''
                  }`
                }
                data-testid={item.testId}
                to={item.path}
              >
                <span>{FM(item.labelKey)}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
};
