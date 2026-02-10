import { describe, it, expect, vi, beforeEach } from 'vitest';

import { TE, resolveTranslationError } from './translation-error';

// Mock isValueDefined FIRST
vi.mock('../utils/is', () => {
  function checkDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }
  return { isValueDefined: checkDefined };
});

// Mock the i18n module with translation table
vi.mock('./i18n', () => ({
  default: {
    t: vi.fn((id: string, options?: Record<string, string | undefined>) => {
      const translations: Record<string, string> = {
        'validation.minLength': 'Must be at least {{p1}} characters',
        'validation.required': 'This field is required',
      };
      let result = translations[id] ?? id;
      const p1 = options?.['p1'];
      const p2 = options?.['p2'];
      if (p1 !== undefined && p1 !== '') result = result.replace('{{p1}}', p1);
      if (p2 !== undefined && p2 !== '') result = result.replace('{{p2}}', p2);
      return result;
    }),
    language: 'en',
  },
}));

describe('TE (Translation Error)', () => {
  it('creates JSON string with key only', () => {
    const result = TE('validation.required');
    const parsed = JSON.parse(result);
    expect(parsed.key).toBe('validation.required');
    expect(parsed.p1).toBeUndefined();
    expect(parsed.p2).toBeUndefined();
  });

  it('creates JSON string with key and p1', () => {
    const result = TE('validation.minLength', '2');
    const parsed = JSON.parse(result);
    expect(parsed.key).toBe('validation.minLength');
    expect(parsed.p1).toBe('2');
  });

  it('creates JSON string with key, p1 and p2', () => {
    const result = TE('validation.range', '2', '100');
    const parsed = JSON.parse(result);
    expect(parsed.key).toBe('validation.range');
    expect(parsed.p1).toBe('2');
    expect(parsed.p2).toBe('100');
  });
});

describe('resolveTranslationError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('resolves structured JSON message with params', () => {
    const structured = TE('validation.minLength', '2');
    const result = resolveTranslationError(structured);
    expect(result).toContain('2');
  });

  it('resolves plain translation key (backward compatible)', () => {
    const result = resolveTranslationError('validation.required');
    expect(result).toBe('This field is required');
  });

  it('handles empty string gracefully', () => {
    const result = resolveTranslationError('');
    expect(result).toBe('');
  });

  it('falls back to FM for non-JSON strings', () => {
    const result = resolveTranslationError('not-json-at-all');
    expect(result).toBe('not-json-at-all');
  });

  it('falls back to FM when parsed JSON has no key field', () => {
    const noKey = JSON.stringify({ notKey: 'something' });
    const result = resolveTranslationError(noKey);
    expect(typeof result).toBe('string');
  });
});
