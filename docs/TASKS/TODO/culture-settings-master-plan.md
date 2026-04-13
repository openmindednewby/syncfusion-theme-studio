# Culture Settings — Master Plan

> **Project**: SyncfusionThemeStudio
> **Status**: TODO
> **Priority**: Medium
> **Created**: 2026-02-13

---

## Overview

Add a configurable date/time culture system to the theme engine. Users can switch between Auto (browser locale) and Manual mode, selecting a specific BCP 47 locale, date format preset, time format, and first day of week. The culture config lives inside `ThemeConfig` alongside existing settings (colors, animations, etc.), persists via Zustand, and drives both Syncfusion globalization (`setCulture()` + CLDR data) and the `FD()` formatting helper.

### Goals

- **Configurable**: Users choose locale, date/time format, first day of week from a Settings UI tab
- **Integrated**: Culture config stored in `ThemeConfig`, exported/imported with presets
- **Performant**: CLDR data lazy-loaded per culture (no impact on initial bundle for `en-US`)
- **Decoupled**: A `cultureResolver` module breaks circular dependencies between store and localization
- **Consistent**: All date/time displays (Syncfusion components, native elements, `FD()` calls) respect the active culture

---

## Architecture

### Data Flow

```
ThemeSettingsDrawer (Culture tab)
  |
  v
updateCultureConfig(partial)         <-- Zustand action
  |
  ├── merges into theme.culture
  ├── injectThemeVariables()         <-- existing CSS variable injection
  ├── applySyncfusionCulture(config) <-- lazy CLDR load + setCulture()
  └── setActiveCulture(config)       <-- updates cultureResolver module state
        |
        ├── FD() reads getActiveLocale() + getDateFormatOptions()
        └── useCultureFormat() reads getSyncfusionDateFormat/TimeFormat
              |
              v
        DatePicker, TimePicker, DataGrid, etc.
```

### New Types

| File | Content |
|------|---------|
| `src/stores/theme/types/cultureMode.ts` | `const enum CultureMode { Auto, Manual }` |
| `src/stores/theme/types/dateFormatPreset.ts` | `const enum DateFormatPreset { Auto, Short, Medium, Long, Full, ISO, Custom }` |
| `src/stores/theme/types/timeFormatPreset.ts` | `const enum TimeFormatPreset { Auto, TwelveHour, TwentyFourHour }` |
| `src/stores/theme/types/cultureTypes.ts` | `CultureConfig` interface |

```ts
interface CultureConfig {
  mode: CultureMode
  locale: string              // BCP 47 tag (e.g. 'de', 'ja', 'ar')
  dateFormat: DateFormatPreset
  customDateFormat: string    // Syncfusion format string when Custom
  timeFormat: TimeFormatPreset
  showSeconds: boolean
  firstDayOfWeek: number | null  // null = auto from locale
}
```

### New Modules

| File | Purpose |
|------|---------|
| `src/stores/theme/defaults/defaultCulture.ts` | `DEFAULT_CULTURE` constant |
| `src/stores/theme/actions/cultureActions.ts` | `createCultureActions(set, get)` |
| `src/localization/cultureResolver.ts` | Decoupled culture state for `FD()` and hooks |
| `src/config/syncfusionCulture.ts` | Lazy CLDR loading + `setCulture()` |
| `src/config/cldr/*.ts` | Per-culture CLDR JSON (8 files) |
| `src/components/ui/syncfusion/hooks/useCultureFormat.ts` | Syncfusion format strings from culture config |
| `src/components/layout/ThemeSettingsDrawer/sections/CultureSection/` | Settings UI (6 files) |

---

## Task Breakdown

