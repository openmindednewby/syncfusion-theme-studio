import { memo, useCallback, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import type { NotificationDto } from '@/api/generated/mockserver/models';
import {
  getMockServerWebNotificationsListQueryKey,
  useMockServerWebNotificationsList,
} from '@/api/generated/mockserver/notifications/notifications';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils';

import {
  FILTER_ALL,
  FILTER_UNREAD,
  FILTER_READ,
  NotificationsList,
  NotificationsToolbar,
  type FilterValue,
} from './sections';

export function filterNotifications(
  notifications: NotificationDto[],
  filter: FilterValue,
): NotificationDto[] {
  if (filter === FILTER_UNREAD) return notifications.filter((n) => n.isRead === false);
  if (filter === FILTER_READ) return notifications.filter((n) => n.isRead === true);
  return notifications;
}

export function mergeReadState(
  notifications: NotificationDto[],
  readIds: Set<number>,
): NotificationDto[] {
  return notifications.map((n) => ({
    ...n,
    isRead: n.isRead === true || (isValueDefined(n.id) && readIds.has(n.id)),
  }));
}

const NotificationsPage = memo((): JSX.Element => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<FilterValue>(FILTER_ALL);
  const [readIds, setReadIds] = useState<Set<number>>(new Set());

  const { data: response, isLoading } = useMockServerWebNotificationsList();

  const allNotifications: NotificationDto[] = useMemo(
    () => mergeReadState(response?.data ?? [], readIds),
    [response, readIds],
  );

  const displayed = useMemo(
    () => filterNotifications(allNotifications, filter),
    [allNotifications, filter],
  );

  const unreadCount = useMemo(
    () => allNotifications.filter((n) => n.isRead !== true).length,
    [allNotifications],
  );

  const handleMarkRead = useCallback((id: number) => {
    setReadIds((prev) => new Set([...prev, id]));
  }, []);

  const handleMarkAllRead = useCallback(() => {
    const allIds = allNotifications
      .filter((n) => n.isRead !== true && isValueDefined(n.id))
      .map((n) => n.id)
      .filter(isValueDefined);
    setReadIds((prev) => new Set([...prev, ...allIds]));
    queryClient.invalidateQueries({
      queryKey: getMockServerWebNotificationsListQueryKey(),
    }).catch(() => undefined);
  }, [allNotifications, queryClient]);

  return (
    <div className="space-y-4" data-testid={TestIds.NOTIFICATIONS_PAGE}>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">
          {FM('notifications.title')}
        </h1>
      </div>
      <NotificationsToolbar
        filter={filter}
        unreadCount={unreadCount}
        onFilterChange={setFilter}
        onMarkAllRead={handleMarkAllRead}
      />
      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <NotificationsList
          isLoading={isLoading}
          notifications={displayed}
          onMarkRead={handleMarkRead}
        />
      </div>
    </div>
  );
});

NotificationsPage.displayName = 'NotificationsPage';

export default NotificationsPage;
