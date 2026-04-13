# ENT-07: Language Switcher + Additional Locales

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Objective

Add a language switcher to the app and create at least 2 additional locale files so the i18n system is demonstrated end-to-end. Currently only `en.json` exists.

## Implementation Plan

### 1. Additional Locales

Create translation files for:
- `de.json` — German (common enterprise language)
- `es.json` — Spanish (widely spoken)
- `he.json` — Hebrew (RTL language to demonstrate RTL support)

Don't need 100% coverage — translate the main navigation, common buttons, dashboard, and login page. Leave deep component showcase keys in English with a `[DE]`/`[ES]`/`[HE]` prefix so it's obvious which strings are translated.

### 2. Language Switcher Component

- Create `src/components/layout/Header/LanguageSwitcher.tsx`
- Dropdown in the header showing current language + flag icon
- Options: English, Deutsch, Español, עברית
- On change: call `i18n.changeLanguage(code)`, persist to localStorage
- Smooth transition (no full page reload)

### 3. RTL Support (Hebrew)

- When Hebrew is selected, set `dir="rtl"` on `<html>` element
- Sidebar should flip to right side
- All layouts should mirror (flexbox `direction: rtl`)
- Syncfusion components support RTL via `enableRtl` prop

### 4. i18n Configuration Update

- Register new locales in i18n config
- Lazy-load locale files (dynamic import) to avoid bloating the bundle
- Update language detector to respect localStorage preference

## Success Criteria

- [ ] Language switcher visible in header
- [ ] Switching to German/Spanish updates all translated strings
- [ ] Hebrew activates RTL layout
- [ ] Language preference persists across refresh
- [ ] Locale files are lazy-loaded
- [ ] Syncfusion components respect RTL when Hebrew is active
