# ENT-07: Language Switcher + Additional Locales

## Status: COMPLETED
## Priority: Medium

## Problem Statement
Currently only `en.json` exists for translations. The i18n system needed additional locales and a language switcher to demonstrate full i18n capability, including RTL support for Hebrew.

## Implementation Summary

### 1. Additional Locale Files Created
- `src/localization/locales/de.json` (German) -- Fully translated: app, accessibility, common, validation, login, notFound, errorPages, notifications, profile, dashboard, menu, sidebar, header, settings. Remaining keys prefixed with `[DE] `
- `src/localization/locales/es.json` (Spanish) -- Same coverage with `[ES] ` prefix for untranslated
- `src/localization/locales/he.json` (Hebrew/RTL) -- Same coverage with `[HE] ` prefix for untranslated

### 2. Language Switcher Component
- Created `src/components/layout/Header/components/LanguageSwitcher.tsx`
- Globe icon with language name and chevron dropdown
- Options: English, Deutsch, Espanol, Hebrew
- On change: loads locale bundle lazily, calls `i18n.changeLanguage()`, persists to localStorage
- Dropdown closes on outside click and Escape key
- Proper ARIA attributes (listbox/option roles, aria-selected, aria-expanded)

### 3. RTL Support
- When Hebrew is selected:
  - Sets `dir="rtl"` on `<html>` element
  - Calls `enableRtl(true)` from `@syncfusion/ej2-base` for Syncfusion component RTL support
- When switching back to LTR: removes `dir` attribute and calls `enableRtl(false)`

### 4. i18n Configuration Update
- Updated `src/localization/utils/i18n.ts`:
  - Added `SUPPORTED_LANGUAGES` array constant
  - Added `SupportedLanguage` type
  - Added `isRtlLanguage()` utility function
  - Added `loadLocale()` for lazy-loading locale bundles via dynamic import
  - Locales are code-split by Vite into separate chunks (confirmed: `de-*.js`, `es-*.js`, `he-*.js`)
  - On init, if detected language is not English, eagerly loads the locale bundle
  - localStorage preference is respected via `i18nextLng` key

### 5. Header Integration
- Added `LanguageSwitcher` component to Header, positioned between theme toggle and user menu
- Added language switcher test IDs to `testIds.ts`
- Added i18n keys for language switcher to `en.json` (`header.languageSwitcher`, `header.languageSwitcherHint`, `header.currentLanguage`)

## Files Modified
- `src/localization/utils/i18n.ts` -- Lazy loading, SUPPORTED_LANGUAGES, isRtlLanguage
- `src/localization/index.ts` -- Re-export new utilities
- `src/localization/locales/en.json` -- Added language switcher keys
- `src/localization/locales/de.json` -- NEW: German translations
- `src/localization/locales/es.json` -- NEW: Spanish translations
- `src/localization/locales/he.json` -- NEW: Hebrew translations
- `src/components/layout/Header/index.tsx` -- Added LanguageSwitcher
- `src/components/layout/Header/components/LanguageSwitcher.tsx` -- NEW: Language switcher component
- `src/shared/testIds.ts` -- Added LANGUAGE_SWITCHER and LANGUAGE_OPTION test IDs
- `src/localization/utils/i18n.test.ts` -- NEW: Unit tests for i18n utilities

## Verification Results
- Lint: PASSED (0 errors in our files)
- TypeScript: PASSED (0 errors in our files)
- Unit Tests: PASSED (7/7 new + 28/28 existing)
- Build: PASSED (locale chunks code-split correctly)

## Success Criteria
- [x] Language switcher visible in header
- [x] Switching to German/Spanish updates all translated strings
- [x] Hebrew activates RTL layout (dir="rtl" + Syncfusion enableRtl)
- [x] Language preference persists across refresh (localStorage)
- [x] Locale files are lazy-loaded (confirmed separate chunks)
- [x] Syncfusion components respect RTL when Hebrew is active
- [x] Lint passes
- [x] Build succeeds
