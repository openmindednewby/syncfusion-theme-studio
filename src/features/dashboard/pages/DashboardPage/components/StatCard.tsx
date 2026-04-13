import { memo } from 'react';

import PillBadge from '@/components/ui/native/PillBadge';
import { isValueDefined } from '@/utils/is';

interface StatCardProps {
  label: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  testId: string;
}

function getTrendBorderClass(trend: StatCardProps['trend']): string {
  if (!isValueDefined(trend)) return '';
  return trend.isPositive ? 'border-l-4 border-l-success-500' : 'border-l-4 border-l-error-500';
}

export const StatCard = memo(({ label, value, trend, testId }: StatCardProps): JSX.Element => (
  <div
    className={`card ${getTrendBorderClass(trend)}`}
    data-testid={testId}
  >
    <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
    <p className="mt-1 text-3xl font-bold text-text-primary">{value}</p>
    {trend ? (
      <PillBadge
        className="mt-2 inline-block"
        colorClass={trend.isPositive ? 'bg-success-500/10 text-success-500' : 'bg-error-500/10 text-error-500'}
      >
        {trend.isPositive ? '+' : ''}
        {trend.value}
      </PillBadge>
    ) : null}
  </div>
));

StatCard.displayName = 'StatCard';
