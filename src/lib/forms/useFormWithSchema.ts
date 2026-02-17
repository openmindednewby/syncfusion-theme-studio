/**
 * Enhanced Form Hook with Zod Schema Validation
 *
 * Combines react-hook-form with Zod schema validation for type-safe forms.
 * Defaults to validation on blur for optimal performance.
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn, type FieldValues, type DefaultValues } from 'react-hook-form';

import { isValueDefined } from '@/utils/is';

import type { z } from 'zod';

/**
 * Options for useFormWithSchema hook
 */
interface UseFormWithSchemaOptions<TFieldValues extends FieldValues> {
  /** Zod schema for validation */
  schema: z.ZodType<TFieldValues>;
  /** Default values for the form fields */
  defaultValues?: DefaultValues<TFieldValues>;
  /** Validation mode */
  mode?: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';
}

/**
 * useFormWithSchema - Enhanced form hook with Zod integration
 *
 * @param options - Form options including the Zod schema
 * @returns React Hook Form methods with proper typing
 *
 * @example
 * const form = useFormWithSchema({
 *   schema: contactSchema,
 *   defaultValues: { email: '', name: '' },
 * });
 */
export function useFormWithSchema<TFieldValues extends FieldValues>({
  schema,
  defaultValues,
  mode = 'onBlur',
}: UseFormWithSchemaOptions<TFieldValues>): UseFormReturn<TFieldValues> {
  return useForm<TFieldValues, unknown, TFieldValues>({
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- z.ZodType<T> defaults Input to unknown; zodResolver's Zod 4 overload requires Input extends FieldValues. The cast adds the Input type param without changing runtime behavior.
    resolver: zodResolver(schema as z.ZodType<TFieldValues, TFieldValues>),
    mode,
    ...(isValueDefined(defaultValues) ? { defaultValues } : {}),
  });
}
