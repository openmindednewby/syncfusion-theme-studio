import { memo, useEffect } from 'react';

import { ProgressBarShape } from '@/components/ui/shared/progressBarShape';
import { ProgressBarVariant } from '@/components/ui/shared/progressBarTypes';
import type { BaseProgressBarProps } from '@/components/ui/shared/progressBarTypes';
import { isNotEmptyString, isValueDefined } from '@/utils/is';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils/loadSyncfusionCss';

export type SyncfusionProgressBarProps = BaseProgressBarProps;

export { ProgressBarVariant };

const MAX_PERCENT = 100;

const SIZE_MAP = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

const FILL_MAP: Record<ProgressBarVariant, string> = {
  [ProgressBarVariant.Default]: 'var(--component-progress-fill)',
  [ProgressBarVariant.Success]: 'var(--component-progress-success)',
  [ProgressBarVariant.Warning]: 'var(--component-progress-warning)',
  [ProgressBarVariant.Danger]: 'var(--component-progress-danger)',
};

const SHAPE_RADIUS_MAP: Record<ProgressBarShape, string> = {
  [ProgressBarShape.Sharp]: '0',
  [ProgressBarShape.Rounded]: '50px',
};

const SyncfusionProgressBar = memo(({
  value,
  max = MAX_PERCENT,
  variant = ProgressBarVariant.Default,
  showLabel = false,
  size = 'md',
  indeterminate = false,
  testId = 'sf-progressbar',
  label,
  shape,
}: SyncfusionProgressBarProps): JSX.Element => {
  useEffect(() => { loadSyncfusionCss(SyncfusionCssModule.Notifications).catch(() => undefined); }, []);
  const percent = Math.min(Math.max((value / max) * MAX_PERCENT, 0), MAX_PERCENT);
  const fillColor = FILL_MAP[variant];
  const radius = isValueDefined(shape) ? SHAPE_RADIUS_MAP[shape] : 'var(--component-progress-radius)';

  return (
    <div className="e-progressbar" data-testid={testId}>
      {(showLabel || isNotEmptyString(label)) ? <div className="mb-1 flex items-center justify-between">
          {isNotEmptyString(label) ? <span
              className="text-sm font-medium"
              style={{ color: 'var(--component-progress-text)' }}
            >
              {label}
            </span> : null}
          {showLabel ? <span
              className="text-sm"
              style={{ color: 'var(--component-progress-text)' }}
            >
              {Math.round(percent)}%
            </span> : null}
        </div> : null}
      <div
        aria-valuemax={max}
        aria-valuemin={0}
        aria-valuenow={indeterminate ? undefined : value}
        className={`w-full overflow-hidden ${SIZE_MAP[size]}`}
        role="progressbar"
        style={{ backgroundColor: 'var(--component-progress-track)', borderRadius: radius }}
      >
        <div
          className={`h-full transition-all duration-300 ${
            indeterminate ? 'animate-progress-indeterminate' : ''
          }`}
          style={{
            width: indeterminate ? '50%' : `${percent}%`,
            backgroundColor: fillColor,
            borderRadius: radius,
          }}
        />
      </div>
    </div>
  );
});

SyncfusionProgressBar.displayName = 'SyncfusionProgressBar';
export default SyncfusionProgressBar;
