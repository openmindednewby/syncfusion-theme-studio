/**
 * Trade History page: completed/historical trades with KPI summary,
 * ticker search, and native HTML table with PillBadge status badges.
 */
import { memo, useMemo, useState } from 'react';

import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import { TRADE_HISTORY } from './data/tradeHistoryData';
import TradeHistoryKpis from './sections/TradeHistoryKpis';
import TradeHistoryTable from './sections/TradeHistoryTable';

export function filterByTicker(
  trades: typeof TRADE_HISTORY,
  query: string,
): typeof TRADE_HISTORY {
  const q = query.trim().toLowerCase();
  if (q === '') return trades;
  return trades.filter((t) => t.ticker.toLowerCase().includes(q));
}

const INPUT_CLASS =
  'rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';

const IncidentsManagementPage = memo((): JSX.Element => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => filterByTicker(TRADE_HISTORY, search),
    [search],
  );

  return (
    <div className="space-y-4" data-testid={TestIds.TRADE_HISTORY_PAGE}>
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          {FM('tradeHistory.title')}
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          {FM('tradeHistory.description')}
        </p>
      </div>

      <TradeHistoryKpis trades={filtered} />

      <div className="flex items-center gap-3">
        <input
          aria-label={FM('tradeHistory.filterPlaceholder')}
          className={INPUT_CLASS}
          placeholder={FM('tradeHistory.filterPlaceholder')}
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <TradeHistoryTable trades={filtered} />
      </div>
    </div>
  );
});

IncidentsManagementPage.displayName = 'IncidentsManagementPage';

export default IncidentsManagementPage;
