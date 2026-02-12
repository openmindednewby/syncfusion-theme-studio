import { useState, useCallback } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import { FM } from '@/localization/helpers';

const EXPAND_ARROW = '\u25BC';
const BULLET = '\u2022';

interface SubNavItem {
  path: string;
  labelKey: string;
  testId: string;
  /** When true the item is rendered with extra indentation as a sub-item. */
  indent?: boolean;
}

interface NavExpandableItemProps {
  labelKey: string;
  icon: string;
  expandTestId: string;
  pathPrefix: string;
  children: SubNavItem[];
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
        aria-expanded={isExpanded}
        aria-label={expandLabel}
        className={`sidebar-item flex w-full items-center gap-3 rounded-md px-3 py-2 transition-colors ${
          isActive ? 'active' : ''
        }`}
        data-testid={expandTestId}
        type="button"
        onClick={handleToggle}
      >
        <span aria-hidden="true" className="text-lg">{icon}</span>
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">{sectionName}</span>
            <span
              aria-hidden="true"
              className={`text-xs transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            >
              {EXPAND_ARROW}
            </span>
          </>
        )}
      </button>

      {showChildren ? <ul className="ml-6 mt-1 space-y-1">
          {children.map((child) => (
            <li key={child.path}>
              <NavLink
                aria-label={FM(child.labelKey)}
                className={({ isActive: childActive }) =>
                  `sidebar-item flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
                    childActive ? 'active' : ''
                  } ${child.indent === true ? 'ml-4' : ''}`
                }
                data-testid={child.testId}
                to={child.path}
              >
                <span aria-hidden="true" className="text-xs">{BULLET}</span>
                <span>{FM(child.labelKey)}</span>
              </NavLink>
            </li>
          ))}
        </ul> : null}
    </li>
  );
};
