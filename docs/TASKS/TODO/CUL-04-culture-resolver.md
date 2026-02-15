# CUL-04: Culture Resolver Module

## Status: TODO
## Priority: High
## Depends on: CUL-01
## Agent: frontend-dev

## Objective

Create a decoupled culture resolver module that breaks the circular dependency between the Zustand store and the localization layer. This module holds the "active culture" state as a plain module-level variable and exposes pure functions for resolving locale, date format options, and Syncfusion format strings.

## Implementation Plan

### 1. Create Culture Resolver
**File to create**: `src/localization/cultureResolver.ts`

```ts
// Module-level state
let activeCulture: CultureConfig = DEFAULT_CULTURE;

// Called by store actions when culture config changes
export function setActiveCulture(config: CultureConfig): void;

// Returns resolved locale string
// - Auto mode: navigator.language ?? 'en-US'
// - Manual mode: config.locale
export function getActiveLocale(): string;

// Maps DateFormatPreset + TimeFormatPreset to Intl.DateTimeFormatOptions
// Accepts optional overrides that take precedence
export function getDateFormatOptions(
  overrides?: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormatOptions;

// Maps DateFormatPreset to Syncfusion date format string
// Examples: 'MM/dd/yyyy' (Short), 'MMM dd, yyyy' (Medium), 'yyyy-MM-dd' (ISO)
// Custom preset returns config.customDateFormat
// Auto preset returns locale-appropriate default
export function getSyncfusionDateFormat(config: CultureConfig): string;

// Maps TimeFormatPreset to Syncfusion time format string
// Examples: 'hh:mm a' (12h), 'HH:mm' (24h)
// Includes seconds suffix when showSeconds is true
export function getSyncfusionTimeFormat(config: CultureConfig): string;
```

### Format Mapping Reference

**DateFormatPreset to Intl options:**
| Preset | `dateStyle` | Notes |
|--------|-------------|-------|
| Auto | Uses locale default | Let `Intl` decide |
| Short | `'short'` | e.g. "2/13/26" |
| Medium | `'medium'` | e.g. "Feb 13, 2026" |
| Long | `'long'` | e.g. "February 13, 2026" |
| Full | `'full'` | e.g. "Friday, February 13, 2026" |
| ISO | N/A | Use manual `toISOString().slice(0,10)` |
| Custom | N/A | Use Syncfusion format directly |

**DateFormatPreset to Syncfusion format strings:**
| Preset | en-US | de | ja |
|--------|-------|----|----|
| Auto | `'MM/dd/yyyy'` | `'dd.MM.yyyy'` | `'yyyy/MM/dd'` |
| Short | `'M/d/yy'` | `'d.M.yy'` | `'yy/M/d'` |
| Medium | `'MMM dd, yyyy'` | `'dd. MMM yyyy'` | `'yyyy年M月d日'` |
| Long | `'MMMM dd, yyyy'` | `'dd. MMMM yyyy'` | `'yyyy年M月d日'` |
| Full | `'dddd, MMMM dd, yyyy'` | `'dddd, dd. MMMM yyyy'` | `'yyyy年M月d日 dddd'` |
| ISO | `'yyyy-MM-dd'` | `'yyyy-MM-dd'` | `'yyyy-MM-dd'` |

**TimeFormatPreset to Syncfusion format strings:**
| Preset | Without seconds | With seconds |
|--------|----------------|--------------|
| Auto | Locale-dependent | Locale-dependent |
| TwelveHour | `'hh:mm a'` | `'hh:mm:ss a'` |
| TwentyFourHour | `'HH:mm'` | `'HH:mm:ss'` |

### Design Decisions

- **Module-level state** (not React context) because `FD()` needs access outside of React components
- **No store import** — avoids circular dependency (store → cultureResolver → store)
- **Store calls `setActiveCulture`** on config changes and hydration
- **Pure functions** for format resolution — easy to test

## Files to Create

- `src/localization/cultureResolver.ts`

## Files to Modify

- None (consumers are updated in CUL-03 and CUL-06)

## Acceptance Criteria

- [ ] `setActiveCulture` updates module-level state
- [ ] `getActiveLocale()` returns `navigator.language` in Auto mode, `config.locale` in Manual
- [ ] `getDateFormatOptions()` correctly maps all 7 presets to Intl options
- [ ] `getSyncfusionDateFormat()` returns correct format strings per locale
- [ ] `getSyncfusionTimeFormat()` respects `showSeconds` flag
- [ ] No imports from the Zustand store (decoupled)
- [ ] All functions are pure (except `setActiveCulture` which is a setter)
- [ ] `npm run lint:fix` — no new errors
- [ ] `npx tsc --noEmit` — passes
