import { describe, it, expect, vi, beforeEach } from 'vitest';

// Override the global mock so we can test the real utilities
vi.mock('@/localization/utils/i18n', async (importOriginal) => {
  const actual: Record<string, unknown> = await importOriginal();
  return { ...actual };
});

// Must import AFTER vi.mock call
const { isRtlLanguage, SUPPORTED_LANGUAGES } = await import('./i18n');

beforeEach(() => {
  vi.clearAllMocks();
});

describe('SUPPORTED_LANGUAGES', () => {
  it('includes exactly four languages', () => {
    expect(SUPPORTED_LANGUAGES).toHaveLength(4);
  });

  it('includes en, de, es, and he', () => {
    expect(SUPPORTED_LANGUAGES).toContain('en');
    expect(SUPPORTED_LANGUAGES).toContain('de');
    expect(SUPPORTED_LANGUAGES).toContain('es');
    expect(SUPPORTED_LANGUAGES).toContain('he');
  });
});

describe('isRtlLanguage', () => {
  it('returns true for Hebrew', () => {
    expect(isRtlLanguage('he')).toBe(true);
  });

  it('returns false for English', () => {
    expect(isRtlLanguage('en')).toBe(false);
  });

  it('returns false for German', () => {
    expect(isRtlLanguage('de')).toBe(false);
  });

  it('returns false for Spanish', () => {
    expect(isRtlLanguage('es')).toBe(false);
  });

  it('returns false for unknown language codes', () => {
    expect(isRtlLanguage('fr')).toBe(false);
    expect(isRtlLanguage('zh')).toBe(false);
    expect(isRtlLanguage('')).toBe(false);
  });
});
