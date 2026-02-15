/**
 * Toolbar for the Alert Management section.
 * Contains search input, filter toggle, date range, and action icons.
 */
import { memo } from 'react';

import { FM } from '@/localization/helpers';

const SEARCH_MAX_WIDTH = 300;

export const AlertToolbar = memo((): JSX.Element => (
  <div
    className="flex items-center justify-between gap-3 py-3"
    data-testid="alert-toolbar"
  >
    {/* Left: Search input */}
    <div className="relative" style={{ maxWidth: `${String(SEARCH_MAX_WIDTH)}px` }}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-muted"
      >
        &#128269;
      </span>
      <input
        aria-label={FM('gridShowcase.keywordSearch')}
        className="w-full rounded border border-border-default bg-transparent py-1.5 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted"
        data-testid="alert-toolbar-search"
        placeholder={FM('gridShowcase.keywordSearch')}
        type="text"
      />
    </div>

    {/* Center: Show Filter toggle */}
    <button
      aria-label={FM('gridShowcase.showFilter')}
      className="flex items-center gap-2 rounded border border-border-default px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary"
      data-testid="alert-toolbar-filter"
      type="button"
    >
      <span aria-hidden="true">&#9776;</span>
      {FM('gridShowcase.showFilter')}
      <span aria-hidden="true">&#9662;</span>
    </button>

    {/* Right: Date range and action icons */}
    <div className="flex items-center gap-3">
      <button
        aria-label={FM('common.refresh')}
        className="text-text-muted hover:text-text-primary"
        data-testid="alert-toolbar-refresh"
        type="button"
      >
        &#8635;
      </button>
      <span className="text-sm text-text-secondary">
        {FM('gridShowcase.dateRangeLabel')}
      </span>
      <button
        aria-label={FM('common.export')}
        className="text-text-muted hover:text-text-primary"
        data-testid="alert-toolbar-export"
        type="button"
      >
        &#8681;
      </button>
      <button
        aria-label={FM('common.settings')}
        className="text-text-muted hover:text-text-primary"
        data-testid="alert-toolbar-settings"
        type="button"
      >
        &#9881;
      </button>
    </div>
  </div>
));

AlertToolbar.displayName = 'AlertToolbar';
