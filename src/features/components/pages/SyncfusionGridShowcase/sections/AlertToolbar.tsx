/**
 * Toolbar for the Alert Management section.
 * Contains search input, filter toggle, date range, and action icons.
 */
import { memo } from 'react';

import { IconDownload, IconFilter, IconRefresh, IconSearch, IconSettings } from '@/components/icons';
import { SearchInput } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const SEARCH_MAX_WIDTH = 300;

interface AlertToolbarProps {
  isFilterVisible?: boolean;
  onToggleFilter?: () => void;
}

export const AlertToolbar = memo(({
  isFilterVisible = false,
  onToggleFilter,
}: AlertToolbarProps): JSX.Element => {
  const filterLabel = isFilterVisible
    ? FM('gridShowcase.hideFilter')
    : FM('gridShowcase.showFilter');

  return (
    <div
      className="flex items-center justify-between gap-3 py-3"
      data-testid={TestIds.ALERT_TOOLBAR}
    >
      {/* Left: Search input */}
      <SearchInput
        aria-label={FM('gridShowcase.keywordSearch')}
        containerClassName="w-full"
        iconClassName="left-3"
        placeholder={FM('gridShowcase.keywordSearch')}
        renderIcon={() => <IconSearch />}
        style={{ maxWidth: `${String(SEARCH_MAX_WIDTH)}px` }}
        testId={TestIds.ALERT_TOOLBAR_SEARCH}
      />

      {/* Center: Show/Hide Filter toggle */}
      <button
        aria-label={filterLabel}
        aria-pressed={isFilterVisible}
        className={`flex items-center gap-2 rounded border px-3 py-1.5 text-sm transition-colors ${
          isFilterVisible
            ? 'border-primary-500 text-primary-500'
            : 'border-border-default text-text-secondary hover:text-text-primary'
        }`}
        data-testid={TestIds.ALERT_TOOLBAR_FILTER}
        type="button"
        onClick={onToggleFilter}
      >
        <span aria-hidden="true"><IconFilter /></span>
        {filterLabel}
        <span aria-hidden="true">{isFilterVisible ? '\u25B4' : '\u25BE'}</span>
      </button>

      {/* Right: Date range and action icons */}
      <div className="flex items-center gap-3">
        <button
          aria-label={FM('common.refresh')}
          className="text-text-muted hover:text-text-primary"
          data-testid={TestIds.ALERT_TOOLBAR_REFRESH}
          type="button"
        >
          <IconRefresh />
        </button>
        <span className="text-sm text-text-secondary">
          {FM('gridShowcase.dateRangeLabel')}
        </span>
        <button
          aria-label={FM('common.export')}
          className="text-text-muted hover:text-text-primary"
          data-testid={TestIds.ALERT_TOOLBAR_EXPORT}
          type="button"
        >
          <IconDownload />
        </button>
        <button
          aria-label={FM('common.settings')}
          className="text-text-muted hover:text-text-primary"
          data-testid={TestIds.ALERT_TOOLBAR_SETTINGS}
          type="button"
        >
          <IconSettings />
        </button>
      </div>
    </div>
  );
});

AlertToolbar.displayName = 'AlertToolbar';