| # | Task | Description | Agent |
|---|------|-------------|-------|
| CUL-01 | [Types & Enums](./CUL-01-culture-type-enums.md) | Create 3 enum files + CultureConfig interface + update themeTypes + barrel | `frontend-dev` |
| CUL-02 | [Default Culture Presets](./CUL-02-default-culture-presets.md) | DEFAULT_CULTURE constant + update all 18 presets | `frontend-dev` |
| CUL-03 | [Store Actions & Schema](./CUL-03-store-actions-schema.md) | cultureActions + action types + storeActions spread + schema v5 | `frontend-dev` |
| CUL-04 | [Culture Resolver](./CUL-04-culture-resolver.md) | Decoupled module: setActiveCulture, getActiveLocale, format mappers | `frontend-dev` |
| CUL-05 | [Syncfusion CLDR](./CUL-05-syncfusion-cldr.md) | Lazy CLDR loading + setCulture() + cldr/ directory | `frontend-dev` |
| CUL-06 | [FD() & useCultureFormat](./CUL-06-fd-helper-culture-hook.md) | Update FD() helper + create useCultureFormat hook | `frontend-dev` |
| CUL-07 | [Component Wrappers](./CUL-07-component-wrappers.md) | DatePicker, OrderSection, showcase section updates | `frontend-dev` |
| CUL-08 | [i18n & Test IDs](./CUL-08-i18n-test-ids.md) | Localization strings + testIds.ts entries | `frontend-dev` |
| CUL-09 | [Settings UI](./CUL-09-settings-ui.md) | Culture tab + 5 sub-editors + live preview | `frontend-dev` |
| CUL-10 | [Unit Tests](./CUL-10-unit-tests.md) | Tests for cultureResolver, cultureActions, useCultureFormat, FD() | `frontend-dev` |
| CUL-11 | [Quality Gate](./CUL-11-quality-gate.md) | Lint + YAGNI + test verification | `quality-gate` |
| CUL-12 | [Code Review](./CUL-12-code-review.md) | Standards compliance review | `code-reviewer` |
| CUL-13 | [E2E Tests](./CUL-13-e2e-tests.md) | Playwright E2E test specs for culture settings | `regression-tester` |
| CUL-14 | [Visual QA](./CUL-14-visual-qa.md) | Chrome extension visual QA | `visual-qa` |

---

## Dependency Graph

```
CUL-01 (types & enums)
    |
    v
CUL-02, CUL-04, CUL-05, CUL-08 (parallel — defaults+presets, resolver, CLDR, i18n+testIds)
    |
    v
CUL-03, CUL-06 (parallel — store actions, FD+hook)
    |
    v
CUL-07, CUL-09 (parallel — component updates, settings UI)
    |
    v
CUL-10 (unit tests)
    |
    v
CUL-11, CUL-12 (parallel — quality-gate, code-reviewer)
    |
    v
CUL-13 (E2E tests)
    |
    v
CUL-14 (visual QA)
```

---

## Agent Orchestration Strategy

### Wave 1 — Types (1 agent)
```
frontend-dev: CUL-01 (types & enums)
```

### Wave 2 — Foundation (4 parallel agents)
```
frontend-dev (A): CUL-02 (defaults + presets)
frontend-dev (B): CUL-04 (culture resolver)
frontend-dev (C): CUL-05 (Syncfusion CLDR)
frontend-dev (D): CUL-08 (i18n + test IDs)
```

### Wave 3 — Store & Formatting (2 parallel agents)
```
frontend-dev (A): CUL-03 (store actions + schema v5)
frontend-dev (B): CUL-06 (FD() update + useCultureFormat hook)
```

### Wave 4 — Components & UI (2 parallel agents)
```
frontend-dev (A): CUL-07 (component wrapper updates)
frontend-dev (B): CUL-09 (settings UI — Culture tab + 5 editors)
```

### Wave 5 — Unit Tests (1 agent)
```
frontend-dev: CUL-10 (unit tests for all new modules)
```

### Wave 6 — Verification (2 parallel agents)
```
quality-gate: CUL-11 (lint + YAGNI + tests + build)
code-reviewer: CUL-12 (standards compliance review)
```

### Wave 7 — E2E Tests (1 agent)
```
regression-tester: CUL-13 (Playwright E2E test specs)
```

### Wave 8 — Visual QA (1 agent)
```
visual-qa: CUL-14 (Chrome extension visual QA)
```

---

## New Dependencies

