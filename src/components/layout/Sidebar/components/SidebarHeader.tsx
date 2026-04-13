/**
 * Sidebar header with ThemeStudio branding, org switcher, and collapse toggle.
 */
import type { Ref } from 'react';

import { ThemeStudioLogo, IconMenu } from '@/components/icons';
import { OrgSwitcher } from '@/features/multi-tenant/components/OrgSwitcher';
import { FM } from '@/localization/utils/helpers';
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
    <div ref={headerRef}>
      <div
        className={`flex h-header items-center border-b border-[var(--component-sidebar-border-right)] ${
          isCollapsed ? '' : 'justify-between px-4'
        }`}
        style={isCollapsed ? { paddingLeft: 'var(--component-sidebar-menu-button-padding-left, 8px)' } : undefined}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <ThemeStudioLogo />
            <span className="text-lg font-bold text-primary-500">
              {FM('sidebar.brandName')}
            </span>
          </div>
        )}
        <button
          aria-label={toggleLabel}
          className={`sidebar-item flex items-center justify-center rounded transition-colors ${
            isCollapsed ? 'py-2' : 'p-1.5'
          }`}
          data-testid={TestIds.SIDEBAR_TOGGLE}
          type="button"
          onClick={onToggle}
        >
          {isCollapsed ? (
            <IconMenu className="sidebar-nav-icon shrink-0" />
          ) : (
            <svg
              aria-hidden="true"
              className="size-3.5 shrink-0"
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
          )}
        </button>
      </div>
      <OrgSwitcher isCollapsed={isCollapsed} />
    </div>
  );
};
