# CUL-10: Unit Tests

## Status: TODO
## Priority: Medium
## Depends on: CUL-03, CUL-04, CUL-06, CUL-07, CUL-09
## Agent: frontend-dev

## Objective

Write unit tests for all new modules: `cultureResolver`, `cultureActions`, `useCultureFormat`, and the updated `FD()` helper. Tests focus on **logic**, not rendering (per project testing philosophy).

## Implementation Plan

### 1. cultureResolver Tests
**File to create**: `src/localization/__tests__/cultureResolver.test.ts`

Test cases:
- `setActiveCulture` updates internal state
- `getActiveLocale()` returns `navigator.language` when mode is Auto
- `getActiveLocale()` returns `config.locale` when mode is Manual
- `getActiveLocale()` falls back to `'en-US'` when `navigator.language` is undefined
- `getDateFormatOptions()` returns correct Intl options for each `DateFormatPreset`
- `getDateFormatOptions()` merges caller overrides (caller wins)
- `getSyncfusionDateFormat()` returns correct format string for each preset + locale combination
- `getSyncfusionTimeFormat()` returns 12h format for `TwelveHour`
- `getSyncfusionTimeFormat()` returns 24h format for `TwentyFourHour`
- `getSyncfusionTimeFormat()` appends `:ss` when `showSeconds` is true
- `getSyncfusionDateFormat()` returns `customDateFormat` when preset is `Custom`

### 2. cultureActions Tests
**File to create**: `src/stores/theme/actions/__tests__/cultureActions.test.ts`

Test cases:
- `updateCultureConfig` merges partial updates into existing config
- `updateCultureConfig` calls `applySyncfusionCulture` with merged config
- `updateCultureConfig` calls `setActiveCulture` with merged config
- `updateCultureConfig` with `mode: Manual` + `locale: 'de'` sets both fields
- Partial update preserves other fields (e.g., updating only `dateFormat` doesn't change `locale`)

Mock `applySyncfusionCulture` and `setActiveCulture` as they have side effects.

### 3. useCultureFormat Hook Tests
**File to create**: `src/components/ui/syncfusion/hooks/__tests__/useCultureFormat.test.ts`

Test cases:
- Returns default format strings when culture is `DEFAULT_CULTURE`
- Returns German date format when locale is `'de'` + Manual mode
- `dateTimeFormat` is the concatenation of `dateFormat` + `timeFormat`
- `firstDayOfWeek` resolves from locale when config value is `null`
- `firstDayOfWeek` uses config value when explicitly set
- Memoization: same culture reference returns same result object

Use `renderHook` from `@testing-library/react` for hook testing.

### 4. FD() Helper Tests
**File to create/modify**: `src/localization/__tests__/helpers.test.ts`

If this test file already exists, add new test cases. Otherwise create it.

Test cases:
- `FD()` uses active culture locale (not `i18n.language`)
- `FD()` with Auto mode uses browser locale
- `FD()` with Manual mode + `'de'` locale formats dates in German
- `FD()` with caller-provided options overrides culture defaults
- `FD()` without options uses culture date format defaults
- `FD()` with ISO preset formats as ISO 8601 string

### 5. applySyncfusionCulture Tests
**File to create**: `src/config/__tests__/syncfusionCulture.test.ts`

Test cases:
- `en-US` culture calls `setCulture('en')` without loading CLDR
- Non-en-US culture dynamically imports CLDR module and calls `loadCldr`
- Deduplication: second call for same culture doesn't re-import
- `setCulture` is called with the resolved locale tag

Mock `@syncfusion/ej2-base` (`loadCldr`, `setCulture`) and dynamic imports.

### Testing Philosophy Reminders

- **Test logic, not rendering**: Focus on format string output, locale resolution, state merging
- **Mock side effects**: `setCulture`, `loadCldr`, `navigator.language`
- **Test file extension**: Use `.test.ts` for pure logic, `.test.tsx` only if using JSX (e.g., `renderHook`)
- **No snapshot tests**: Test specific values and behavior

## Files to Create

- `src/localization/__tests__/cultureResolver.test.ts`
- `src/stores/theme/actions/__tests__/cultureActions.test.ts`
- `src/components/ui/syncfusion/hooks/__tests__/useCultureFormat.test.ts` (or `.test.tsx` if using renderHook)
- `src/config/__tests__/syncfusionCulture.test.ts`

## Files to Modify

- `src/localization/__tests__/helpers.test.ts` (add FD() culture tests, or create if not exists)

## Acceptance Criteria

- [ ] All test files created with comprehensive test cases
- [ ] cultureResolver: 11+ test cases covering all functions
- [ ] cultureActions: 5+ test cases for merging and side effect calls
- [ ] useCultureFormat: 6+ test cases for format resolution and memoization
- [ ] FD(): 6+ test cases for locale resolution and option merging
- [ ] applySyncfusionCulture: 4+ test cases for CLDR loading and deduplication
- [ ] All side effects properly mocked
- [ ] `npm run test:coverage` — all tests pass
- [ ] Test coverage for new modules is adequate
- [ ] No snapshot tests used
