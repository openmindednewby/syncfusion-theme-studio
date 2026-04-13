/**
 * Stock exchange trade order data and Syncfusion column definitions.
 * Generates 592 orders with modular arithmetic for deterministic variety.
 */
import type { ColumnModel } from '@syncfusion/ej2-grids';

import { FM } from '@/localization/utils/helpers';

function pickFromArray<T>(arr: T[], index: number): T {
  // Array is guaranteed non-empty; modulo ensures valid index
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- index always in bounds via modulo
  return arr[index % arr.length]!;
}

// Column width constants
const COL_WIDTH_ID = 100;
const COL_WIDTH_PRIORITY = 110;
const COL_WIDTH_VALUE = 80;
const COL_WIDTH_STATUS = 120;
const COL_WIDTH_TICKER = 220;
const COL_WIDTH_DATE = 150;
const COL_WIDTH_EXCHANGE = 140;
const COL_WIDTH_STRATEGY = 120;
const COL_WIDTH_ORDER_TYPE = 140;
const COL_WIDTH_BROKER = 120;
const COL_WIDTH_SETTLEMENT = 150;
const COL_WIDTH_EXECUTION = 180;
const COL_WIDTH_ACTIONS = 120;

export interface TradeOrder {
  id: number;
  priority: string;
  value: number;
  status: string;
  tickerSymbol: string;
  dateCreated: string;
  exchange: string;
  strategy: string;
  orderType: string;
  broker: string;
  settlementStatus: string;
  settlementRemaining: string;
  executionMethod: string;
}

export const ORDER_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('gridShowcase.alertId'), width: COL_WIDTH_ID },
  { field: 'priority', headerText: FM('gridShowcase.alertSeverity'), width: COL_WIDTH_PRIORITY },
  { field: 'value', headerText: FM('gridShowcase.alertScore'), width: COL_WIDTH_VALUE },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
  { field: 'tickerSymbol', headerText: FM('gridShowcase.alertCorrelation'), width: COL_WIDTH_TICKER },
  { field: 'dateCreated', headerText: FM('gridShowcase.alertDateCreated'), width: COL_WIDTH_DATE },
  { field: 'exchange', headerText: FM('gridShowcase.alertAsset'), width: COL_WIDTH_EXCHANGE },
  { field: 'strategy', headerText: FM('gridShowcase.alertTactic'), width: COL_WIDTH_STRATEGY },
  { field: 'orderType', headerText: FM('gridShowcase.alertTechnique'), width: COL_WIDTH_ORDER_TYPE },
  { field: 'broker', headerText: FM('gridShowcase.alertAssignee'), width: COL_WIDTH_BROKER },
  { field: 'settlementStatus', headerText: FM('gridShowcase.alertSlaStatus'), width: COL_WIDTH_SETTLEMENT },
  { field: 'executionMethod', headerText: FM('gridShowcase.alertAutomation'), width: COL_WIDTH_EXECUTION },
  { field: 'actions', headerText: FM('gridShowcase.alertActions'), width: COL_WIDTH_ACTIONS },
];

const ORDER_COUNT = 592;

const PRIORITIES = ['Critical', 'High', 'Medium', 'Low', 'Informational'];

const STATUSES = ['Open', 'Filled', 'Partial', 'Cancelled', 'Expired'];

const TICKER_SYMBOLS = [
  'AAPL — Apple Inc.',
  'TSLA — Tesla Inc.',
  'GOOGL — Alphabet Inc.',
  'MSFT — Microsoft Corp.',
  'AMZN — Amazon.com Inc.',
  'NVDA — NVIDIA Corp.',
  'META — Meta Platforms',
  'JPM — JPMorgan Chase',
  'V — Visa Inc.',
  'BRK.B — Berkshire Hathaway',
  'JNJ — Johnson & Johnson',
  'WMT — Walmart Inc.',
];

const EXCHANGES = [
  'NYSE', 'NASDAQ', 'LSE', 'TSE',
  'HKEX', 'SSE', 'Euronext', 'ASX',
];

const STRATEGIES = [
  'Day Trading', 'Swing Trading', 'Scalping', 'Position Trading',
  'Momentum', 'Value Investing', 'Growth Investing', 'Arbitrage',
  'Hedging', 'Index Tracking', 'Dividend Capture', 'Pairs Trading',
];

