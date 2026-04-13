import type { BaseSelectOption, BaseSelectProps } from '@/components/ui/shared/selectTypes';

/** Option item for the combobox multi-select dropdown */
export type ComboboxOption = BaseSelectOption;

/** Props for the native combobox multi-select component */
export interface SelectNativeComboboxProps extends Omit<BaseSelectProps, 'value' | 'onChange'> {
  /** Currently selected values (multi-select array) */
  value?: ReadonlyArray<string | number>;
  /** Change handler for multi-select */
  onChange?: (values: ReadonlyArray<string | number>) => void;
  /** Enable search/filter in dropdown */
  searchable?: boolean;
  /** Name attribute for hidden form input */
  name?: string;
}
