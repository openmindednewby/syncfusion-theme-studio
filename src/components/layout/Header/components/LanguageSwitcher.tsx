import { useCallback, useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { enableRtl } from '@syncfusion/ej2-base';

import { IconChevronDown, IconGlobe } from '@/components/icons';
import { isRtlLanguage, loadLocale, SUPPORTED_LANGUAGES } from '@/localization';
import type { SupportedLanguage } from '@/localization';
import { FM } from '@/localization/utils/helpers';
import { TestIds } from '@/shared/testIds';
import { isValueDefined } from '@/utils/is';

/**
 * Apply or remove RTL direction on the document root element
 * and toggle Syncfusion's global RTL mode.
 */
export function applyDocumentDirection(lang: string): void {
  const isRtl = isRtlLanguage(lang);

  document.documentElement.lang = lang;

  if (isRtl)
    document.documentElement.setAttribute('dir', 'rtl');
  else
    document.documentElement.removeAttribute('dir');

  enableRtl(isRtl);
}

/** Display label for each supported language. */
export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  he: '\u05E2\u05D1\u05E8\u05D9\u05EA',
};

/** Check if a string is a supported language code. */
function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  // Inlined set avoids a module-level const that triggers the enforce-function-style lint
  return new Set<string>(SUPPORTED_LANGUAGES).has(lang);
}

/** Resolve a raw i18n language tag to its base language code. */
function resolveBaseLanguage(rawLang: string): SupportedLanguage {
  const base = rawLang.split('-')[0] ?? 'en';
  return isSupportedLanguage(base) ? base : 'en';
}

const ICON_SIZE = 'h-4 w-4';
const CHEVRON_SIZE = 'h-3 w-3';

export const LanguageSwitcher = (): JSX.Element => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = resolveBaseLanguage(i18n.language);

  useEffect(() => {
    applyDocumentDirection(currentLang);
  }, [currentLang]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target;
      const isOutsideRef = isValueDefined(dropdownRef.current) && target instanceof Node;
      if (isOutsideRef && !dropdownRef.current.contains(target))
        setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectLanguage = useCallback(
    (lang: SupportedLanguage) => {
      loadLocale(lang)
        .then(async () => i18n.changeLanguage(lang))
        .then(() => setIsOpen(false))
        .catch(() => undefined);
    },
    [i18n],
  );

  const currentLabel = LANGUAGE_LABELS[currentLang];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={FM('header.languageSwitcher')}
        className="flex items-center gap-1 rounded-md p-2 text-text-secondary hover:bg-surface hover:text-text-primary"
        data-testid={TestIds.LANGUAGE_SWITCHER}
        title={FM('header.currentLanguage', currentLabel)}
        type="button"
        onClick={handleToggle}
      >
        <IconGlobe className={ICON_SIZE} />
        <span className="hidden text-sm sm:inline">{currentLabel}</span>
        <IconChevronDown className={`${CHEVRON_SIZE} transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen ? (
        <div
          className="absolute end-0 z-50 mt-1 min-w-[140px] overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-lg"
          role="listbox"
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = lang === currentLang;
            return (
              <button
                key={lang}
                aria-selected={isActive}
                className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-50 font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300'
                    : 'text-text-primary hover:bg-surface-hover'
                }`}
                data-testid={`${TestIds.LANGUAGE_OPTION}-${lang}`}
                role="option"
                type="button"
                onClick={() => handleSelectLanguage(lang)}
              >
                {LANGUAGE_LABELS[lang]}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
