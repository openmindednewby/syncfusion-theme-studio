import { memo } from 'react';

import { FM } from '@/localization/utils/helpers';

import type { TradeRecord } from '../types';

function computeFillRate(trades: TradeRecord[]): number {
  if (trades.length === 0) return 0;
  const filled = trades.filter((t) => t.status === 'Filled').length;
  return Math.round((filled / trades.length) * 100);
}

function computeTotalVolume(trades: TradeRecord[]): number {
  return trades.reduce((sum, t) => sum + t.total, 0);
}

function computeAvgPrice(trades: TradeRecord[]): number {
  if (trades.length === 0) return 0;
  const sum = trades.reduce((acc, t) => acc + t.price, 0);
  return sum / trades.length;
}

function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatUsdPrecise(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

interface KpiCardData {
  label: string;
  value: string;
}

function buildKpiCards(trades: TradeRecord[]): KpiCardData[] {
  return [
    { label: FM('tradeHistory.kpi.totalTrades'), value: String(trades.length) },
    { label: FM('tradeHistory.kpi.fillRate'), value: `${String(computeFillRate(trades))}%` },
    { label: FM('tradeHistory.kpi.totalVolume'), value: formatUsd(computeTotalVolume(trades)) },
    { label: FM('tradeHistory.kpi.avgPrice'), value: formatUsdPrecise(computeAvgPrice(trades)) },
  ];
}

interface TradeHistoryKpisProps {
  trades: TradeRecord[];
}

const TradeHistoryKpis = memo(({ trades }: TradeHistoryKpisProps): JSX.Element => {
  const cards = buildKpiCards(trades);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((kpi) => (
        <div key={kpi.label} className="card">
          <p className="text-xs uppercase tracking-wide text-text-muted">{kpi.label}</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
});

TradeHistoryKpis.displayName = 'TradeHistoryKpis';

export default TradeHistoryKpis;
