# IMP-08: Internationalize Hardcoded English Strings with FM()

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Problem

30+ instances of hardcoded English strings that should use the `FM()` translation function.

### Hardcoded `aria-label` strings (~10 components)

| File | Line | Hardcoded String |
|------|------|-----------------|
| `src/components/common/components/LoadingSpinner.tsx` | 27 | `"Loading"` |
| `src/components/layout/ThemeSettingsDrawer/components/ThemeStudioLoader.tsx` | 88 | `"Loading section"` |
| `src/components/ui/native/AlertNative/index.tsx` | 79 | `"Dismiss alert"` |
| `src/components/ui/native/DialogNative/index.tsx` | 126 | `"Close dialog"` |
| `src/components/ui/native/ToastNative/components/ToastItem.tsx` | 26 | `"Dismiss notification"` |
| `src/components/ui/native/SelectNative/components/DropdownPopup.tsx` | 57,66 | `"Filter options"`, `"Options"` |
| `src/features/components/shared/NavMenu.tsx` | 98 | `"Navigation menu"` |
| `src/components/ui/syncfusion/DataGrid/index.tsx` | 97 | `"Loading"` |
| `src/features/components/pages/ComponentsPage/sections/SelectionSection.tsx` | 69 | `"Technology tags"` |

### Hardcoded `placeholder` strings (~20+ instances)

| File | Line(s) | Examples |
|------|---------|---------|
| `NewsletterForm/index.tsx` | 28 | `"Enter your email"` |
| `CalendarsSection.tsx` | 39-80 | `"Select date"`, `"Select time"` (6 instances) |
| `AdvancedInputsSection.tsx` | 75-98 | `"Enter number"`, `"Enter amount"` |
| `AdvancedDropdownsSection.tsx` | 87-160 | `"Select or type country"` (6 instances) |
| `SelectNative/DropdownPopup.tsx` | 58 | `"Search..."` |
| `ColorsSection.tsx` | 101 | `"#3b82f6"` |
| `TypographySection/index.tsx` | 70-88 | `"e.g., 150ms"` (4 instances) |
| `AnimationsEditor.tsx` | 89,103 | `"200ms"`, `"ease-out"` |
| `DimensionsEditor.tsx` | 32-59 | `"e.g., 280px"` (4 instances) |

### Hardcoded option labels

| File | Lines | Examples |
|------|-------|---------|
| `DataGridColumnRowEditor.tsx` | 35-46 | `"None"`, `"Uppercase"`, `"400 (Normal)"` |

## Solution

1. Add translation keys to the locale JSON files grouped logically:
   - `common.loading`, `common.dismiss`, `common.close`
   - `forms.placeholders.*`
   - `themeSettings.placeholders.*`
2. Replace each hardcoded string with `FM('...')` call
3. Verify all `FM()` keys exist in the locale files

## Benefits

- i18n-ready — the app can be localized without code changes
- Consistent with the existing pattern used by 95% of the codebase
- Accessibility improvement — screen readers in non-English locales get translated labels

## Linter Enforcement

Add an ESLint rule to flag hardcoded string literals in user-facing JSX attributes. Options:
- `eslint-plugin-i18next` has a `no-literal-string` rule configurable per JSX prop
- Custom rule `enforce-fm-for-user-strings` that flags string literals in `aria-label`, `placeholder`, `title` JSX attributes (excluding `testId`, `className`, `type`, `role`)
