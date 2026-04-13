import { memo, useEffect } from 'react';

import type { BaseProgressRingProps } from '@/components/ui/shared/progressRingTypes';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils/loadSyncfusionCss';

export type SyncfusionProgressRingProps = BaseProgressRingProps;

const MAX_PERCENT = 100;
const DEFAULT_SIZE = 44;
const DEFAULT_STROKE = 4;
const HALF_TURN = 90;

const SyncfusionProgressRing = memo(({
  value,
  max = MAX_PERCENT,
  size = DEFAULT_SIZE,
  strokeWidth = DEFAULT_STROKE,
  testId = 'sf-progressring',
}: SyncfusionProgressRingProps): JSX.Element => {
  useEffect(() => { loadSyncfusionCss(SyncfusionCssModule.Notifications).catch(() => undefined); }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(Math.max((value / max) * MAX_PERCENT, 0), MAX_PERCENT);
  const offset = circumference - (percent / MAX_PERCENT) * circumference;
  const center = size / 2;

  return (
    <svg
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={value}
      className="e-progressbar"
      data-testid={testId}
      height={size}
      role="progressbar"
      width={size}
    >
      <circle
        cx={center}
        cy={center}
        fill="none"
        r={radius}
        stroke="var(--component-progress-track)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={center}
        cy={center}
        fill="none"
        r={radius}
        stroke="var(--component-progress-fill)"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={{ transition: 'stroke-dashoffset 300ms ease' }}
        transform={`rotate(-${HALF_TURN} ${center} ${center})`}
      />
    </svg>
  );
});

SyncfusionProgressRing.displayName = 'SyncfusionProgressRing';

export default SyncfusionProgressRing;
