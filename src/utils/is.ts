/**
 * Type guard utilities for checking values.
 * NOTE: These are the foundational utilities, so they must use native null/undefined checks.
 */

/* eslint-disable no-null-check/no-null-check -- This IS the utility that provides these checks */

/**
 * Checks if a value is defined (not null and not undefined).
 */
export function isValueDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Checks if a value is null or undefined.
 */
export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/* eslint-enable no-null-check/no-null-check */

/**
 * Checks if a string is not empty.
 */
export function isNotEmptyString(value: string | null | undefined): value is string {
  return isValueDefined(value) && value.length > 0;
}

/**
 * Checks if an array is not empty.
 */
export function isNotEmptyArray<T>(value: T[] | null | undefined): value is T[] {
  return isValueDefined(value) && value.length > 0;
}
