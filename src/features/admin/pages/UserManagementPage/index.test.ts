import { describe, expect, it } from 'vitest';

import { Role } from '@/shared/permissions';

import { assignMockMetadata, filterUsers } from './index';

import type { UserWithId } from './types';

const MOCK_USERS: UserWithId[] = [
  { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', role: Role.Admin, isActive: true },
  { id: 2, firstName: 'Bob', lastName: 'Jones', email: 'bob@test.com', role: Role.Manager, isActive: false },
  { id: 3, firstName: 'Carol', lastName: 'White', email: 'carol@example.com', role: Role.Viewer, isActive: true },
];

describe('filterUsers', () => {
  it('returns all when search is empty', () => {
    expect(filterUsers(MOCK_USERS, '')).toHaveLength(3);
  });

  it('returns all when search is whitespace only', () => {
    expect(filterUsers(MOCK_USERS, '   ')).toHaveLength(3);
  });

  it('filters by first name', () => {
    const result = filterUsers(MOCK_USERS, 'alice');
    expect(result).toHaveLength(1);
    expect(result[0]!.firstName).toBe('Alice');
  });

  it('filters by last name', () => {
    const result = filterUsers(MOCK_USERS, 'jones');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(2);
  });

  it('filters by email', () => {
    const result = filterUsers(MOCK_USERS, 'test.com');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(2);
  });

  it('is case-insensitive', () => {
    expect(filterUsers(MOCK_USERS, 'ALICE')).toHaveLength(1);
  });

  it('returns empty array when no match', () => {
    expect(filterUsers(MOCK_USERS, 'zzz')).toHaveLength(0);
  });

  it('handles users with missing fields', () => {
    const users: UserWithId[] = [
      { id: 10, role: Role.Viewer, isActive: true },
    ];
    const result = filterUsers(users, 'anything');
    expect(result).toHaveLength(0);
  });
});

describe('assignMockMetadata', () => {
  const ROLES = [Role.Admin, Role.Manager, Role.Viewer, Role.Analyst];

  it('assigns roles in round-robin order', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
    const result = assignMockMetadata(items, ROLES);
    expect(result[0]!.role).toBe(Role.Admin);
    expect(result[1]!.role).toBe(Role.Manager);
    expect(result[2]!.role).toBe(Role.Viewer);
    expect(result[3]!.role).toBe(Role.Analyst);
    expect(result[4]!.role).toBe(Role.Admin);
  });

  it('assigns isActive based on index mod 3', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const result = assignMockMetadata(items, ROLES);
    expect(result[0]!.isActive).toBe(false);
    expect(result[1]!.isActive).toBe(true);
    expect(result[2]!.isActive).toBe(true);
    expect(result[3]!.isActive).toBe(false);
  });

  it('filters out items without numeric id', () => {
    const items = [{ id: 1 }, { firstName: 'NoId' }, { id: 3 }];
    const result = assignMockMetadata(items, ROLES);
    expect(result).toHaveLength(2);
  });

  it('returns empty array for empty input', () => {
    expect(assignMockMetadata([], ROLES)).toHaveLength(0);
  });
});
