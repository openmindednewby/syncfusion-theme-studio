/**
 * Form Fields - Syncfusion/Native adapters for react-hook-form
 *
 * These components bridge react-hook-form Controller with UI components.
 * They handle value binding, error display, and touch state.
 *
 * @example
 * import { FormInput, FormSelect, FormCheckbox } from '@/components/ui/form-fields';
 *
 * <FormInput name="email" control={control} label="Email" />
 * <FormSelect name="category" control={control} options={categories} />
 * <FormCheckbox name="agree" control={control} label="I agree" />
 */

// Syncfusion form adapters
export { FieldError } from './FieldError';
export { FormInput } from './FormInput';
export { FormSelect } from './FormSelect';
export { FormDatePicker } from './FormDatePicker';
export { FormCheckbox } from './FormCheckbox';

// Native form adapters
export { FormNativeInput } from './FormNativeInput';
export { FormNativeSelect } from './FormNativeSelect';
export { FormNativeDatePicker } from './FormNativeDatePicker';
