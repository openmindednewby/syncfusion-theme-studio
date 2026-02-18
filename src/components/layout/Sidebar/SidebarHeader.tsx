/**
 * Sidebar header with CyberWatch branding and collapse toggle.
 */
import type { Ref } from 'react';

import { CyberWatchLogo } from '@/components/icons';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
  headerRef: Ref<HTMLDivElement>;
}

export const SidebarHeader = ({
  isCollapsed,
  onToggle,
  headerRef,
}: SidebarHeaderProps): JSX.Element => {
  const toggleLabel = isCollapsed
    ? FM('sidebar.expand')
    : FM('sidebar.collapse');

  return (
    <div
      ref={headerRef}
      className="flex h-header items-center justify-between border-b border-border px-4"
    >
      {!isCollapsed && (
        <div className="flex items-center gap-2">
          <CyberWatchLogo />
          <span className="text-lg font-bold text-primary-500">
            {FM('sidebar.brandName')}
          </span>
        </div>
      )}
      {isCollapsed ? <CyberWatchLogo /> : null}
      <button
        aria-label={toggleLabel}
        className="sidebar-item rounded p-1.5 transition-colors"
        data-testid={TestIds.SIDEBAR_TOGGLE}
        type="button"
        onClick={onToggle}
      >
        <svg
          aria-hidden="true"
          className={`size-3.5 shrink-0 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M6 4l4 4-4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
          />
        </svg>
      </button>
    </div>
  );
};
