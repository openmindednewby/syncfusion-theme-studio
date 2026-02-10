/**
 * Native UI components - Zero Syncfusion dependencies
 * Use these for pages that don't need Syncfusion (like Login)
 */
export { default as ButtonNative } from './ButtonNative';
export type { ButtonNativeProps } from './ButtonNative';

export { default as InputNative } from './InputNative';
export type { InputNativeProps } from './InputNative';

export { default as SelectNative } from './SelectNative';
export type { SelectNativeProps, SelectNativeOption } from './SelectNative';

export { default as CheckboxNative } from './CheckboxNative';
export type { CheckboxNativeProps } from './CheckboxNative';

export { default as DatePickerNative } from './DatePickerNative';
export type { DatePickerNativeProps } from './DatePickerNative';

export { default as DialogNative } from './DialogNative';
export type { DialogNativeProps, DialogNativeButton, DialogVariant } from './DialogNative';

export { default as AlertNative } from './AlertNative';
export type { AlertNativeProps, AlertVariant as AlertNativeVariant } from './AlertNative';

// Note: ButtonVariant and ButtonSize are exported separately to avoid conflicts
// with the Syncfusion Button component which has the same type names
