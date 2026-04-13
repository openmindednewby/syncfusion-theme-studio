import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@syncfusion/ej2-base', () => ({
  enableRtl: vi.fn(),
}));

vi.mock('@/localization', () => ({
  isRtlLanguage: (lang: string) => lang === 'he',
  loadLocale: vi.fn(),
  SUPPORTED_LANGUAGES: ['en', 'de', 'es', 'he'],
}));

// Must import after mocks are declared
const { applyDocumentDirection, LANGUAGE_LABELS } = await import('./LanguageSwitcher');

describe('applyDocumentDirection', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('dir');
    document.documentElement.removeAttribute('lang');
  });

  it('sets document.documentElement.lang to the provided language', () => {
    applyDocumentDirection('de');
    expect(document.documentElement.lang).toBe('de');
  });

  it('sets lang for RTL language', () => {
    applyDocumentDirection('he');
    expect(document.documentElement.lang).toBe('he');
  });

  it('sets dir="rtl" for RTL languages', () => {
    applyDocumentDirection('he');
    expect(document.documentElement.getAttribute('dir')).toBe('rtl');
  });

  it('removes dir attribute for LTR languages', () => {
    document.documentElement.setAttribute('dir', 'rtl');
    applyDocumentDirection('en');
    expect(document.documentElement.getAttribute('dir')).toBeNull();
  });
});

describe('LANGUAGE_LABELS', () => {
  it('uses correct Spanish label with tilde', () => {
    expect(LANGUAGE_LABELS.es).toBe('Español');
  });

  it('has labels for all supported languages', () => {
    expect(LANGUAGE_LABELS.en).toBe('English');
    expect(LANGUAGE_LABELS.de).toBe('Deutsch');
    expect(LANGUAGE_LABELS.he).toBeDefined();
  });
});
