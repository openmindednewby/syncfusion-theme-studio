import { describe, expect, it } from 'vitest';

import type { NotificationDto } from '@/api/generated/mockserver/models';

import { FILTER_ALL, FILTER_READ, FILTER_UNREAD } from './sections';

import { filterNotifications, mergeReadState } from '.';

const makeNotification = (id: number, isRead: boolean): NotificationDto => ({
  id,
  isRead,
  title: `Notification ${String(id)}`,
  message: `Message ${String(id)}`,
  type: 'info',
  createdAt: '2026-03-03T08:00:00.000Z',
});

const makeNotificationWithoutId = (isRead: boolean): NotificationDto => ({
  isRead,
  title: 'No-id notification',
  message: 'No id',
  type: 'info',
});

describe('filterNotifications', () => {
  const notifications: NotificationDto[] = [
    makeNotification(1, false),
    makeNotification(2, true),
    makeNotification(3, false),
  ];

  it('returns all notifications for FILTER_ALL', () => {
    const result = filterNotifications(notifications, FILTER_ALL);
    expect(result).toHaveLength(3);
  });

  it('returns only unread notifications for FILTER_UNREAD', () => {
    const result = filterNotifications(notifications, FILTER_UNREAD);
    expect(result).toHaveLength(2);
    expect(result.every((n) => n.isRead === false)).toBe(true);
  });

  it('returns only read notifications for FILTER_READ', () => {
    const result = filterNotifications(notifications, FILTER_READ);
    expect(result).toHaveLength(1);
    const first = result[0];
    expect(first?.id).toBe(2);
  });

  it('returns empty array when no notifications match filter', () => {
    const allRead = [makeNotification(1, true)];
    const result = filterNotifications(allRead, FILTER_UNREAD);
    expect(result).toHaveLength(0);
  });
});

describe('mergeReadState', () => {
  it('marks notifications in readIds as read', () => {
    const notifications = [makeNotification(1, false), makeNotification(2, false)];
    const readIds = new Set([1]);
    const result = mergeReadState(notifications, readIds);
    expect(result[0]?.isRead).toBe(true);
    expect(result[1]?.isRead).toBe(false);
  });

  it('preserves already-read notifications as read', () => {
    const notifications = [makeNotification(1, true)];
    const result = mergeReadState(notifications, new Set());
    expect(result[0]?.isRead).toBe(true);
  });

  it('handles empty readIds without changing state', () => {
    const notifications = [makeNotification(1, false), makeNotification(2, false)];
    const result = mergeReadState(notifications, new Set());
    expect(result.every((n) => n.isRead === false)).toBe(true);
  });

  it('handles notification with undefined id by not marking it read', () => {
    const n = makeNotificationWithoutId(false);
    const result = mergeReadState([n], new Set([1]));
    expect(result[0]?.isRead).toBe(false);
  });
});
