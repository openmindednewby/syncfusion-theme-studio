/**
 * Hook for getting theme-aware CSS classes for Syncfusion components
 */

import { useMemo } from 'react';

import { Mode } from '@/stores/mode';
import { useThemeStore } from '@/stores/useThemeStore';

import {
  SF_DARK_CLASS,
  SF_LIGHT_CLASS,
  SF_THEME_PREFIX,
  type ButtonVariant,
  type ComponentSize,
} from '../types';

/** Button CSS classes for all variants */
interface ButtonClasses {
  primary: string;
  secondary: string;
  outline: string;
  ghost: string;
  danger: string;
}

/** Size CSS classes */
interface SizeClasses {
  sm: string;
  md: string;
  lg: string;
}

/** Full theme classes structure */
interface SyncfusionTheme {
  modeClass: string;
  baseClass: string;
  button: ButtonClasses;
  buttonSize: SizeClasses;
  input: { base: string; error: string };
  select: { base: string; error: string };
  dataGrid: { base: string };
  datePicker: { base: string; error: string };
  dialog: { base: string; confirm: string; danger: string };
}

/** Static button variant mappings */
const BUTTON_MAP: ButtonClasses = {
  primary: 'e-primary sf-btn-primary',
  secondary: 'e-info sf-btn-secondary',
  outline: 'e-outline sf-btn-outline',
  ghost: 'e-flat sf-btn-ghost',
  danger: 'e-danger sf-btn-danger',
};

/** Static size mappings */
const SIZE_MAP: SizeClasses = {
  sm: 'e-small sf-size-sm',
  md: 'sf-size-md',
  lg: 'e-large sf-size-lg',
};

/**
 * Hook to get theme-aware CSS classes for Syncfusion components
 */
export function useSyncfusionTheme(): SyncfusionTheme {
  const { mode } = useThemeStore();

  return useMemo(
    () => ({
      modeClass: mode === Mode.Dark ? SF_DARK_CLASS : SF_LIGHT_CLASS,
      baseClass: SF_THEME_PREFIX,
      button: BUTTON_MAP,
      buttonSize: SIZE_MAP,
      input: { base: 'sf-input', error: 'e-error sf-input-error' },
      select: { base: 'sf-select', error: 'e-error sf-select-error' },
      dataGrid: { base: 'sf-datagrid' },
      datePicker: { base: 'sf-datepicker', error: 'e-error sf-datepicker-error' },
      dialog: { base: 'sf-dialog', confirm: 'sf-dialog-confirm', danger: 'sf-dialog-danger' },
    }),
    [mode],
  );
}

/**
 * Get CSS classes for a button with specified variant and size
 */
export function getButtonClasses(
  variant: ButtonVariant,
  size: ComponentSize,
  mode: Mode,
): string {
  const modeClass = mode === Mode.Dark ? SF_DARK_CLASS : SF_LIGHT_CLASS;
  return `${SF_THEME_PREFIX} ${modeClass} ${BUTTON_MAP[variant]} ${SIZE_MAP[size]}`;
}

export type { SyncfusionTheme, ButtonClasses, SizeClasses };
