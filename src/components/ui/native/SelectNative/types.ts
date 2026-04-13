import type { BaseSelectOption, BaseSelectProps } from '@/components/ui/shared/selectTypes';

/** Option item for the native select dropdown */
export type SelectOption = BaseSelectOption;

/** Props for the native select component */
export interface SelectNativeProps extends BaseSelectProps {
  /** Accessible label for the trigger when no visible label is rendered */
  'aria-label'?: string;
  /** Enable search/filter in dropdown */
  searchable?: boolean;
  /** Name attribute for hidden form input */
  name?: string;
  /** Explicit width (number = px, string = any CSS unit) */
  width?: number | string;
  /** Minimum width (number = px, string = any CSS unit) */
  minWidth?: number | string;
  /** Maximum width (number = px, string = any CSS unit) */
  maxWidth?: number | string;
}
