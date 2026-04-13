import BusinessTableShell from '@/components/ui/native/BusinessTableShell';
import PillBadge from '@/components/ui/native/PillBadge';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import {
  FALLBACK_COLOR_CLASS,
  SIDE_COLOR_CLASS,
  STATUS_COLOR_CLASS,
  TABLE_MIN_WIDTH,
} from '../constants';

import type { TradeRecord } from '../types';

function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const SIDE_KEY_MAP: Record<TradeRecord['side'], string> = {
  Buy: 'tradeHistory.side.buy',
  Sell: 'tradeHistory.side.sell',
};

const STATUS_KEY_MAP: Record<TradeRecord['status'], string> = {
  Filled: 'tradeHistory.status.filled',
  'Partially Filled': 'tradeHistory.status.partiallyFilled',
  Cancelled: 'tradeHistory.status.cancelled',
  Expired: 'tradeHistory.status.expired',
};

const COLUMN_KEYS = [
  'tradeHistory.column.id',
  'tradeHistory.column.ticker',
  'tradeHistory.column.side',
  'tradeHistory.column.quantity',
  'tradeHistory.column.price',
  'tradeHistory.column.total',
  'tradeHistory.column.status',
  'tradeHistory.column.executedAt',
  'tradeHistory.column.exchange',
  'tradeHistory.column.broker',
] as const;

const HEADER_CLASSES = 'sticky top-0 z-10 bg-surface-hover';

interface TradeHistoryTableProps {
  trades: TradeRecord[];
}

const TradeHistoryTable = ({ trades }: TradeHistoryTableProps): JSX.Element => {
  if (trades.length === 0)
    return (
      <div className="py-12 text-center text-text-secondary">
        {FM('tradeHistory.empty')}
      </div>
    );

  return (
    <BusinessTableShell resultCount={trades.length} testId={TestIds.TRADE_HISTORY_TABLE}>
      <table
        className="w-full text-sm"
        style={{ minWidth: TABLE_MIN_WIDTH }}
      >
        <thead className={HEADER_CLASSES}>
          <tr className="border-b border-border bg-surface-hover">
            {COLUMN_KEYS.map((key) => (
              <th
                key={key}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-muted"
              >
                {FM(key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {trades.map((trade, idx) => (
            <tr
              key={trade.id}
              className={`transition-colors duration-150 hover:bg-surface-hover ${idx % 2 === 1 ? 'bg-surface/50' : ''}`}
            >
              <td className="px-4 py-3 font-medium text-text-primary">
                {trade.id}
              </td>
              <td className="px-4 py-3 font-medium text-text-primary">
                {trade.ticker}
              </td>
              <td className="px-4 py-3">
                <PillBadge colorClass={SIDE_COLOR_CLASS[trade.side] ?? FALLBACK_COLOR_CLASS}>
                  {FM(SIDE_KEY_MAP[trade.side])}
                </PillBadge>
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-text-secondary">
                {String(trade.quantity)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-text-secondary">
                {formatUsd(trade.price)}
              </td>
              <td className="px-4 py-3 text-right tabular-nums font-medium text-text-primary">
                {formatUsd(trade.total)}
              </td>
              <td className="px-4 py-3">
                <PillBadge colorClass={STATUS_COLOR_CLASS[trade.status] ?? FALLBACK_COLOR_CLASS}>
                  {FM(STATUS_KEY_MAP[trade.status])}
                </PillBadge>
              </td>
              <td className="px-4 py-3 text-text-muted">
                {formatDate(trade.executedAt)}
              </td>
              <td className="px-4 py-3 text-text-secondary">
                {trade.exchange}
              </td>
              <td className="px-4 py-3 text-text-secondary">
                {trade.broker}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BusinessTableShell>
  );
};

export default TradeHistoryTable;
