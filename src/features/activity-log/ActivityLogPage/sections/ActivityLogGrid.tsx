import type { AuditEntryDto } from '@/api/hooks/useAuditLog';
import BusinessTableShell from '@/components/ui/native/BusinessTableShell';
import PillBadge from '@/components/ui/native/PillBadge';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

interface ActivityLogGridProps {
  entries: AuditEntryDto[];
  isLoading: boolean;
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

const ACTION_BADGE_CLASS: Record<string, string> = {
  Created: 'bg-success-50 text-success-700',
  Updated: 'bg-info-50 text-info-700',
  Deleted: 'bg-error-50 text-error-700',
  Viewed: 'bg-surface-hover text-text-secondary',
  LoggedIn: 'bg-success-50 text-success-700',
  LoggedOut: 'bg-warning-50 text-warning-700',
};

const COLUMN_KEYS = [
  'activityLog.column.timestamp',
  'activityLog.column.user',
  'activityLog.column.action',
  'activityLog.column.entityType',
  'activityLog.column.entityId',
  'activityLog.column.details',
  'activityLog.column.ipAddress',
] as const;

const HEADER_CLASSES = 'sticky top-0 z-10 bg-surface-hover';

const ActivityLogGrid = ({ entries, isLoading }: ActivityLogGridProps): JSX.Element => {
  if (isLoading)
    return (
      <div className="py-12 text-center text-text-secondary">
        {FM('activityLog.loading')}
      </div>
    );

  if (entries.length === 0)
    return (
      <div className="py-12 text-center text-text-secondary">
        {FM('activityLog.empty')}
      </div>
    );

  return (
    <BusinessTableShell resultCount={entries.length} testId={TestIds.ACTIVITY_LOG_GRID}>
      <table className="w-full min-w-[800px] text-sm">
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
          {entries.map((entry, idx) => (
            <tr
              key={entry.id}
              className={`transition-colors duration-150 hover:bg-surface-hover ${idx % 2 === 1 ? 'bg-surface/50' : ''}`}
            >
              <td className="px-4 py-3 text-text-muted">{formatTimestamp(entry.timestamp)}</td>
              <td className="px-4 py-3 font-medium text-text-primary">{entry.userName}</td>
              <td className="px-4 py-3">
                <PillBadge colorClass={ACTION_BADGE_CLASS[entry.action] ?? 'bg-surface-hover text-text-secondary'}>
                  {FM(`activityLog.action.${entry.action}`)}
                </PillBadge>
              </td>
              <td className="px-4 py-3 text-text-secondary">{entry.entityType}</td>
              <td className="px-4 py-3 text-text-muted">{entry.entityId}</td>
              <td className="px-4 py-3 text-text-secondary">{entry.details}</td>
              <td className="px-4 py-3 text-text-muted">{entry.ipAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </BusinessTableShell>
  );
};

export default ActivityLogGrid;