| Package | Purpose | Dev only? |
|---------|---------|-----------|
| `cldr-data` | CLDR JSON source for Syncfusion globalization | Yes (data vendored into `src/config/cldr/` files) |

No new runtime dependencies. CLDR data is vendored as static JSON in per-culture files for tree-shaking.

---

## File Change Summary

| Action | File | Task |
|--------|------|------|
| **Create** | `src/stores/theme/types/cultureMode.ts` | CUL-01 |
| **Create** | `src/stores/theme/types/dateFormatPreset.ts` | CUL-01 |
| **Create** | `src/stores/theme/types/timeFormatPreset.ts` | CUL-01 |
| **Create** | `src/stores/theme/types/cultureTypes.ts` | CUL-01 |
| **Modify** | `src/stores/theme/types/themeTypes.ts` | CUL-01 |
| **Modify** | `src/stores/theme/types/index.ts` | CUL-01 |
| **Create** | `src/stores/theme/defaults/defaultCulture.ts` | CUL-02 |
| **Modify** | `src/stores/theme/defaults/index.ts` | CUL-02 |
| **Modify** | 18 preset files in `src/stores/theme/presets/` | CUL-02 |
| **Create** | `src/stores/theme/actions/cultureActions.ts` | CUL-03 |
| **Modify** | `src/stores/theme/actions/types.ts` | CUL-03 |
| **Modify** | `src/stores/theme/actions/index.ts` | CUL-03 |
| **Modify** | `src/stores/theme/storeActions.ts` | CUL-03 |
| **Modify** | `src/stores/useThemeStore.ts` | CUL-03 |
| **Create** | `src/localization/cultureResolver.ts` | CUL-04 |
| **Create** | `src/config/syncfusionCulture.ts` | CUL-05 |
| **Create** | `src/config/cldr/` (8 files) | CUL-05 |
| **Modify** | `src/localization/helpers.ts` | CUL-06 |
| **Create** | `src/components/ui/syncfusion/hooks/useCultureFormat.ts` | CUL-06 |
| **Modify** | `src/components/ui/syncfusion/DatePicker/index.tsx` | CUL-07 |
| **Modify** | `src/features/forms/pages/NativeFormsPage/sections/OrderSection/index.tsx` | CUL-07 |
| **Modify** | `src/localization/locales/en.json` | CUL-08 |
| **Modify** | `src/shared/testIds.ts` | CUL-08 |
| **Modify** | `src/components/layout/ThemeSettingsDrawer/tabId.ts` | CUL-09 |
| **Modify** | `src/components/layout/ThemeSettingsDrawer/DrawerTabs.tsx` | CUL-09 |
| **Modify** | `src/components/layout/ThemeSettingsDrawer/index.tsx` | CUL-09 |
| **Create** | `src/components/layout/ThemeSettingsDrawer/sections/CultureSection/` (6 files) | CUL-09 |

---

## Success Criteria

- [ ] All 14 task documents created in `docs/TASKS/TODO/`
- [ ] `docs/TASKS/README.md` updated with Culture Settings section
- [ ] Each task has: Status, Priority, Dependencies, Agent, Objective, Implementation Plan, Files, Acceptance Criteria
- [ ] Dependency graph is consistent across master plan and sub-tasks
- [ ] Agent assignments match the orchestration strategy

### Post-Implementation Verification (for when tasks are executed)

- [ ] `npm run lint:fix` — no errors
- [ ] `npm run test:coverage` — all tests pass (including new culture tests)
- [ ] `npx expo export --platform web` — build succeeds
- [ ] Culture tab visible in Theme Settings drawer
- [ ] Auto mode: dates display using browser locale format
- [ ] Manual mode + "de": Syncfusion shows German month/day names, FD() shows German format
- [ ] Date format presets (Short/Medium/Long/Full/ISO) update preview + all dates in real-time
- [ ] Time format (12h/24h) updates time displays
- [ ] SIEM grid retains ISO dates (per-component override)
- [ ] CLDR data only loads when a new culture is selected (not on initial load for en-US)
- [ ] `npx playwright test` — E2E tests pass
