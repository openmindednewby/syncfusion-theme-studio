import { memo, useMemo } from 'react';

import type { AuditEntryDto } from '@/api/hooks/useAuditLog';
import { useAuditLog } from '@/api/hooks/useAuditLog';
import { HeadingNative, HeadingLevel, TextNative, TextVariant } from '@/components/ui/native';
import { FM } from '@/localization/utils/helpers';

const MS_PER_MINUTE = 60_000;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const RECENT_LIMIT = 5;
const STROKE_WIDTH = 2;

function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / MS_PER_MINUTE);
  if (minutes < 1) return 'Just now';
  if (minutes < MINUTES_PER_HOUR) return `${String(minutes)}m ago`;
  const hours = Math.floor(minutes / MINUTES_PER_HOUR);
  if (hours < HOURS_PER_DAY) return `${String(hours)}h ago`;
  const days = Math.floor(hours / HOURS_PER_DAY);
  return `${String(days)}d ago`;
}

const ACTION_ICON_MAP: Record<string, 'success' | 'warning' | 'info'> = {
  Created: 'success',
  Updated: 'info',
  Deleted: 'warning',
  Viewed: 'info',
  LoggedIn: 'success',
  LoggedOut: 'warning',
};

interface RecentActivityItemProps {
  entry: AuditEntryDto;
}

const iconClasses = {
  success: 'bg-success-50 text-success-500',
  warning: 'bg-warning-50 text-warning-500',
  info: 'bg-info-50 text-info-500',
};

const RecentActivityItem = ({ entry }: RecentActivityItemProps): JSX.Element => {
  const icon = ACTION_ICON_MAP[entry.action] ?? 'info';

  return (
    <div className="flex items-center gap-3 py-3">
      <div className={`rounded-full p-2 ${iconClasses[icon]}`}>
        <svg
          aria-hidden="true"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 13l4 4L19 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={STROKE_WIDTH}
          />
        </svg>
      </div>
      <div className="flex-1">
        <TextNative variant={TextVariant.Label}>{entry.details}</TextNative>
        <TextNative variant={TextVariant.Caption}>
          {entry.userName} - {formatRelativeTime(entry.timestamp)}
        </TextNative>
      </div>
    </div>
  );
};

export const RecentActivityWidget = memo((): JSX.Element => {
  const { data: response, isLoading } = useAuditLog({ limit: RECENT_LIMIT });

  const entries: AuditEntryDto[] = useMemo(
    () => response?.data.items ?? [],
    [response],
  );

  return (
    <div className="card">
      <HeadingNative className="mb-4" level={HeadingLevel.H3}>
        {FM('dashboard.recentActivity')}
      </HeadingNative>
      <div className="divide-y divide-border">
        {isLoading ? (
          <div className="py-4 text-center text-text-muted">
            {FM('activityLog.loading')}
          </div>
        ) : null}
        {!isLoading && entries.length === 0 && (
          <div className="py-4 text-center text-text-muted">
            {FM('activityLog.empty')}
          </div>
        )}
        {entries.map((entry) => (
          <RecentActivityItem key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
});

RecentActivityWidget.displayName = 'RecentActivityWidget';
