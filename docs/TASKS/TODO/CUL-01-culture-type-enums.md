# CUL-01: Culture Types & Enums

## Status: TODO
## Priority: High
## Depends on: None
## Agent: frontend-dev

## Objective

Create the foundational type system for the culture settings feature: 3 `const enum` files, 1 interface file, and updates to `themeTypes.ts` and the barrel export.

## Implementation Plan

### 1. Create CultureMode Enum
**File to create**: `src/stores/theme/types/cultureMode.ts`
```ts
export const enum CultureMode {
  Auto = 0,
  Manual = 1,
}
```

### 2. Create DateFormatPreset Enum
**File to create**: `src/stores/theme/types/dateFormatPreset.ts`
```ts
export const enum DateFormatPreset {
  Auto = 0,
  Short = 1,
  Medium = 2,
  Long = 3,
  Full = 4,
  ISO = 5,
  Custom = 6,
}
```

### 3. Create TimeFormatPreset Enum
**File to create**: `src/stores/theme/types/timeFormatPreset.ts`
```ts
export const enum TimeFormatPreset {
  Auto = 0,
  TwelveHour = 1,
  TwentyFourHour = 2,
}
```

### 4. Create CultureConfig Interface
**File to create**: `src/stores/theme/types/cultureTypes.ts`
```ts
import { CultureMode } from './cultureMode';
import { DateFormatPreset } from './dateFormatPreset';
import { TimeFormatPreset } from './timeFormatPreset';

export interface CultureConfig {
  mode: CultureMode;
  locale: string;              // BCP 47 tag (e.g. 'de', 'ja', 'ar')
  dateFormat: DateFormatPreset;
  customDateFormat: string;    // Syncfusion format string when dateFormat is Custom
  timeFormat: TimeFormatPreset;
  showSeconds: boolean;
  firstDayOfWeek: number | null;  // null = auto from locale
}
```

### 5. Update ThemeConfig & ThemeState
**File to modify**: `src/stores/theme/types/themeTypes.ts`
- Add `culture: CultureConfig` to the `ThemeConfig` interface
- Add `updateCultureConfig: (updates: Partial<CultureConfig>) => void` to the `ThemeState` interface

### 6. Update Barrel Export
**File to modify**: `src/stores/theme/types/index.ts`
- Export `CultureMode` from `./cultureMode`
- Export `DateFormatPreset` from `./dateFormatPreset`
- Export `TimeFormatPreset` from `./timeFormatPreset`
- Export `CultureConfig` from `./cultureTypes`

**IMPORTANT**: Check for a companion `types.ts` file alongside the `types/` directory (known barrel conflict pattern). If one exists, update it too.

## Files to Create

- `src/stores/theme/types/cultureMode.ts`
- `src/stores/theme/types/dateFormatPreset.ts`
- `src/stores/theme/types/timeFormatPreset.ts`
- `src/stores/theme/types/cultureTypes.ts`

## Files to Modify

- `src/stores/theme/types/themeTypes.ts`
- `src/stores/theme/types/index.ts`

## Acceptance Criteria

- [ ] Each enum is a `const enum` in its own file (per project convention)
- [ ] `CultureConfig` interface imports all 3 enums
- [ ] `ThemeConfig` has a `culture: CultureConfig` field
- [ ] `ThemeState` has `updateCultureConfig` action signature
- [ ] Barrel exports all 4 new types
- [ ] `npm run lint:fix` — no new errors
- [ ] `npx tsc --noEmit` — passes
