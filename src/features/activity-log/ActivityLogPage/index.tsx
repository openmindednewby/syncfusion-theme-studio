import { memo, useMemo, useState } from 'react';

import type { AuditEntryDto, AuditLogFilters as ApiFilters } from '@/api/hooks/useAuditLog';
import { useAuditLog } from '@/api/hooks/useAuditLog';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

import {
  ACTION_ALL,
  ActivityLogFilters,
  ActivityLogGrid,
  ENTITY_ALL,
  type AuditLogFilterValues,
} from './sections';

export function applyLocalSearch(
  entries: AuditEntryDto[],
  search: string,
): AuditEntryDto[] {
  if (search.trim() === '') return entries;
  const q = search.toLowerCase();
  return entries.filter(
    (e) =>
      e.userName.toLowerCase().includes(q) ||
      e.details.toLowerCase().includes(q) ||
      e.entityId.toLowerCase().includes(q),
  );
}

const DEFAULT_LIMIT = 50;

const ActivityLogPage = memo((): JSX.Element => {
  const [filters, setFilters] = useState<AuditLogFilterValues>({
    action: ACTION_ALL,
    entityType: ENTITY_ALL,
    search: '',
  });

  const apiFilters: ApiFilters = useMemo(() => {
    const result: ApiFilters = { limit: DEFAULT_LIMIT };
    if (filters.action !== ACTION_ALL) result.action = filters.action;
    if (filters.entityType !== ENTITY_ALL) result.entityType = filters.entityType;
    return result;
  }, [filters.action, filters.entityType]);

  const { data: response, isLoading } = useAuditLog(apiFilters);

  const entries = useMemo(
    () => applyLocalSearch(response?.data.items ?? [], filters.search),
    [response, filters.search],
  );

  const totalCount = response?.data.total ?? 0;

  return (
    <div className="space-y-4" data-testid={TestIds.ACTIVITY_LOG_PAGE}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">
          {FM('activityLog.title')}
        </h1>
        {totalCount > 0 && (
          <span className="text-sm text-text-muted">
            {FM('activityLog.totalEntries', String(totalCount))}
          </span>
        )}
      </div>
      <ActivityLogFilters
        filters={filters}
        onActionChange={(action) => setFilters((prev) => ({ ...prev, action }))}
        onEntityTypeChange={(entityType) => setFilters((prev) => ({ ...prev, entityType }))}
        onSearchChange={(search) => setFilters((prev) => ({ ...prev, search }))}
      />
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <ActivityLogGrid entries={entries} isLoading={isLoading} />
      </div>
    </div>
  );
});

ActivityLogPage.displayName = 'ActivityLogPage';

export default ActivityLogPage;
