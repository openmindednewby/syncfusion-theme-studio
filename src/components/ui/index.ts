/**
 * UI Components Barrel Export
 *
 * IMPORTANT: This barrel ONLY exports native components to keep the login page bundle small.
 * For Syncfusion components, import directly from '@/components/ui/syncfusion':
 *
 *   import { Button, DataGrid } from '@/components/ui/syncfusion';
 *
 * This ensures proper tree-shaking and keeps the 790KB Syncfusion Grid out of the
 * initial bundle for pages that don't need it.
 */

// Native components - zero Syncfusion dependencies, safe for all pages
export { ButtonNative, InputNative } from './native';
export type { ButtonNativeProps, InputNativeProps } from './native';

// Re-export types only (types are erased at runtime, no bundle impact)
export { AlertSeverity, AlertDisplayVariant, ButtonVariant, ButtonSize, DialogVariant } from './syncfusion';
export type {
  DataGridProps,
  ButtonProps,
  InputProps,
  SelectProps,
  SelectOption,
  DatePickerProps,
  DialogProps,
  DialogButton,
  AlertProps,
} from './syncfusion';
