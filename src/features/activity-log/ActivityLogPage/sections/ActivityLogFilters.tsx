import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const ACTION_ALL = 'all';
const ENTITY_ALL = 'all';

const AUDIT_ACTIONS = [ACTION_ALL, 'Created', 'Updated', 'Deleted', 'Viewed', 'LoggedIn', 'LoggedOut'] as const;
const ENTITY_TYPES = [ENTITY_ALL, 'User', 'Product', 'Order', 'Auth', 'Settings', 'Notification'] as const;

type ActionFilter = (typeof AUDIT_ACTIONS)[number];
type EntityFilter = (typeof ENTITY_TYPES)[number];

export interface AuditLogFilterValues {
  action: string;
  entityType: string;
  search: string;
}

interface ActivityLogFiltersProps {
  filters: AuditLogFilterValues;
  onActionChange: (action: string) => void;
  onEntityTypeChange: (entityType: string) => void;
  onSearchChange: (value: string) => void;
}

export { ACTION_ALL, ENTITY_ALL };

const AUDIT_ACTIONS_SET = new Set<string>(AUDIT_ACTIONS);
const ENTITY_TYPES_SET = new Set<string>(ENTITY_TYPES);

export function isActionFilter(value: string): value is ActionFilter {
  return AUDIT_ACTIONS_SET.has(value);
}

export function isEntityFilter(value: string): value is EntityFilter {
  return ENTITY_TYPES_SET.has(value);
}

const ACTION_LABEL_KEYS: Record<string, string> = {
  Created: 'activityLog.action.Created',
  Updated: 'activityLog.action.Updated',
  Deleted: 'activityLog.action.Deleted',
  Viewed: 'activityLog.action.Viewed',
  LoggedIn: 'activityLog.action.LoggedIn',
  LoggedOut: 'activityLog.action.LoggedOut',
};

const ENTITY_LABEL_KEYS: Record<string, string> = {
  User: 'activityLog.entity.User',
  Product: 'activityLog.entity.Product',
  Order: 'activityLog.entity.Order',
  Auth: 'activityLog.entity.Auth',
  Settings: 'activityLog.entity.Settings',
  Notification: 'activityLog.entity.Notification',
};

const SELECT_CLASS =
  'rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500';

const ActivityLogFilters = ({
  filters,
  onActionChange,
  onEntityTypeChange,
  onSearchChange,
}: ActivityLogFiltersProps): JSX.Element => (
  <div className="flex flex-wrap items-center gap-3" data-testid={TestIds.ACTIVITY_LOG_FILTERS}>
    <input
      aria-label={FM('common.search')}
      className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      placeholder={FM('common.search')}
      type="search"
      value={filters.search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <select
      aria-label={FM('activityLog.filterAction')}
      className={SELECT_CLASS}
      value={filters.action}
      onChange={(e) => {
        const val = e.target.value;
        if (isActionFilter(val)) onActionChange(val);
      }}
    >
      {AUDIT_ACTIONS.map((a) => (
        <option key={a} value={a}>
          {a === ACTION_ALL ? FM('activityLog.allActions') : FM(ACTION_LABEL_KEYS[a] ?? 'activityLog.allActions')}
        </option>
      ))}
    </select>
    <select
      aria-label={FM('activityLog.filterEntity')}
      className={SELECT_CLASS}
      value={filters.entityType}
      onChange={(e) => {
        const val = e.target.value;
        if (isEntityFilter(val)) onEntityTypeChange(val);
      }}
    >
      {ENTITY_TYPES.map((et) => (
        <option key={et} value={et}>
          {et === ENTITY_ALL ? FM('activityLog.allEntities') : FM(ENTITY_LABEL_KEYS[et] ?? 'activityLog.allEntities')}
        </option>
      ))}
    </select>
  </div>
);

export default ActivityLogFilters;
