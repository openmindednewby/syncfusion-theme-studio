import { describe, it, expect } from 'vitest';

import { InvoiceStatus } from '@/api/generated/mockserver/models';

import { formatCurrency } from './sections';

import { filterByStatus } from './index';

import type { InvoiceWithId } from './sections';

const MOCK_INVOICES: InvoiceWithId[] = [
  { id: 1, invoiceNumber: 'INV-001', status: InvoiceStatus.Draft, totalAmount: 100.0 },
  { id: 2, invoiceNumber: 'INV-002', status: InvoiceStatus.Paid, totalAmount: 250.5 },
  { id: 3, invoiceNumber: 'INV-003', status: InvoiceStatus.Overdue, totalAmount: 75.0 },
  { id: 4, invoiceNumber: 'INV-004', status: InvoiceStatus.Sent, totalAmount: 0 },
];

describe('filterByStatus', () => {
  it('returns all invoices when filter is -1', () => {
    expect(filterByStatus(MOCK_INVOICES, -1)).toHaveLength(4);
  });

  it('filters by Draft status', () => {
    const result = filterByStatus(MOCK_INVOICES, InvoiceStatus.Draft);
    expect(result).toHaveLength(1);
    expect(result[0]!.invoiceNumber).toBe('INV-001');
  });

  it('filters by Paid status', () => {
    const result = filterByStatus(MOCK_INVOICES, InvoiceStatus.Paid);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(2);
  });

  it('filters by Overdue status', () => {
    const result = filterByStatus(MOCK_INVOICES, InvoiceStatus.Overdue);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe(3);
  });

  it('returns empty when no invoices match status', () => {
    expect(filterByStatus(MOCK_INVOICES, InvoiceStatus.Cancelled)).toHaveLength(0);
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
    expect(formatCurrency(undefined)).toBe('—');
  });
});
