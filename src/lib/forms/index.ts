/**
 * Forms Library - Public API
 *
 * Provides form state management with Zod validation.
 *
 * @example
 * import { useFormWithSchema, emailSchema, requiredString } from '@/lib/forms';
 *
 * const schema = z.object({
 *   email: emailSchema,
 *   name: requiredString,
 * });
 *
 * const form = useFormWithSchema({ schema });
 */

export { useFormWithSchema } from './useFormWithSchema';
export * from './schemas';
