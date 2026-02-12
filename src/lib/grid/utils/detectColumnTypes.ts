/**
 * Auto-detect column data types by sampling the first N rows.
 *
 * Inspects actual cell values to determine whether a column is
 * String, Number, Date, or Boolean. Per-column overrides take precedence.
 */
import { isValueDefined } from '@/utils/is';

import { ColumnType } from '../types';

const SAMPLE_SIZE = 10;
const DATE_ISO_REGEX = /^\d{4}-\d{2}-\d{2}/;

/** Check if a value looks like a date string or Date object */
function looksLikeDate(value: unknown): boolean {
  if (value instanceof Date) return true;
  if (typeof value !== 'string') return false;
  if (!DATE_ISO_REGEX.test(value)) return false;
  return !Number.isNaN(Date.parse(value));
}

/** Infer the ColumnType for a single non-null value */
function inferType(value: unknown): ColumnType {
  if (typeof value === 'boolean') return ColumnType.Boolean;
  if (typeof value === 'number') return ColumnType.Number;
  if (looksLikeDate(value)) return ColumnType.Date;
  return ColumnType.String;
}

/**
 * Detect column types by sampling up to `SAMPLE_SIZE` rows.
 *
 * @param data - Array of row objects keyed by field name
 * @param fields - Column field names to detect
 * @param overrides - Optional per-field type overrides
 * @returns A map of field name to detected ColumnType
 */
export function detectColumnTypes(
  data: Array<Record<string, unknown>>,
  fields: string[],
  overrides?: Record<string, ColumnType>,
): Record<string, ColumnType> {
  const result: Record<string, ColumnType> = {};
  const sample = data.slice(0, SAMPLE_SIZE);

  for (const field of fields) {
    if (isValueDefined(overrides?.[field])) {
       
      result[field] = overrides[field];
      continue;
    }

    // Find the first non-null value in the sample
    let detected = ColumnType.String;
    for (const row of sample) {
      const value = row[field];
      if (isValueDefined(value) && value !== '') {
        detected = inferType(value);
        break;
      }
    }

    result[field] = detected;
  }

  return result;
}
