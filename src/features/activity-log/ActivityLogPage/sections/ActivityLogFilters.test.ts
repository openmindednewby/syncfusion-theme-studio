import { describe, expect, it } from 'vitest';

import { isActionFilter, isEntityFilter } from './ActivityLogFilters';

describe('isActionFilter', () => {
  it('returns true for all valid action filters', () => {
    expect(isActionFilter('all')).toBe(true);
    expect(isActionFilter('Created')).toBe(true);
    expect(isActionFilter('Updated')).toBe(true);
    expect(isActionFilter('Deleted')).toBe(true);
    expect(isActionFilter('Viewed')).toBe(true);
    expect(isActionFilter('LoggedIn')).toBe(true);
    expect(isActionFilter('LoggedOut')).toBe(true);
  });

  it('returns false for unknown values', () => {
    expect(isActionFilter('unknown')).toBe(false);
    expect(isActionFilter('')).toBe(false);
    expect(isActionFilter('created')).toBe(false);
    expect(isActionFilter('login')).toBe(false);
  });
});

describe('isEntityFilter', () => {
  it('returns true for all valid entity filters', () => {
    expect(isEntityFilter('all')).toBe(true);
    expect(isEntityFilter('User')).toBe(true);
    expect(isEntityFilter('Product')).toBe(true);
    expect(isEntityFilter('Order')).toBe(true);
    expect(isEntityFilter('Auth')).toBe(true);
    expect(isEntityFilter('Settings')).toBe(true);
    expect(isEntityFilter('Notification')).toBe(true);
  });

  it('returns false for unknown values', () => {
    expect(isEntityFilter('unknown')).toBe(false);
    expect(isEntityFilter('')).toBe(false);
    expect(isEntityFilter('user')).toBe(false);
  });
});
