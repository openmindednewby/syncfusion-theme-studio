import { describe, it, expect } from 'vitest';

import { TRADE_COUNT } from '../constants';
import { TRADE_HISTORY } from './tradeHistoryData';

const VALID_STATUSES = ['Filled', 'Partially Filled', 'Cancelled', 'Expired'];
const VALID_SIDES = ['Buy', 'Sell'];

describe('Trade History Data', () => {
  it('generates the expected number of trades', () => {
    expect(TRADE_HISTORY).toHaveLength(TRADE_COUNT);
  });

  it('has no duplicate IDs', () => {
    const ids = TRADE_HISTORY.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has IDs in the TH-XXXXX format', () => {
    const idPattern = /^TH-\d+$/;
    TRADE_HISTORY.forEach((trade) => {
      expect(trade.id).toMatch(idPattern);
    });
  });

  it('has valid status values', () => {
    TRADE_HISTORY.forEach((trade) => {
      expect(VALID_STATUSES).toContain(trade.status);
    });
  });

  it('has valid side values', () => {
    TRADE_HISTORY.forEach((trade) => {
      expect(VALID_SIDES).toContain(trade.side);
    });
  });

  it('has positive prices and quantities', () => {
    TRADE_HISTORY.forEach((trade) => {
      expect(trade.price).toBeGreaterThan(0);
      expect(trade.quantity).toBeGreaterThan(0);
    });
  });

  it('computes total as quantity * price', () => {
    const precision = 100;
    TRADE_HISTORY.forEach((trade) => {
      const expected = Math.round(trade.price * trade.quantity * precision) / precision;
      expect(trade.total).toBe(expected);
    });
  });

  it('has valid ISO date strings', () => {
    TRADE_HISTORY.forEach((trade) => {
      const parsed = new Date(trade.executedAt);
      expect(parsed.getTime()).not.toBeNaN();
    });
  });

  it('has non-empty ticker, exchange, and broker', () => {
    TRADE_HISTORY.forEach((trade) => {
      expect(trade.ticker.length).toBeGreaterThan(0);
      expect(trade.exchange.length).toBeGreaterThan(0);
      expect(trade.broker.length).toBeGreaterThan(0);
    });
  });
});
