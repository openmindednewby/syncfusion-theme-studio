/**
 * Shared types for Syncfusion component wrappers
 */

/** Common size variants for components */
export type ComponentSize = 'sm' | 'md' | 'lg';

/** Common button variants */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/** CSS class prefix for themed components */
export const SF_THEME_PREFIX = 'sf-themed' as const;

/** Mode-specific CSS class */
export const SF_LIGHT_CLASS = 'sf-light' as const;
export const SF_DARK_CLASS = 'sf-dark' as const;

/** Component-specific CSS classes for theming */
export interface ThemeClasses {
  /** Base class applied to all themed components */
  base: string;
  /** Mode-specific class (sf-light or sf-dark) */
  mode: string;
}

/** Button theme classes by variant */
export interface ButtonThemeClasses extends ThemeClasses {
  variant: string;
  size: string;
  fullWidth: string;
  loading: string;
}

/** Input theme classes */
export interface InputThemeClasses extends ThemeClasses {
  error: string;
  fullWidth: string;
}

/** Select theme classes */
export interface SelectThemeClasses extends ThemeClasses {
  error: string;
  fullWidth: string;
}

/** DataGrid theme classes */
export interface DataGridThemeClasses extends ThemeClasses {
  loading: string;
}

/** DatePicker theme classes */
export interface DatePickerThemeClasses extends ThemeClasses {
  error: string;
  fullWidth: string;
}

/** Dialog theme classes */
export interface DialogThemeClasses extends ThemeClasses {
  variant: string;
}

/** Accessibility props common to all components */
export interface AccessibilityProps {
  /** Test ID for E2E testing */
  testId?: string;
  /** Accessible label */
  ariaLabel?: string;
  /** Accessible description */
  ariaDescribedBy?: string;
}
