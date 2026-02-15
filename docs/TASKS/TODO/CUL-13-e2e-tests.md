# CUL-13: E2E Tests — Playwright

## Status: TODO
## Priority: Medium
## Depends on: CUL-11, CUL-12
## Agent: regression-tester

## Objective

Write Playwright E2E tests that verify the Culture settings feature works end-to-end in the browser, including tab navigation, settings changes, and visual updates.

## Test Scope

### Test File
**File to create**: `E2ETests/tests/culture-settings.spec.ts`

Or, if the project groups tests by feature:
**File to create**: `E2ETests/tests/theme-settings/culture-settings.spec.ts`

Check existing test file organization in `E2ETests/tests/` before deciding.

### Page Object (if needed)
**File to create**: `E2ETests/pages/CultureSettingsPage.ts`

Encapsulate Culture tab interactions:
- `openCultureTab()` — click Culture tab in the drawer
- `setCultureMode(mode: 'auto' | 'manual')` — toggle culture mode
- `selectLocale(tag: string)` — select locale from dropdown
- `selectDateFormat(preset: string)` — select date format preset
- `setCustomDateFormat(format: string)` — type custom format
- `selectTimeFormat(preset: string)` — select time format
- `toggleShowSeconds()` — toggle seconds checkbox
- `selectFirstDayOfWeek(day: string)` — select first day
- `getPreviewDate()` — read date preview text
- `getPreviewTime()` — read time preview text
- `getPreviewDateTime()` — read date+time preview text

### Test IDs to Use

All selectors should use the test IDs defined in CUL-08:
- `THEME_TAB_CULTURE`
- `CULTURE_MODE_EDITOR`, `CULTURE_MODE_AUTO`, `CULTURE_MODE_MANUAL`
- `CULTURE_LOCALE_SELECT`
- `CULTURE_DATE_FORMAT_SELECT`, `CULTURE_CUSTOM_DATE_INPUT`
- `CULTURE_TIME_FORMAT_SELECT`, `CULTURE_SHOW_SECONDS_TOGGLE`
- `CULTURE_FIRST_DAY_SELECT`
- `CULTURE_PREVIEW`, `CULTURE_PREVIEW_DATE`, `CULTURE_PREVIEW_TIME`, `CULTURE_PREVIEW_DATETIME`

## Test Cases

### 1. Culture Tab Navigation
```
test('Culture tab is visible and clickable')
- Open Theme Settings drawer
- Verify Culture tab exists
- Click Culture tab
- Verify Culture section is displayed
```

### 2. Default State
```
test('Culture section shows default settings')
- Open Culture tab
- Verify mode is Auto
- Verify locale dropdown is hidden (Auto mode)
- Verify date format is Auto
- Verify time format is Auto
- Verify showSeconds is unchecked
- Verify first day of week is Auto
- Verify preview shows formatted date/time
```

### 3. Switch to Manual Mode
```
test('Switching to Manual mode shows locale dropdown')
- Open Culture tab
- Click Manual mode
- Verify locale dropdown appears
- Select 'de' (German)
- Verify preview updates to German format
```

### 4. Date Format Presets
```
test('Date format presets update preview')
- Open Culture tab, set Manual + 'en-US'
- Select Short format → verify preview shows short date
- Select Medium format → verify preview shows medium date
- Select Long format → verify preview shows long date
- Select ISO format → verify preview shows YYYY-MM-DD
```

### 5. Custom Date Format
```
test('Custom date format shows input and updates preview')
- Open Culture tab
- Select Custom date format
- Verify custom format input appears
- Type 'dd-MMM-yyyy'
- Verify preview updates
```

### 6. Time Format
```
test('Time format options update preview')
- Open Culture tab
- Select 12-hour → verify preview shows AM/PM
- Select 24-hour → verify preview shows 24h format
- Toggle showSeconds → verify seconds appear in preview
```

### 7. First Day of Week
```
test('First day of week setting works')
- Open Culture tab
- Select Monday
- Navigate to a DatePicker on the page
- Verify calendar starts on Monday
```

### 8. Persistence
```
test('Culture settings persist across page reload')
- Set Manual mode + 'de' locale + Long date format
- Reload the page
- Open Culture tab
- Verify settings are preserved
```

### 9. Syncfusion Integration
```
test('Syncfusion components respect culture settings')
- Set Manual mode + 'de' locale
- Navigate to a page with a DatePicker
- Open the DatePicker calendar
- Verify month/day names are in German
```

### 10. Regression — Existing Dates
```
test('SIEM grid retains ISO format regardless of culture')
- Set Manual mode + 'de' locale + Long date format
- Navigate to the Syncfusion Grid Showcase
- Verify SIEM alert timestamps still show ISO format
```

## Notes

- Use `test.describe('Culture Settings')` to group all tests
- Use `test.beforeEach` to navigate to the app and open the drawer
- Tests should be independent (each test sets its own state)
- Avoid flaky selectors — use test IDs exclusively
- Check existing E2E test patterns in `E2ETests/tests/` for conventions

## Files to Create

- `E2ETests/tests/culture-settings.spec.ts` (or appropriate subdirectory)
- `E2ETests/pages/CultureSettingsPage.ts` (if page object pattern is used)

## Acceptance Criteria

- [ ] 10+ E2E test cases covering all culture settings features
- [ ] Page object created (if project uses page object pattern)
- [ ] All selectors use test IDs (no CSS selectors or text-based selectors)
- [ ] Tests are independent and don't depend on execution order
- [ ] `npx playwright test tests/culture-settings.spec.ts` — all pass
- [ ] No flaky tests (run 3x to verify stability)
