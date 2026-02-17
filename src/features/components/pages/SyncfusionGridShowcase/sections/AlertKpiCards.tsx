/**
 * KPI summary cards row for the Alert Management section.
 * Displays 8 metric cards with accent-colored left borders.
 */
import { memo } from 'react';

import { FM } from '@/localization/helpers';

const BORDER_WIDTH = '3px';

const BORDER_RED = '#EF4444';
const BORDER_ORANGE = '#F97316';
const BORDER_TEAL = '#14B8A6';
const BORDER_GREEN = '#22C55E';

interface KpiCard {
  labelKey: string;
  value: number;
  borderColor: string;
}

const KPI_CARDS: KpiCard[] = [
  { labelKey: 'gridShowcase.kpiCritical', value: 0, borderColor: BORDER_RED },
  { labelKey: 'gridShowcase.kpiHigh', value: 447, borderColor: BORDER_ORANGE },
  { labelKey: 'gridShowcase.kpiAwaitingAnalysts', value: 637, borderColor: BORDER_TEAL },
  { labelKey: 'gridShowcase.kpiTriageRunning', value: 637, borderColor: BORDER_TEAL },
  { labelKey: 'gridShowcase.kpiAutomationsRunning', value: 4, borderColor: BORDER_GREEN },
  { labelKey: 'gridShowcase.kpiSlaAtRisk', value: 52, borderColor: BORDER_RED },
  { labelKey: 'gridShowcase.kpiSlaExpired', value: 214, borderColor: BORDER_RED },
  { labelKey: 'gridShowcase.kpiTotalActiveAlerts', value: 641, borderColor: BORDER_TEAL },
];

export const AlertKpiCards = memo((): JSX.Element => (
  <div
    className="grid grid-cols-8 gap-3"
    data-testid="alert-kpi-cards"
  >
    {KPI_CARDS.map((card) => (
      <div
        key={card.labelKey}
        className="rounded p-3"
        style={{
          backgroundColor: 'rgb(var(--color-surface))',
          borderLeft: `${BORDER_WIDTH} solid ${card.borderColor}`,
        }}
      >
        <div className="text-2xl font-bold text-text-primary">
          {String(card.value)}
        </div>
        <div className="mt-1 text-xs text-text-secondary">
          {FM(card.labelKey)}
        </div>
        <div className="mt-0.5 text-xs text-text-muted">
          {'\u2192'} {FM('gridShowcase.kpiStable')}
        </div>
      </div>
    ))}
  </div>
));

AlertKpiCards.displayName = 'AlertKpiCards';
