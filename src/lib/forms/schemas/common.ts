/**
 * Common Zod Schema Validators
 *
 * Reusable validation schemas for form fields.
 * All error messages use translation keys for i18n support.
 */
import { z } from 'zod';

import { TE } from '@/localization/utils/translation-error';
import { isValueDefined } from '@/utils/is';

// Regex patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[\d\s-]{10,}$/;

// Constants
const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;

/**
 * Email validation schema
 * Validates format and requires non-empty string
 */
export const emailSchema = z
  .string()
  .min(1, 'validation.required')
  .regex(EMAIL_REGEX, 'validation.invalidEmail');

/**
 * Phone number validation schema
 * Accepts international formats with optional + prefix
 */
export const phoneSchema = z.string().regex(PHONE_REGEX, 'validation.invalidPhone');

/**
 * Password validation schema
 * Requires minimum 8 characters
 */
export const passwordSchema = z.string().min(MIN_PASSWORD_LENGTH, 'validation.passwordTooShort');

/**
 * Required string schema
 * Non-empty string validation
 */
export const requiredString = z.string().min(1, 'validation.required');

/**
 * Name validation schema
 * Requires minimum 2 characters
 */
export const nameSchema = z.string().min(1, 'validation.required').min(MIN_NAME_LENGTH, TE('validation.minLength', String(MIN_NAME_LENGTH)));

/**
 * Message/textarea validation schema
 * Requires minimum 10 characters for meaningful content
 */
export const messageSchema = z.string().min(1, 'validation.required').min(MIN_MESSAGE_LENGTH, TE('validation.minLength', String(MIN_MESSAGE_LENGTH)));

/**
 * Optional string schema
 * Transforms empty strings to undefined for cleaner data
 */
export const optionalString = z
  .string()
  .optional()
  .transform((val) => (isValueDefined(val) && val !== '' ? val : undefined));

/**
 * Positive number schema
 * Must be greater than zero
 */
export const positiveNumber = z.number().positive('validation.mustBePositive');

/**
 * Date schema
 * Requires a valid Date object
 */
export const dateSchema = z.date({ message: 'validation.required' });

/**
 * Future date schema
 * Date must be after current time
 */
export const futureDateSchema = z.date().refine((date) => date > new Date(), {
  message: 'validation.mustBeFutureDate',
});

/**
 * Creates a string schema with min/max length constraints
 * @param min - Minimum length
 * @param max - Maximum length
 */
export function stringWithLength(min: number, max: number): z.ZodString {
  return z.string().min(min, TE('validation.minLength', String(min))).max(max, TE('validation.maxLength', String(max)));
}

/**
 * Boolean schema with default false
 * Useful for checkbox fields
 */
export const booleanSchema = z.boolean().default(false);

/**
 * URL validation schema
 */
export const urlSchema = z.string().url('validation.invalidUrl');
