import type { BaseDatePickerProps } from '@/components/ui/shared/datePickerTypes';

import { PanelAlign } from './utils/panel-align';

export { PanelAlign };

export interface DateRangePickerNativeProps extends BaseDatePickerProps {
  /** Horizontal alignment of the dropdown panel relative to the input.
   * Use `PanelAlign.Right` when the picker is near the right edge of the viewport. */
  align?: PanelAlign;
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
  /** Callback when range changes */
  onRangeChange?: (start: string, end: string) => void;
}

export interface PresetRange {
  readonly id: string;
  readonly labelKey: string;
  readonly getRange: () => { start: string; end: string };
}
