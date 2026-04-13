/**
 * Dropdown menu listing all available organizations.
 * Shows a checkmark next to the currently active org.
 */
import type React from 'react';

import { createPortal } from 'react-dom';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { OrgMenuItem } from './OrgMenuItem';

import type { Organization } from '../types';

interface MenuPosition {
  top: number;
  left: number;
  width: number;
}

interface OrgSwitcherMenuProps {
  organizations: Organization[];
  activeOrgId: number;
  position: MenuPosition;
  onSelect: (org: Organization) => void;
}

export const OrgSwitcherMenu = ({
  organizations,
  activeOrgId,
  position,
  onSelect,
}: OrgSwitcherMenuProps): React.ReactPortal => createPortal(
  <div
    className="fixed z-[9999] w-72 rounded-lg border border-[var(--component-sidebar-border-right)] bg-[var(--component-sidebar-background)] shadow-lg"
    data-testid={TestIds.ORG_SWITCHER_MENU}
    role="listbox"
    style={{ top: position.top, left: position.left, width: position.width }}
  >
    <div className="p-1.5">
      <p className="px-2.5 py-1.5 text-xs font-medium uppercase tracking-wide text-[var(--component-sidebar-text-color)] opacity-60">
        {FM('orgSwitcher.selectOrg')}
      </p>
      {organizations.map((org) => (
        <OrgMenuItem
          key={org.id}
          isActive={org.id === activeOrgId}
          org={org}
          onSelect={onSelect}
        />
      ))}
    </div>
  </div>,
  document.body,
);
