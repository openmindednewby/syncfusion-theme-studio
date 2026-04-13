import { describe, expect, it } from 'vitest';

import { AVAILABLE_PAGE_SIZES } from '../constants';
import {
  computeThemePageSettings,
  mergeFallbackPageSettings,
  normalizePositiveInt,
  parsePageSizeOptions,
  parsePageSizesFromSettings,
} from './pageSettingsHelpers';

// ── normalizePositiveInt ──────────────────────────────────────────────

describe('normalizePositiveInt', () => {
  const FALLBACK = 42;

  it('returns the number for valid positive integers', () => {
    expect(normalizePositiveInt(10, FALLBACK)).toBe(10);
    expect(normalizePositiveInt(1, FALLBACK)).toBe(1);
  });

  it('preserves float value when input is a number type', () => {
    expect(normalizePositiveInt(3.9, FALLBACK)).toBe(3.9);
  });

  it('truncates float strings via parseInt', () => {
    expect(normalizePositiveInt('3.9', FALLBACK)).toBe(3);
  });

  it('returns fallback for zero', () => {
    expect(normalizePositiveInt(0, FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for negative numbers', () => {
    expect(normalizePositiveInt(-5, FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for NaN', () => {
    expect(normalizePositiveInt(NaN, FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for Infinity', () => {
    expect(normalizePositiveInt(Infinity, FALLBACK)).toBe(FALLBACK);
  });

  it('parses string numbers', () => {
    expect(normalizePositiveInt('25', FALLBACK)).toBe(25);
    expect(normalizePositiveInt('3.7', FALLBACK)).toBe(3);
  });

  it('returns fallback for non-numeric strings', () => {
    expect(normalizePositiveInt('abc', FALLBACK)).toBe(FALLBACK);
    expect(normalizePositiveInt('', FALLBACK)).toBe(FALLBACK);
  });

  it('returns fallback for null and undefined', () => {
    expect(normalizePositiveInt(null, FALLBACK)).toBe(FALLBACK);
    expect(normalizePositiveInt(undefined, FALLBACK)).toBe(FALLBACK);
  });
});

// ── parsePageSizeOptions ──────────────────────────────────────────────

describe('parsePageSizeOptions', () => {
  it('parses a comma-separated string', () => {
    expect(parsePageSizeOptions('5,10,25')).toEqual([5, 10, 25]);
  });

  it('trims whitespace in string values', () => {
    expect(parsePageSizeOptions(' 10 , 20 , 50 ')).toEqual([10, 20, 50]);
  });

  it('deduplicates values', () => {
    expect(parsePageSizeOptions('10,10,20')).toEqual([10, 20]);
  });

  it('returns AVAILABLE_PAGE_SIZES for empty string', () => {
    expect(parsePageSizeOptions('')).toEqual(AVAILABLE_PAGE_SIZES);
  });

  it('returns AVAILABLE_PAGE_SIZES for invalid string', () => {
    expect(parsePageSizeOptions('abc,def')).toEqual(AVAILABLE_PAGE_SIZES);
  });

  it('parses an array of numbers', () => {
    expect(parsePageSizeOptions([5, 15, 30])).toEqual([5, 15, 30]);
  });

  it('parses an array of string numbers', () => {
    expect(parsePageSizeOptions(['10', '25'])).toEqual([10, 25]);
  });

  it('filters invalid items from array', () => {
    expect(parsePageSizeOptions([10, -5, 0, 20])).toEqual([10, 20]);
  });

  it('returns AVAILABLE_PAGE_SIZES for empty array', () => {
    expect(parsePageSizeOptions([])).toEqual(AVAILABLE_PAGE_SIZES);
  });

  it('returns AVAILABLE_PAGE_SIZES for unknown types', () => {
    expect(parsePageSizeOptions(42)).toEqual(AVAILABLE_PAGE_SIZES);
    expect(parsePageSizeOptions(null)).toEqual(AVAILABLE_PAGE_SIZES);
    expect(parsePageSizeOptions(undefined)).toEqual(AVAILABLE_PAGE_SIZES);
    expect(parsePageSizeOptions(true)).toEqual(AVAILABLE_PAGE_SIZES);
  });
});

// ── parsePageSizesFromSettings ────────────────────────────────────────

describe('parsePageSizesFromSettings', () => {
  it('returns undefined for boolean input', () => {
    expect(parsePageSizesFromSettings(true)).toBeUndefined();
    expect(parsePageSizesFromSettings(false)).toBeUndefined();
  });

  it('returns undefined for undefined input', () => {
    expect(parsePageSizesFromSettings(undefined)).toBeUndefined();
  });

  it('parses a valid number array', () => {
    expect(parsePageSizesFromSettings([10, 25, 50])).toEqual([10, 25, 50]);
  });

  it('parses string items in array', () => {
    expect(parsePageSizesFromSettings(['5', '20'])).toEqual([5, 20]);
  });

  it('returns undefined for array with no valid entries', () => {
    expect(parsePageSizesFromSettings(['abc', 'def'])).toBeUndefined();
  });
});

// ── computeThemePageSettings ──────────────────────────────────────────

describe('computeThemePageSettings', () => {
  it('returns defaults when no dataGridTheme is provided', () => {
    const result = computeThemePageSettings(undefined);
    expect(result.pageSize).toBe(10);
    expect(result.pageCount).toBe(5);
    expect(result.pageSizes).toEqual(AVAILABLE_PAGE_SIZES);
  });

  it('uses configured page size', () => {
    const result = computeThemePageSettings({
      paginationDefaultPageSize: 25,
    });
    expect(result.pageSize).toBe(25);
  });

  it('prepends page size to options if not already included', () => {
    const result = computeThemePageSettings({
      paginationDefaultPageSize: 7,
      paginationPageSizeOptions: '10,20',
    });
    expect(result.pageSizes).toContain(7);
    expect(result.pageSizes[0]).toBe(7);
  });

  it('does not duplicate page size if already in options', () => {
    const result = computeThemePageSettings({
      paginationDefaultPageSize: 10,
      paginationPageSizeOptions: '10,20,50',
    });
    const occurrences = result.pageSizes.filter((s) => s === 10).length;
    expect(occurrences).toBe(1);
  });
});

// ── mergeFallbackPageSettings ─────────────────────────────────────────

describe('mergeFallbackPageSettings', () => {
  const BASE = { pageSize: 10, pageCount: 5, pageSizes: [10, 20, 50] };

  it('returns base when pageSettings is empty', () => {
    expect(mergeFallbackPageSettings(BASE, {})).toEqual(BASE);
  });

  it('overrides pageSize from pageSettings', () => {
    const result = mergeFallbackPageSettings(BASE, { pageSize: 25 });
    expect(result.pageSize).toBe(25);
    expect(result.pageCount).toBe(5);
  });

  it('overrides pageCount from pageSettings', () => {
    const result = mergeFallbackPageSettings(BASE, { pageCount: 8 });
    expect(result.pageCount).toBe(8);
  });

  it('overrides pageSizes from pageSettings array', () => {
    const result = mergeFallbackPageSettings(BASE, {
      pageSizes: [5, 15, 30],
    });
    expect(result.pageSizes).toEqual([5, 15, 30]);
  });

  it('ignores pageSizes if boolean true', () => {
    const result = mergeFallbackPageSettings(BASE, { pageSizes: true });
    expect(result.pageSizes).toEqual(BASE.pageSizes);
  });

  it('does not mutate the original theme settings', () => {
    const original = { ...BASE };
    mergeFallbackPageSettings(original, { pageSize: 99 });
    expect(original.pageSize).toBe(10);
  });
});
