import type { BaseDatePickerProps } from '@/components/ui/shared/datePickerTypes';

import type { DatePickerMode } from './utils/datePickerMode';

export interface CalendarDay {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  dateString: string;
}

export interface DatePickerNativeProps extends BaseDatePickerProps {
  /** Display mode: single date or date range */
  mode?: DatePickerMode;
  /** Selected date in YYYY-MM-DD format (single mode) */
  value?: string;
  /** Range start date in YYYY-MM-DD format */
  startDate?: string;
  /** Range end date in YYYY-MM-DD format */
  endDate?: string;
  /** Minimum selectable date (YYYY-MM-DD) */
  minDate?: string;
  /** Maximum selectable date (YYYY-MM-DD) */
  maxDate?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Callback for single mode date selection */
  onChange?: (date: string) => void;
  /** Callback for range mode date selection */
  onRangeChange?: (start: string, end: string) => void;
}
