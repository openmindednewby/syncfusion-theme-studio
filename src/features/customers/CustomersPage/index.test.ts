import { describe, it, expect } from 'vitest';

import { filterCustomers } from './index';

import type { CustomerWithId } from './sections';

const MOCK_CUSTOMERS: CustomerWithId[] = [
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@example.com',
    companyName: 'Acme Corp',
    isActive: true,
  },
  {
    id: 2,
    firstName: 'Bob',
    lastName: 'Jones',
    email: 'bob@test.com',
    companyName: 'Beta Inc',
    isActive: false,
  },
  {
    id: 3,
    firstName: 'Carol',
    lastName: 'White',
    email: 'carol@example.com',
    isActive: true,
  },
];

describe('filterCustomers', () => {
  it('returns all when search is empty', () => {
    expect(filterCustomers(MOCK_CUSTOMERS, '')).toHaveLength(3);
  });

  it('filters by first name', () => {
    const result = filterCustomers(MOCK_CUSTOMERS, 'alice');
    expect(result).toHaveLength(1);
    expect(result[0]!.firstName).toBe('Alice');
  });

  it('filters by last name', () => {
    const result = filterCustomers(MOCK_CUSTOMERS, 'smith');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(1);
  });

  it('filters by email', () => {
    const result = filterCustomers(MOCK_CUSTOMERS, 'test.com');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(2);
  });

  it('filters by company name', () => {
    const result = filterCustomers(MOCK_CUSTOMERS, 'acme');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(1);
  });

  it('returns empty array when no match', () => {
    expect(filterCustomers(MOCK_CUSTOMERS, 'zzz')).toHaveLength(0);
  });

  it('ignores whitespace-only search', () => {
    expect(filterCustomers(MOCK_CUSTOMERS, '   ')).toHaveLength(3);
  });

  it('handles customer with no companyName', () => {
    const result = filterCustomers(MOCK_CUSTOMERS, 'carol');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(3);
  });

  it('is case-insensitive', () => {
    expect(filterCustomers(MOCK_CUSTOMERS, 'ALICE')).toHaveLength(1);
  });
});
