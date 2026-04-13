import type { NotificationDto } from '@/api/generated/mockserver/models';
import {
  IconAlertTriangle,
  IconBell,
  IconCheckCircle,
  IconInfo,
} from '@/components/icons';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

interface NotificationsListProps {
  notifications: NotificationDto[];
  isLoading: boolean;
  onMarkRead: (id: number) => void;
}

export function formatDate(iso: string | undefined): string {
  if (!isValueDefined(iso) || iso === '') return '';
  return new Date(iso).toLocaleString();
}

const typeColorMap: Record<string, string> = {
  info: 'bg-info-500',
  warning: 'bg-warning-500',
  error: 'bg-error-500',
  success: 'bg-success-500',
};

export function getTypeColor(type: string | undefined): string {
  if (!isValueDefined(type)) return 'bg-primary-500';
  return typeColorMap[type.toLowerCase()] ?? 'bg-primary-500';
}

const borderColorMap: Record<string, string> = {
  error: 'border-l-error-500',
  warning: 'border-l-warning-500',
  info: 'border-l-info-500',
  success: 'border-l-success-500',
};

export function getBorderColor(type: string | undefined): string {
  if (!isValueDefined(type)) return 'border-l-primary-500';
  return borderColorMap[type.toLowerCase()] ?? 'border-l-primary-500';
}

const ICON_CLASS = 'h-4 w-4';

const NotificationIcon = ({ type }: { type: string | undefined }): JSX.Element => {
  const normalized = type?.toLowerCase();
  if (normalized === 'success') return <IconCheckCircle className={`${ICON_CLASS} text-success-500`} />;
  if (normalized === 'error' || normalized === 'warning') return <IconAlertTriangle className={`${ICON_CLASS} text-warning-500`} />;
  if (normalized === 'info') return <IconInfo className={`${ICON_CLASS} text-info-500`} />;
  return <IconBell className={`${ICON_CLASS} text-text-muted`} />;
};

const NotificationCard = ({
  notification,
  onMarkRead,
}: {
  notification: NotificationDto;
  onMarkRead: (id: number) => void;
}): JSX.Element => {
  const notifId = notification.id;
  const isRead = notification.isRead === true;

  return (
    <li
      className={`rounded-md border border-border border-l-4 p-4 mb-2 transition-all duration-200 ${getBorderColor(notification.type)} ${
        isRead ? 'opacity-60' : 'bg-surface hover:bg-surface-hover'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 shrink-0">
          <NotificationIcon type={notification.type} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-text-primary">
            {notification.title}
          </p>
          <p className="mt-0.5 text-sm text-text-secondary">
            {notification.message}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {formatDate(notification.createdAt)}
          </p>
        </div>
        {!isRead && isValueDefined(notifId) && (
          <button
            aria-label={`${FM('notifications.markRead')}: ${notification.title ?? ''}`}
            className="shrink-0 text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline"
            data-testid={`${TestIds.NOTIFICATIONS_MARK_READ}-${notifId}`}
            type="button"
            onClick={() => onMarkRead(notifId)}
          >
            {FM('notifications.markRead')}
          </button>
        )}
      </div>
    </li>
  );
};

const NotificationsList = ({
  notifications,
  isLoading,
  onMarkRead,
}: NotificationsListProps): JSX.Element => {
  if (isLoading)
    return (
      <div className="py-12 text-center text-text-secondary">
        {FM('common.loading')}
      </div>
    );

  if (notifications.length === 0)
    return (
      <div className="py-12 text-center text-text-secondary" data-testid={TestIds.NOTIFICATIONS_EMPTY}>
        {FM('notifications.empty')}
      </div>
    );

  return (
    <ul className="space-y-1 p-2" data-testid={TestIds.NOTIFICATIONS_LIST}>
      {notifications.map((n) => (
        <NotificationCard
          key={n.id}
          notification={n}
          onMarkRead={onMarkRead}
        />
      ))}
    </ul>
  );
};

export default NotificationsList;
