import { describe, it, expect } from 'vitest';

import { formatCurrency } from './sections';

import { filterByStatus } from './index';

import type { OrderWithId } from './sections';

const MOCK_ORDERS: OrderWithId[] = [
  { id: 1, userId: 1, status: 'Pending', totalAmount: 100.0, items: [{ productTitle: 'Item A', quantity: 1, unitPrice: 100 }] },
  { id: 2, userId: 2, status: 'Delivered', totalAmount: 250.5, items: [{ productTitle: 'Item B', quantity: 2, unitPrice: 125.25 }] },
  { id: 3, userId: 3, status: 'Cancelled', totalAmount: 75.0, items: [] },
  { id: 4, userId: 1, status: 'Processing', totalAmount: 0, items: [] },
  { id: 5, userId: 4, status: 'Shipped', totalAmount: 500, items: [{ productTitle: 'Item C', quantity: 5, unitPrice: 100 }] },
];

describe('filterByStatus', () => {
  it('returns all orders when filter is empty string', () => {
    expect(filterByStatus(MOCK_ORDERS, '')).toHaveLength(5);
  });

  it('filters by Pending status', () => {
    const result = filterByStatus(MOCK_ORDERS, 'Pending');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(1);
  });

  it('filters by Delivered status', () => {
    const result = filterByStatus(MOCK_ORDERS, 'Delivered');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(2);
  });

  it('filters by Cancelled status', () => {
    const result = filterByStatus(MOCK_ORDERS, 'Cancelled');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(3);
  });

  it('filters by Processing status', () => {
    const result = filterByStatus(MOCK_ORDERS, 'Processing');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(4);
  });

  it('filters by Shipped status', () => {
    const result = filterByStatus(MOCK_ORDERS, 'Shipped');
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(5);
  });

  it('returns empty when no orders match status', () => {
    expect(filterByStatus(MOCK_ORDERS, 'NonExistent')).toHaveLength(0);
  });
});

describe('formatCurrency', () => {
  it('formats a positive amount with dollar sign and 2 decimals', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  });

  it('formats decimal amounts correctly', () => {
    expect(formatCurrency(250.5)).toBe('$250.50');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('returns em dash for undefined amount', () => {
    expect(formatCurrency(undefined)).toBe('\u2014');
  });
});
