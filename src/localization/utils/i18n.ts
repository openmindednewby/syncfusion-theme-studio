/* eslint-disable no-console */
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';

export default i18n;

/** Supported locale codes. */
export const SUPPORTED_LANGUAGES = ['en', 'de', 'es', 'he'] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/** RTL languages. */
const RTL_LANGUAGES: ReadonlySet<string> = new Set(['he']);

/** Check whether a language code is RTL. */
export function isRtlLanguage(lang: string): boolean {
  return RTL_LANGUAGES.has(lang);
}

/** Type for a locale loader function. */
type LocaleLoader = () => Promise<{ default: Record<string, unknown> }>;

/** Type guard for loader functions. */
function isLoaderDefined(loader: LocaleLoader | undefined): loader is LocaleLoader {
  return typeof loader === 'function';
}

/**
 * Lazy-load a locale JSON file.
 * Each locale is code-split by Vite so it only loads when requested.
 */
const LOCALE_LOADERS: Record<string, LocaleLoader | undefined> = {
  de: async () => import('../locales/de.json'),
  es: async () => import('../locales/es.json'),
  he: async () => import('../locales/he.json'),
};

/** Cache of already-loaded locales to avoid duplicate imports. */
const loadedLocales = new Set<string>(['en']);

/**
 * Load a locale bundle on demand and add it to i18next resources.
 * Returns `true` if the locale was loaded successfully.
 */
export async function loadLocale(lang: string): Promise<boolean> {
  if (loadedLocales.has(lang)) return true;

  const loader = LOCALE_LOADERS[lang];
  if (!isLoaderDefined(loader)) return false;

  const mod = await loader();
  i18n.addResourceBundle(lang, 'translation', mod.default, true, true);
  loadedLocales.add(lang);
  return true;
}

/** Suppress the locize sponsorship console.info emitted directly by i18next */
const origInfo = console.info;
console.info = (...args: unknown[]) => {
  if (typeof args[0] === 'string' && args[0].includes('locize')) return;
  origInfo.apply(console, args);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  })
  .catch(() => {})
  .finally(() => { console.info = origInfo; });

// If the detected language is not English, eagerly load its bundle
const detectedLang: string = i18n.language.split('-')[0] ?? 'en';
if (detectedLang !== 'en' && detectedLang in LOCALE_LOADERS)
  loadLocale(detectedLang)
    .then(async () => i18n.changeLanguage(detectedLang))
    .catch(() => undefined);
