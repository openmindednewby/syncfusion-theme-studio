/**
 * Deterministic mock trade history data.
 * Uses modular arithmetic for variety — same pattern as alertData.ts.
 */
import { TRADE_COUNT, TRADE_ID_OFFSET } from '../constants';

import type { TradeRecord } from '../types';

function pickFromArray<T>(arr: T[], index: number): T {
  // Array is guaranteed non-empty; modulo ensures valid index
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- index always in bounds via modulo
  return arr[index % arr.length]!;
}

const TICKERS = [
  'AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN',
  'NVDA', 'META', 'JPM', 'V', 'BRK.B',
  'JNJ', 'WMT', 'DIS', 'NFLX', 'AMD',
];

const SIDES: Array<'Buy' | 'Sell'> = ['Buy', 'Sell'];

const STATUSES: Array<TradeRecord['status']> = [
  'Filled', 'Filled', 'Partially Filled', 'Cancelled', 'Expired',
];

const EXCHANGES = ['NYSE', 'NASDAQ', 'LSE', 'TSE', 'HKEX', 'Euronext', 'ASX'];

const BROKERS = [
  'Sarah Chen', 'James Wilson', 'Maria Garcia',
  'Alex Kumar', 'Priya Patel', 'Robert Kim',
];

// Price generation constants
const BASE_PRICE = 150;
const PRICE_RANGE = 200;
const PRICE_JITTER_MOD = 13;
const PRICE_JITTER_FACTOR = 3.5;
const PRICE_ROUND_PRECISION = 100;

// Quantity generation constants
const BASE_QUANTITY = 10;
const QUANTITY_MULTIPLIER = 25;
const QUANTITY_MOD = 8;

// Date generation constants
const BASE_YEAR = 2026;
const BASE_MONTH = 2; // March (0-indexed)
const BASE_DAY = 10;
const BASE_HOUR = 9;
const HOUR_MS = 3600000;
const HOUR_STEP = 2;
const DAY_MS = 86400000;
const DAY_MOD = 7;
const PAD_WIDTH = 2;

// Offset constants for variety
const SIDE_OFFSET = 1;
const STATUS_OFFSET = 2;
const EXCHANGE_OFFSET = 3;
const BROKER_OFFSET = 4;

export const TRADE_HISTORY: TradeRecord[] = Array.from(
  { length: TRADE_COUNT },
  (_, i) => {
    const priceRaw = BASE_PRICE + (i % PRICE_JITTER_MOD) * PRICE_JITTER_FACTOR
      + (i * PRICE_RANGE) / TRADE_COUNT;
    const price = Math.round(priceRaw * PRICE_ROUND_PRECISION) / PRICE_ROUND_PRECISION;
    const quantity = BASE_QUANTITY + (i % QUANTITY_MOD) * QUANTITY_MULTIPLIER;
    const total = Math.round(price * quantity * PRICE_ROUND_PRECISION) / PRICE_ROUND_PRECISION;

    const date = new Date(BASE_YEAR, BASE_MONTH, BASE_DAY, BASE_HOUR, 0, 0);
    date.setTime(
      date.getTime() - i * HOUR_MS * HOUR_STEP - (i % DAY_MOD) * DAY_MS,
    );

    const y = String(date.getFullYear());
    const m = String(date.getMonth() + 1).padStart(PAD_WIDTH, '0');
    const d = String(date.getDate()).padStart(PAD_WIDTH, '0');
    const hh = String(date.getHours()).padStart(PAD_WIDTH, '0');
    const mm = String(date.getMinutes()).padStart(PAD_WIDTH, '0');

    return {
      id: `TH-${String(TRADE_ID_OFFSET + i)}`,
      ticker: pickFromArray(TICKERS, i),
      side: pickFromArray(SIDES, i + SIDE_OFFSET),
      quantity,
      price,
      total,
      status: pickFromArray(STATUSES, i + STATUS_OFFSET),
      executedAt: `${y}-${m}-${d}T${hh}:${mm}:00`,
      exchange: pickFromArray(EXCHANGES, i + EXCHANGE_OFFSET),
      broker: pickFromArray(BROKERS, i + BROKER_OFFSET),
    };
  },
);
