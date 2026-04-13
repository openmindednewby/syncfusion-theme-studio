import { describe, expect, it } from 'vitest';

import type { AuditEntryDto } from '@/api/hooks/useAuditLog';

import { applyLocalSearch } from '.';

const makeEntry = (id: number, userName: string, details: string, entityId: string): AuditEntryDto => ({
  id,
  userId: 1,
  userName,
  action: 'Created',
  entityType: 'User',
  entityId,
  details,
  timestamp: '2026-03-03T08:00:00Z',
  ipAddress: '192.168.1.10',
});

const ENTRIES: AuditEntryDto[] = [
  makeEntry(1, 'admin', 'Created user account #10', '10'),
  makeEntry(2, 'jwilson', 'Updated product pricing', '5'),
  makeEntry(3, 'schen', 'Deleted order #1001', '1001'),
  makeEntry(4, 'mbrown', 'Viewed notification #3', '3'),
];

describe('applyLocalSearch', () => {
  it('returns all entries when search is empty', () => {
    const result = applyLocalSearch(ENTRIES, '');
    expect(result).toHaveLength(4);
  });

  it('filters by userName', () => {
    const result = applyLocalSearch(ENTRIES, 'jwilson');
    expect(result).toHaveLength(1);
    expect(result[0]?.userName).toBe('jwilson');
  });

  it('filters by details (case-insensitive)', () => {
    const result = applyLocalSearch(ENTRIES, 'DELETED');
    expect(result).toHaveLength(1);
    expect(result[0]?.details).toContain('Deleted');
  });

  it('filters by entityId', () => {
    const result = applyLocalSearch(ENTRIES, '1001');
    expect(result).toHaveLength(1);
    expect(result[0]?.entityId).toBe('1001');
  });

  it('returns empty array when no entries match', () => {
    const result = applyLocalSearch(ENTRIES, 'nonexistent-xyz');
    expect(result).toHaveLength(0);
  });

  it('ignores whitespace-only search', () => {
    const result = applyLocalSearch(ENTRIES, '   ');
    expect(result).toHaveLength(4);
  });
});
