/**
 * Organization switcher dropdown for the sidebar header.
 * Shows the current org avatar, name, and plan badge.
 * Clicking opens a dropdown to switch between organizations.
 */
import { useEffect, useRef, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils/is';

import { OrgAvatar } from './OrgAvatar';
import { OrgBadge } from './OrgBadge';
import { OrgSwitcherMenu } from './OrgSwitcherMenu';
import { useCurrentOrg } from '../hooks/useCurrentOrg';
import { useOrganizations } from '../hooks/useOrganizations';

import type { Organization } from '../types';

const MENU_GAP = 4;
const MENU_WIDTH = 288;

interface MenuPosition {
  top: number;
  left: number;
  width: number;
}

interface OrgSwitcherProps {
  isCollapsed: boolean;
}

export const OrgSwitcher = ({ isCollapsed }: OrgSwitcherProps): JSX.Element | null => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { currentOrg, switchOrg } = useCurrentOrg();
  const { organizations } = useOrganizations();

  // Close dropdown when clicking outside (menu is portaled to body)
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent): void => {
      if (!(e.target instanceof Node)) return;
      const container = containerRef.current;
      if (isValueDefined(container) && container.contains(e.target)) return;
      const menu = document.querySelector(`[data-testid="${TestIds.ORG_SWITCHER_MENU}"]`);
      if (isValueDefined(menu) && menu.contains(e.target)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isValueDefined(currentOrg)) return null;

  const handleToggle = (): void => {
    setIsOpen((prev) => {
      if (!prev && isValueDefined(buttonRef.current)) {
        const rect = buttonRef.current.getBoundingClientRect();
        setMenuPosition({ top: rect.bottom + MENU_GAP, left: rect.left, width: MENU_WIDTH });
      }
      return !prev;
    });
  };

  const handleSelect = (org: Organization): void => {
    switchOrg(org);
    setIsOpen(false);
  };

  if (isCollapsed)
    return (
      <div className="flex justify-center px-2 py-2">
        <OrgAvatar logoUrl={currentOrg.logoUrl} name={currentOrg.name} size="sm" />
      </div>
    );

  return (
    <div ref={containerRef} className="relative px-3 py-2">
      <button
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={FM('orgSwitcher.label')}
        className="flex w-full items-center gap-2.5 rounded-lg p-2 transition-colors hover:brightness-125"
        data-testid={TestIds.ORG_SWITCHER}
        type="button"
        onClick={handleToggle}
      >
        <OrgAvatar logoUrl={currentOrg.logoUrl} name={currentOrg.name} size="sm" />
        <div className="flex min-w-0 flex-1 flex-col text-left">
          <span className="truncate text-sm font-semibold text-[var(--component-sidebar-text-color)]">
            {currentOrg.name}
          </span>
        </div>
        <OrgBadge plan={currentOrg.plan} />
        <svg
          aria-hidden="true"
          className={`size-4 shrink-0 text-[var(--component-sidebar-text-color)] opacity-60 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M19 9l-7 7-7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg>
      </button>
      {isOpen && isValueDefined(menuPosition) ? <OrgSwitcherMenu
          activeOrgId={currentOrg.id}
          organizations={organizations}
          position={menuPosition}
          onSelect={handleSelect}
        /> : null}
    </div>
  );
};
