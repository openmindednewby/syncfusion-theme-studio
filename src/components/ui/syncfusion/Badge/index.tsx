import { memo, useEffect } from 'react';

import { BadgeVariant } from '@/components/ui/shared/badgeTypes';
import type { BaseBadgeProps } from '@/components/ui/shared/badgeTypes';
import { isValueDefined } from '@/utils/is';
import { loadSyncfusionCss, SyncfusionCssModule } from '@/utils/loadSyncfusionCss';

export type SyncfusionBadgeProps = BaseBadgeProps;

export { BadgeVariant };

const MAX_COUNT_DEFAULT = 99;

const SyncfusionBadge = memo(({
  variant = BadgeVariant.Info,
  children,
  count,
  dot = false,
  testId = 'sf-badge',
  maxCount = MAX_COUNT_DEFAULT,
}: SyncfusionBadgeProps): JSX.Element => {
  useEffect(() => { loadSyncfusionCss(SyncfusionCssModule.Notifications).catch(() => undefined); }, []);
  const bgVar = `var(--component-badge-${variant}-bg)`;
  const textVar = `var(--component-badge-${variant}-text)`;

  const displayCount = isValueDefined(count) && count > maxCount ? `${maxCount}+` : count;

  if (dot)
    return (
      <span className="e-badge-wrapper relative inline-flex" data-testid={testId}>
        {children}
        <span
          className="e-badge absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2"
          style={{
            backgroundColor: bgVar,
            borderColor: 'var(--component-avatar-border)',
          }}
        />
      </span>
    );

  if (isValueDefined(count))
    return (
      <span className="e-badge-wrapper relative inline-flex" data-testid={testId}>
        {children}
        <span
          className="e-badge absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-bold"
          style={{
            backgroundColor: bgVar,
            color: textVar,
          }}
        >
          {displayCount}
        </span>
      </span>
    );

  return (
    <span
      className="e-badge inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
      data-testid={testId}
      style={{ backgroundColor: bgVar, color: textVar }}
    >
      {children}
    </span>
  );
});

SyncfusionBadge.displayName = 'SyncfusionBadge';
export default SyncfusionBadge;
