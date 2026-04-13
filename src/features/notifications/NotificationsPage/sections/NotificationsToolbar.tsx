import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';

const FILTER_ALL = 'all';
const FILTER_UNREAD = 'unread';
const FILTER_READ = 'read';

type FilterValue = typeof FILTER_ALL | typeof FILTER_UNREAD | typeof FILTER_READ;

interface NotificationsToolbarProps {
  filter: FilterValue;
  unreadCount: number;
  onFilterChange: (filter: FilterValue) => void;
  onMarkAllRead: () => void;
}

const FILTERS: Array<{ value: FilterValue; labelKey: string }> = [
  { value: FILTER_ALL, labelKey: 'notifications.filterAll' },
  { value: FILTER_UNREAD, labelKey: 'notifications.filterUnread' },
  { value: FILTER_READ, labelKey: 'notifications.filterRead' },
];

export { FILTER_ALL, FILTER_UNREAD, FILTER_READ };
export type { FilterValue };

const NotificationsToolbar = ({
  filter,
  unreadCount,
  onFilterChange,
  onMarkAllRead,
}: NotificationsToolbarProps): JSX.Element => (
  <div className="flex flex-wrap items-center justify-between gap-3" data-testid={TestIds.NOTIFICATIONS_TOOLBAR}>
    <div className="flex items-center gap-1 rounded-lg border border-border bg-surface p-1">
      {FILTERS.map(({ value, labelKey }) => (
        <button
          key={value}
          aria-pressed={filter === value}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            filter === value
              ? 'bg-primary-600 text-white'
              : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }`}
          type="button"
          onClick={() => onFilterChange(value)}
        >
          {FM(labelKey)}
          {value === FILTER_UNREAD && unreadCount > 0 && (
            <span className="ml-1.5 rounded-full bg-white/20 px-1.5 py-0.5 text-xs">
              {unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
    {unreadCount > 0 && (
      <button
        className="text-sm font-medium text-primary-600 hover:text-primary-700 hover:underline"
        data-testid={TestIds.NOTIFICATIONS_MARK_ALL_READ}
        type="button"
        onClick={onMarkAllRead}
      >
        {FM('notifications.markAllRead')}
      </button>
    )}
  </div>
);

export default NotificationsToolbar;
