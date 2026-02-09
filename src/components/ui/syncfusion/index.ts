/**
 * Syncfusion UI Components - Themed Wrappers
 *
 * These components wrap Syncfusion components with theme-aware styling.
 * They consume the theme store and apply appropriate CSS classes for
 * light/dark mode support.
 *
 * Note: These components have heavy dependencies. Only import on pages
 * that need Syncfusion features.
 */

// Re-export from parent ui folder (these are the themed components)
export { default as DataGrid } from '../DataGrid';
export type { DataGridProps } from '../DataGrid';

export { default as Button } from '../Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from '../Button';

export { default as Input } from '../Input';
export type { InputProps } from '../Input';

export { default as Select } from '../Select';
export type { SelectProps, SelectOption } from '../Select';

export { default as DatePicker } from '../DatePicker';
export type { DatePickerProps } from '../DatePicker';

export { default as Dialog } from '../Dialog';
export type { DialogProps, DialogButton, DialogVariant } from '../Dialog';

// Re-export hooks
export {
  useSyncfusionTheme,
  getButtonClasses,
  type SyncfusionTheme,
  type ButtonClasses,
  type SizeClasses,
} from './hooks';

// Re-export types
export {
  SF_THEME_PREFIX,
  SF_LIGHT_CLASS,
  SF_DARK_CLASS,
  type ComponentSize,
  type ButtonVariant as SfButtonVariant,
  type ThemeClasses,
  type ButtonThemeClasses,
  type InputThemeClasses,
  type SelectThemeClasses,
  type DataGridThemeClasses,
  type DatePickerThemeClasses,
  type DialogThemeClasses,
  type AccessibilityProps,
} from './types';
