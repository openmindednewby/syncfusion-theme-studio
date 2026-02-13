import type { BaseSelectOption, BaseSelectProps } from '@/components/ui/shared/selectTypes';

/** Option item for the native select dropdown */
export type SelectOption = BaseSelectOption;

/** Props for the native select component */
export interface SelectNativeProps extends BaseSelectProps {
  /** Enable search/filter in dropdown */
  searchable?: boolean;
  /** Name attribute for hidden form input */
  name?: string;
}
