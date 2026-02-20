/**
 * Pure helper functions for computing DataGrid page settings.
 *
 * These parse theme-configured page sizes and merge prop/config
 * overrides to produce the final Syncfusion PageSettingsModel.
 */
import type { PageSettingsModel } from '@syncfusion/ej2-react-grids';

import { isValueDefined } from '@/utils/is';

import {
  AVAILABLE_PAGE_SIZES,
  DEFAULT_PAGE_SETTINGS,
  PAGE_SIZE_OPTIONS_SEPARATOR,
} from '../constants';

const RADIX_DECIMAL = 10;
const FALLBACK_PAGE_SIZE = 10;
const DEFAULT_FALLBACK_PAGE_COUNT = 5;

/** Parse a value to a positive integer, or return the fallback. */
export function normalizePositiveInt(
  value: unknown,
  fallback: number,
): number {
  const n =
    typeof value === 'number'
      ? value
      : Number.parseInt(String(value), RADIX_DECIMAL);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/** Parse page size options from an unknown input (theme config). */
export function parsePageSizeOptions(input: unknown): number[] {
  if (Array.isArray(input)) {
    const parsedArray = input
      .map((value: unknown) =>
        Number.parseInt(String(value), RADIX_DECIMAL),
      )
      .filter((n) => Number.isFinite(n) && n > 0);
    return parsedArray.length > 0
      ? Array.from(new Set(parsedArray))
      : AVAILABLE_PAGE_SIZES;
  }

  if (typeof input !== 'string') return AVAILABLE_PAGE_SIZES;

  const parsed = input
    .split(PAGE_SIZE_OPTIONS_SEPARATOR)
    .map((part) => Number.parseInt(part.trim(), RADIX_DECIMAL))
    .filter((n) => Number.isFinite(n) && n > 0);
  return parsed.length > 0
    ? Array.from(new Set(parsed))
    : AVAILABLE_PAGE_SIZES;
}

/** Parse pageSizes from Syncfusion PageSettingsModel (boolean or array). */
export function parsePageSizesFromSettings(
  input: boolean | Array<number | string> | undefined,
): number[] | undefined {
  if (!Array.isArray(input)) return undefined;
  const parsed = input
    .map((value) => Number.parseInt(String(value), RADIX_DECIMAL))
    .filter((n) => Number.isFinite(n) && n > 0);
  return parsed.length > 0 ? Array.from(new Set(parsed)) : undefined;
}

/** Compute theme-derived page settings from the dataGrid theme config. */
export function computeThemePageSettings(
  dataGridTheme: { paginationDefaultPageSize?: unknown; paginationPageSizeOptions?: unknown } | undefined,
): { pageSize: number; pageCount: number; pageSizes: number[] } {
  const fallbackPageSize =
    DEFAULT_PAGE_SETTINGS.pageSize ?? FALLBACK_PAGE_SIZE;
  const defaultPageSize = normalizePositiveInt(
    dataGridTheme?.paginationDefaultPageSize,
    fallbackPageSize,
  );
  const parsedSizes = parsePageSizeOptions(
    dataGridTheme?.paginationPageSizeOptions,
  );
  const normalizedSizes = parsedSizes.includes(defaultPageSize)
    ? parsedSizes
    : [defaultPageSize, ...parsedSizes];
  return {
    pageSize: defaultPageSize,
    pageCount:
      DEFAULT_PAGE_SETTINGS.pageCount ?? DEFAULT_FALLBACK_PAGE_COUNT,
    pageSizes: normalizedSizes,
  };
}

/** Merge prop page settings into theme page settings. */
export function mergeFallbackPageSettings(
  themePageSettings: { pageSize: number; pageCount: number; pageSizes: number[] },
  pageSettings: PageSettingsModel,
): { pageSize: number; pageCount: number; pageSizes: number[] } {
  const merged = { ...themePageSettings };
  if (isValueDefined(pageSettings.pageSize))
    merged.pageSize = pageSettings.pageSize;

  if (isValueDefined(pageSettings.pageCount))
    merged.pageCount = pageSettings.pageCount;

  const parsedPageSizes = parsePageSizesFromSettings(
    pageSettings.pageSizes,
  );
  if (isValueDefined(parsedPageSizes)) merged.pageSizes = parsedPageSizes;
  return merged;
}
