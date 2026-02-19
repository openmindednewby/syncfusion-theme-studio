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

// Syncfusion component wrappers (now located in this folder)
export { default as Button, ButtonVariant, ButtonSize } from './Button';
export type { ButtonProps } from './Button';

export { default as Input } from './Input';
export type { InputProps } from './Input';

export { default as Select } from './Select';
export type { SelectProps, SelectOption } from './Select';

export { default as DataGrid } from './DataGrid';
export type { DataGridProps } from './DataGrid';

export { default as DatePicker } from './DatePicker';
export type { DatePickerProps } from './DatePicker';

export { default as SyncfusionDescription } from './Description';
export type { SyncfusionDescriptionProps } from './Description';

export { default as Dialog, DialogVariant } from './Dialog';
export type { DialogProps, DialogButton } from './Dialog';

export { default as Alert, AlertSeverity, AlertDisplayVariant } from './Alert';
export type { AlertProps } from './Alert';

export { default as SyncfusionTabs } from './Tabs';
export type { SyncfusionTabsProps } from './Tabs';

export { default as SyncfusionTimeline } from './Timeline';
export type { SyncfusionTimelineProps } from './Timeline';

export { default as SyncfusionTag, TagVariant as SfTagVariant } from './Tag';
export type { SyncfusionTagProps } from './Tag';

export { default as SyncfusionBadge, BadgeVariant as SfBadgeVariant } from './Badge';
export type { SyncfusionBadgeProps } from './Badge';

export { default as SyncfusionAvatar, AvatarSize as SfAvatarSize } from './Avatar';
export type { SyncfusionAvatarProps } from './Avatar';

export { default as SyncfusionCard } from './Card';
export type { SyncfusionCardProps } from './Card';

export { default as SyncfusionProgressBar, ProgressBarVariant as SfProgressBarVariant } from './ProgressBar';
export type { SyncfusionProgressBarProps } from './ProgressBar';

export { default as SyncfusionTooltip, TooltipPlacement as SfTooltipPlacement } from './Tooltip';
export type { SyncfusionTooltipProps } from './Tooltip';

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
  ComponentSize,
  ButtonVariant as SfButtonVariant,
} from './types';
export type {
  ThemeClasses,
  ButtonThemeClasses,
  InputThemeClasses,
  SelectThemeClasses,
  DataGridThemeClasses,
  DatePickerThemeClasses,
  DialogThemeClasses,
  AccessibilityProps,
} from './types';
