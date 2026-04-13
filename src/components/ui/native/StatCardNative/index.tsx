import { memo, type ReactNode } from 'react';

import PillBadge from '@/components/ui/native/PillBadge';
import type { BaseStatCardProps } from '@/components/ui/shared/statCardTypes';
import { TrendDirection } from '@/components/ui/shared/trendDirection';
import { cn } from '@/utils/cn';
import { isValueDefined } from '@/utils/is';

export type StatCardNativeProps = BaseStatCardProps;
export { TrendDirection };

const TREND_PILL_CLASSES: Record<string, string> = {
  [TrendDirection.Up]: 'bg-success-500/10 text-success-500',
  [TrendDirection.Down]: 'bg-error-500/10 text-error-500',
  [TrendDirection.Neutral]: 'bg-surface-hover text-text-secondary',
};

const TREND_PREFIX: Record<string, string> = {
  [TrendDirection.Up]: '+',
  [TrendDirection.Down]: '',
  [TrendDirection.Neutral]: '',
};

const ACCENT_BORDER_CLASSES: Record<string, string> = {
  [TrendDirection.Up]: 'border-l-4 border-l-success-500',
  [TrendDirection.Down]: 'border-l-4 border-l-error-500',
  [TrendDirection.Neutral]: '',
};

function renderTrend(trend: BaseStatCardProps['trend']): ReactNode {
  if (!isValueDefined(trend)) return null;

  const pillClass = TREND_PILL_CLASSES[trend.direction] ?? TREND_PILL_CLASSES[TrendDirection.Neutral] ?? '';
  const prefix = TREND_PREFIX[trend.direction] ?? '';

  return (
    <PillBadge className="mt-2 inline-block" colorClass={pillClass}>
      {prefix}{trend.value}
    </PillBadge>
  );
}

function getAccentClass(trend: BaseStatCardProps['trend']): string {
  if (!isValueDefined(trend)) return '';
  return ACCENT_BORDER_CLASSES[trend.direction] ?? '';
}

const StatCardNative = memo(({
  label,
  value,
  trend,
  icon,
  testId = 'stat-card-native',
  className,
}: StatCardNativeProps): JSX.Element => (
  <div className={cn('card', getAccentClass(trend), className)} data-testid={testId}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
        <p className="mt-1 text-3xl font-bold text-text-primary">{String(value)}</p>
        {renderTrend(trend)}
      </div>
      {isValueDefined(icon) ? (
        <div className="text-text-secondary">{icon}</div>
      ) : null}
    </div>
  </div>
));

StatCardNative.displayName = 'StatCardNative';

export default StatCardNative;
