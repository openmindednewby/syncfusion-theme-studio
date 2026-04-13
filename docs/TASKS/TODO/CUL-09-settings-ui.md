# CUL-09: Settings UI — Culture Tab

## Status: TODO
## Priority: Medium
## Depends on: CUL-03, CUL-06, CUL-08
## Agent: frontend-dev

## Objective

Create the Culture tab in the Theme Settings drawer with 5 sub-editors and a live preview component. Users can configure culture mode, locale, date format, time format, and first day of week.

## Implementation Plan

### 1. Add TabId.Culture
**File to modify**: `src/components/layout/ThemeSettingsDrawer/tabId.ts`

Add `Culture` to the `TabId` enum:
```ts
export const enum TabId {
  // ... existing tabs
  Culture = 'culture',
}
```

### 2. Add Culture Tab Entry
**File to modify**: `src/components/layout/ThemeSettingsDrawer/DrawerTabs.tsx`

Add a Culture tab with a globe icon (check which icon library the project uses — likely a Syncfusion icon or a custom SVG). Place it logically near other settings tabs (after Animations or at the end).

### 3. Add Lazy-Loaded CultureSection
**File to modify**: `src/components/layout/ThemeSettingsDrawer/index.tsx`

Add a `lazy(() => import(...))` for the CultureSection, following the same pattern as other section lazy imports. Render it when `activeTab === TabId.Culture`.

### 4. Create CultureSection Directory
**Directory to create**: `src/components/layout/ThemeSettingsDrawer/sections/CultureSection/`

#### `index.tsx` — Section Container
- Section header with globe icon and title from `t('themeSettings.culture.sectionTitle')`
- Description from `t('themeSettings.culture.sectionDescription')`
- Renders 5 sub-editors + CulturePreview
- Uses `useThemeStore` to get current `theme.culture` and `updateCultureConfig` action

#### `CultureModeEditor.tsx` — Auto/Manual Toggle
- Two-option toggle/radio: Auto (Browser) / Manual
- When Manual is selected, show the locale dropdown below
- When Auto is selected, hide the locale dropdown
- Test IDs: `CULTURE_MODE_EDITOR`, `CULTURE_MODE_AUTO`, `CULTURE_MODE_MANUAL`

#### `DateFormatEditor.tsx` — Date Format Selector
- Dropdown with options: Auto, Short, Medium, Long, Full, ISO, Custom
- When Custom is selected, show a text input for the Syncfusion format string
- Each option shows an example formatted date in parentheses (e.g., "Medium (Feb 13, 2026)")
- Test IDs: `CULTURE_DATE_FORMAT_SELECT`, `CULTURE_CUSTOM_DATE_INPUT`

#### `TimeFormatEditor.tsx` — Time Format Selector
- Three-option dropdown: Auto, 12-hour, 24-hour
- Checkbox for "Show Seconds"
- Each option shows an example formatted time
- Test IDs: `CULTURE_TIME_FORMAT_SELECT`, `CULTURE_SHOW_SECONDS_TOGGLE`

#### `FirstDayOfWeekEditor.tsx` — First Day of Week
- Dropdown: Auto (from locale), Sunday, Monday, Saturday
- Auto option resolves from the active locale
- Test ID: `CULTURE_FIRST_DAY_SELECT`

#### `CulturePreview.tsx` — Live Preview
- Shows current date/time formatted with the active culture settings
- Three rows: Date, Time, Date & Time
- Updates in real-time as settings change
- Uses `FD()` for the Intl-based preview and `useCultureFormat()` for the Syncfusion format string preview
- Test IDs: `CULTURE_PREVIEW`, `CULTURE_PREVIEW_DATE`, `CULTURE_PREVIEW_TIME`, `CULTURE_PREVIEW_DATETIME`

### Locale Dropdown Details

When Manual mode is active, show a dropdown populated from `SUPPORTED_CULTURES` (from `src/config/syncfusionCulture.ts`).

Use `Intl.DisplayNames` to show human-readable locale names:
```ts
const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });
// displayNames.of('de') => 'German'
```

Display format: "German (de)" rather than just "de".

### Component Patterns to Follow

Check existing settings sections (e.g., `AnimationsSection`, `ColorsSection`) for:
- How they import/use the store
- Section header style (icon + title + description)
- Editor layout (label + control)
- Spacing and responsiveness

### File Size Constraints

- Each sub-editor should be under 200 lines (component limit)
- `index.tsx` container should be under 200 lines
- If `CulturePreview` gets complex, extract helper functions

## Files to Create

- `src/components/layout/ThemeSettingsDrawer/sections/CultureSection/index.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/CultureSection/CultureModeEditor.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/CultureSection/DateFormatEditor.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/CultureSection/TimeFormatEditor.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/CultureSection/FirstDayOfWeekEditor.tsx`
- `src/components/layout/ThemeSettingsDrawer/sections/CultureSection/CulturePreview.tsx`

## Files to Modify

- `src/components/layout/ThemeSettingsDrawer/tabId.ts`
- `src/components/layout/ThemeSettingsDrawer/DrawerTabs.tsx`
- `src/components/layout/ThemeSettingsDrawer/index.tsx`

## Acceptance Criteria

- [ ] Culture tab appears in the drawer tab list with globe icon
- [ ] Clicking Culture tab shows the CultureSection
- [ ] CultureSection is lazy-loaded (not in initial bundle)
- [ ] Auto/Manual toggle works and conditionally shows locale dropdown
- [ ] Locale dropdown shows human-readable names via `Intl.DisplayNames`
- [ ] Date format dropdown shows example dates for each option
- [ ] Custom format input appears only when Custom preset is selected
- [ ] Time format selector with showSeconds checkbox works
- [ ] First day of week dropdown works
- [ ] Live preview updates in real-time as settings change
- [ ] All interactive elements have testID + accessibilityLabel + accessibilityHint
- [ ] All text uses `t()` i18n function
- [ ] Components are under 200 lines each
- [ ] `npm run lint:fix` — no new errors
- [ ] `npx tsc --noEmit` — passes
