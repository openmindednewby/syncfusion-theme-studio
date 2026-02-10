/**
 * Translation Error Helpers
 *
 * Enables Zod validation schemas to pass interpolation parameters
 * through error messages. Zod only supports string error messages,
 * so we encode the translation key + params as JSON.
 */
import { FM } from './helpers';
import { isValueDefined } from '../utils/is';

/**
 * TE - Translation Error
 *
 * Creates a JSON-encoded error message for Zod validators
 * that includes both the translation key and interpolation params.
 *
 * @param key - Translation key
 * @param p1 - Optional first parameter
 * @param p2 - Optional second parameter
 * @returns JSON string encoding key + params
 *
 * @example
 * z.string().min(2, TE('validation.minLength', '2'))
 */
export function TE(key: string, p1?: string, p2?: string): string {
  return JSON.stringify({ key, p1, p2 });
}

/**
 * Resolve a translation error message.
 *
 * Handles both structured JSON messages (from TE()) and
 * plain translation keys (backward compatible).
 *
 * @param message - Error message from Zod (JSON string or plain key)
 * @returns Resolved, interpolated translation string
 */
export function resolveTranslationError(message: string): string {
  try {
    const parsed: unknown = JSON.parse(message);

    if (typeof parsed !== 'object' || !isValueDefined(parsed)) return FM(message);
    if (!('key' in parsed) || typeof parsed.key !== 'string') return FM(message);

    const p1 = 'p1' in parsed && typeof parsed.p1 === 'string' ? parsed.p1 : undefined;
    const p2 = 'p2' in parsed && typeof parsed.p2 === 'string' ? parsed.p2 : undefined;

    return FM(parsed.key, p1, p2);
  } catch {
    return FM(message);
  }
}
