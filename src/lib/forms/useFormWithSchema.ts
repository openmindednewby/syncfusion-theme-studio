/**
 * Enhanced Form Hook with Zod Schema Validation
 *
 * Combines react-hook-form with Zod schema validation for type-safe forms.
 * Defaults to validation on blur for optimal performance.
 *
 * Note: This hook uses type assertions due to complex type interactions
 * between react-hook-form and Zod with strictOptionalPropertyTypes enabled.
 * The runtime behavior is correct - the assertions are needed for compilation.
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn, type FieldValues } from 'react-hook-form';

import type { z } from 'zod';

/**
 * Options for useFormWithSchema hook
 */
interface UseFormWithSchemaOptions<TFieldValues extends FieldValues> {
  /** Zod schema for validation */
  schema: z.ZodType<TFieldValues>;
  /** Default values for the form fields */
  defaultValues?: Partial<TFieldValues>;
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
  // Type assertions are required due to:
  // 1. zodResolver having complex generic type constraints
  // 2. exactOptionalPropertyTypes causing type incompatibilities
  // The runtime behavior is correct - zod validates and RHF manages form state

  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/consistent-type-assertions */
  const formResult = useForm({
    resolver: zodResolver(schema as any),
    mode,
    defaultValues: defaultValues as any,
  });
  return formResult as UseFormReturn<TFieldValues>;
  /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/consistent-type-assertions */
}
