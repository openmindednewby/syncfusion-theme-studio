import { memo } from 'react';

import PillBadge from '@/components/ui/native/PillBadge';
import type { StatusConfig } from '@/components/ui/shared/statusBadgeTypes';
import { FM } from '@/localization/utils/helpers';
import { isValueDefined } from '@/utils/is';

export type { StatusConfig };

interface StatusBadgeNativeProps {
  /** The current status value */
  status: string | number | undefined;
  /** Map from status key to visual configuration */
  statusMap: ReadonlyMap<string, StatusConfig> | ReadonlyMap<number, StatusConfig>;
  /** Test ID for E2E testing */
  testId?: string;
  /** Fallback text when status is unknown (defaults to em dash) */
  fallbackText?: string;
}

export type { StatusBadgeNativeProps };

const EM_DASH = '\u2014';

const StatusBadgeNative = memo(({
  status,
  statusMap,
  testId = 'status-badge-native',
  fallbackText = EM_DASH,
}: StatusBadgeNativeProps): JSX.Element => {
  if (!isValueDefined(status))
    return <span className="text-text-muted" data-testid={testId}>{fallbackText}</span>;

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- generic Map.get requires matching key type
  const config = (statusMap as ReadonlyMap<string | number, StatusConfig>).get(status);
  if (!isValueDefined(config))
    return <span className="text-text-muted" data-testid={testId}>{String(status)}</span>;

  return (
    <PillBadge colorClass={config.className} testId={testId}>
      {FM(config.labelKey)}
    </PillBadge>
  );
});

StatusBadgeNative.displayName = 'StatusBadgeNative';

export default StatusBadgeNative;
