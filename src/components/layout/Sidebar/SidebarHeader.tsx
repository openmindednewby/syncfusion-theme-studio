/**
 * Sidebar header with CyberWatch branding and collapse toggle.
 */
import { CyberWatchLogo, IconChevronLeft } from '@/components/icons';
import { FM } from '@/localization/helpers';
import { TestIds } from '@/shared/testIds';


interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const SidebarHeader = ({
  isCollapsed,
  onToggle,
}: SidebarHeaderProps): JSX.Element => {
  const toggleLabel = isCollapsed
    ? FM('sidebar.expand')
    : FM('sidebar.collapse');

  return (
    <div className="flex h-header items-center justify-between border-b border-border px-4">
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
        <IconChevronLeft
          className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
};