const ORDER_TYPES = [
  'Market Order', 'Limit Order', 'Stop-Loss Order',
  'Stop-Limit Order', 'Trailing Stop', 'Fill or Kill',
  'Good Till Cancelled', 'Immediate or Cancel', 'All or None',
  'Day Order', 'At Market Open', 'At Market Close',
];

const BROKERS = ['Sarah Chen', 'James Wilson', 'Maria Garcia', 'Alex Kumar', 'Unassigned'];
const SETTLEMENT_STATUSES = ['On Schedule', 'Delayed', 'Overdue'];
const EXECUTION_METHODS = ['Auto-Executed', 'Manual Review', 'Auto-Routed', 'Pending'];

const SCORE_CRITICAL = 95;
const SCORE_RANGE = 80;
const SCORE_JITTER = 7;
const SCORE_MIN = 10;
const SCORE_MAX = 100;
const HOUR_MS = 3600000;
const DAY_MS = 86400000;
const HOUR_MULTIPLIER = 3;
const DAY_MODULO = 5;
const SETTLEMENT_MODULO = 6;
const STATUS_OFFSET = 2;
const EXCHANGE_OFFSET = 1;
const BROKER_OFFSET = 3;
const EXECUTION_OFFSET = 1;
const BASE_YEAR = 2026;
const BASE_MONTH = 1;
const BASE_DAY = 12;
const BASE_HOUR = 8;
const PAD_WIDTH = 2;

const SETTLEMENT_CRITICAL_HOURS = 1;
const SETTLEMENT_HIGH_HOURS = 4;
const SETTLEMENT_MEDIUM_HOURS = 8;
const SETTLEMENT_LOW_HOURS = 24;
const SETTLEMENT_INFO_HOURS = 72;
const SETTLEMENT_HOURS = [SETTLEMENT_CRITICAL_HOURS, SETTLEMENT_HIGH_HOURS, SETTLEMENT_MEDIUM_HOURS, SETTLEMENT_LOW_HOURS, SETTLEMENT_INFO_HOURS];
const SCORE_DECIMAL_FACTOR = 0.1;
const SCORE_ROUND_PRECISION = 10;
const ID_OFFSET = 26077000;

export const TRADE_ORDERS: TradeOrder[] = Array.from(
  { length: ORDER_COUNT },
  (_, i) => {
    const priorityIndex = i % PRIORITIES.length;
    const scoreRaw = SCORE_CRITICAL - (priorityIndex * SCORE_RANGE) / PRIORITIES.length
      + (i % SCORE_JITTER) * SCORE_DECIMAL_FACTOR;
    const score = Math.round(scoreRaw * SCORE_ROUND_PRECISION) / SCORE_ROUND_PRECISION;
    const date = new Date(BASE_YEAR, BASE_MONTH, BASE_DAY, BASE_HOUR, 0, 0);
    date.setTime(
      date.getTime() - i * HOUR_MS * HOUR_MULTIPLIER - (i % DAY_MODULO) * DAY_MS,
    );
    const settlementHoursValue = pickFromArray(SETTLEMENT_HOURS, priorityIndex);
    const remaining = settlementHoursValue - (i % SETTLEMENT_MODULO);

    return {
      id: ID_OFFSET + i,
      priority: pickFromArray(PRIORITIES, i),
      value: Math.max(SCORE_MIN, Math.min(SCORE_MAX, score)),
      status: pickFromArray(STATUSES, i + STATUS_OFFSET),
      tickerSymbol: pickFromArray(TICKER_SYMBOLS, i),
      dateCreated: `${String(date.getDate()).padStart(PAD_WIDTH, '0')}/${String(date.getMonth() + 1).padStart(PAD_WIDTH, '0')}/${String(date.getFullYear())}`,
      exchange: pickFromArray(EXCHANGES, i + EXCHANGE_OFFSET),
      strategy: pickFromArray(STRATEGIES, i),
      orderType: pickFromArray(ORDER_TYPES, i),
      broker: pickFromArray(BROKERS, i + BROKER_OFFSET),
      settlementStatus: pickFromArray(SETTLEMENT_STATUSES, i),
      settlementRemaining: remaining > 0 ? `${String(remaining)} min remaining` : 'Overdue',
      executionMethod: pickFromArray(EXECUTION_METHODS, i + EXECUTION_OFFSET),
    };
  },
);
