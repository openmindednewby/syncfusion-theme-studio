/**
 * Single organization row inside the OrgSwitcherMenu dropdown.
 */
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { OrgAvatar } from './OrgAvatar';
import { OrgBadge } from './OrgBadge';

import type { Organization } from '../types';

interface OrgMenuItemProps {
  org: Organization;
  isActive: boolean;
  onSelect: (org: Organization) => void;
}

export const OrgMenuItem = ({ org, isActive, onSelect }: OrgMenuItemProps): JSX.Element => (
  <button
    aria-label={FM('orgSwitcher.switchTo', org.name)}
    aria-selected={isActive}
    className={`flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left transition-colors hover:brightness-125 ${
      isActive ? 'brightness-125' : ''
    }`}
    data-testid={TestIds.ORG_SWITCHER_ITEM}
    role="option"
    type="button"
    onClick={() => onSelect(org)}
  >
    <OrgAvatar logoUrl={org.logoUrl} name={org.name} size="sm" />
    <div className="flex min-w-0 flex-1 flex-col">
      <span className="truncate text-sm font-medium text-[var(--component-sidebar-text-color)]">
        {org.name}
      </span>
      <span className="text-xs text-[var(--component-sidebar-text-color)] opacity-60">
        {FM('orgSwitcher.members', String(org.memberCount))}
      </span>
    </div>
    <div className="flex items-center gap-2">
      <OrgBadge plan={org.plan} />
      {isActive ? <svg
          aria-hidden="true"
          className="size-4 shrink-0 text-primary-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </svg> : null}
    </div>
  </button>
);
