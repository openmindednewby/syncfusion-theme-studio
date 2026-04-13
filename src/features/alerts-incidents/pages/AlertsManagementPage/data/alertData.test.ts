import { describe, it, expect } from 'vitest';

import { TRADE_ORDERS, ORDER_COLUMNS } from './alertData';

const EXPECTED_ORDER_COUNT = 592;
const MIN_VALUE = 10;
const MAX_VALUE = 100;

describe('Trade Order Data', () => {
  it('generates the expected number of orders', () => {
    expect(TRADE_ORDERS).toHaveLength(EXPECTED_ORDER_COUNT);
  });

  it('has no duplicate IDs', () => {
    const ids = TRADE_ORDERS.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has valid priority values', () => {
    const validPriorities = ['Critical', 'High', 'Medium', 'Low', 'Informational'];
    TRADE_ORDERS.forEach((order) => {
      expect(validPriorities).toContain(order.priority);
    });
  });

  it('has values between 10 and 100', () => {
    TRADE_ORDERS.forEach((order) => {
      expect(order.value).toBeGreaterThanOrEqual(MIN_VALUE);
      expect(order.value).toBeLessThanOrEqual(MAX_VALUE);
    });
  });

  it('defines column models for all data fields', () => {
    const columnFields = ORDER_COLUMNS.map((c) => c.field);
    expect(columnFields).toContain('id');
    expect(columnFields).toContain('priority');
    expect(columnFields).toContain('value');
    expect(columnFields).toContain('status');
    expect(columnFields).toContain('tickerSymbol');
    expect(columnFields).toContain('actions');
  });

  it('formats dates as DD/MM/YYYY', () => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    TRADE_ORDERS.forEach((order) => {
      expect(order.dateCreated).toMatch(datePattern);
    });
  });
});
