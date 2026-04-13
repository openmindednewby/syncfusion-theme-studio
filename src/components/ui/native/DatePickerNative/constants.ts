export const DAYS_IN_WEEK = 7;
export const CALENDAR_ROWS = 6;
export const TOTAL_CELLS = DAYS_IN_WEEK * CALENDAR_ROWS;

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export const WEEK_DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

export const KEYS = {
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
} as const;

/** Minimum space below trigger to show calendar downward */
export const MIN_SPACE_BELOW_PX = 320;

/** Number of years before/after the current year to show in the year dropdown */
export const YEAR_RANGE_OFFSET = 50;
