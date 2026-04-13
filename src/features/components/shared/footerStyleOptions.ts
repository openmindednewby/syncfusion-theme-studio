/** Shared footer styling options for both Syncfusion and Native grid playgrounds. */
import type { ControlOption } from './InteractiveControls';

export const DEFAULT_FOOTER_BORDER_WIDTH = '2px';
export const DEFAULT_FOOTER_FONT_SIZE = '13px';
export const DEFAULT_FOOTER_FONT_WEIGHT = '600';
export const DEFAULT_FOOTER_PADDING = '10px 16px';

export const FOOTER_BORDER_WIDTH_OPTIONS: ControlOption[] = [
  { value: '1px', label: '1px' },
  { value: '2px', label: '2px (Default)' },
  { value: '3px', label: '3px' },
  { value: '4px', label: '4px' },
];

export const FOOTER_FONT_SIZE_OPTIONS: ControlOption[] = [
  { value: '11px', label: '11px' },
  { value: '13px', label: '13px (Default)' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px' },
];

export const FOOTER_FONT_WEIGHT_OPTIONS: ControlOption[] = [
  { value: '400', label: '400 (Normal)' },
  { value: '500', label: '500 (Medium)' },
  { value: '600', label: '600 (Default)' },
  { value: '700', label: '700 (Bold)' },
];

export const FOOTER_PADDING_OPTIONS: ControlOption[] = [
  { value: '6px 12px', label: 'Compact' },
  { value: '10px 16px', label: 'Default' },
  { value: '14px 16px', label: 'Comfortable' },
  { value: '18px 20px', label: 'Spacious' },
];
