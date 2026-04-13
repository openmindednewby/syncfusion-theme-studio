/** Status badge color classes for PillBadge */
export const STATUS_COLOR_CLASS: Record<string, string> = {
  Filled: 'bg-success-50 text-success-700',
  'Partially Filled': 'bg-warning-50 text-warning-700',
  Cancelled: 'bg-surface-hover text-text-muted',
  Expired: 'bg-error-50 text-error-700',
};

/** Side badge color classes for PillBadge */
export const SIDE_COLOR_CLASS: Record<string, string> = {
  Buy: 'bg-info-50 text-info-700',
  Sell: 'bg-purple-100 text-purple-700',
};

/** Fallback color class when no match is found */
export const FALLBACK_COLOR_CLASS = 'bg-surface-hover text-text-muted';

/** Number of trades to generate */
export const TRADE_COUNT = 80;

/** Base trade ID offset */
export const TRADE_ID_OFFSET = 10001;

/** Table minimum width for horizontal scroll */
export const TABLE_MIN_WIDTH = 1000;
