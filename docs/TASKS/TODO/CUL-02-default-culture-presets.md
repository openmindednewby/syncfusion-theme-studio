# CUL-02: Default Culture & Preset Updates

## Status: TODO
## Priority: High
## Depends on: CUL-01
## Agent: frontend-dev

## Objective

Create the `DEFAULT_CULTURE` constant and add `culture: DEFAULT_CULTURE` to all 18 theme presets so every preset includes valid culture configuration.

## Implementation Plan

### 1. Create Default Culture Constant
**File to create**: `src/stores/theme/defaults/defaultCulture.ts`

Follow the pattern of `defaultAnimations.ts`:
```ts
import { CultureMode } from '../types/cultureMode';
import { DateFormatPreset } from '../types/dateFormatPreset';
import { TimeFormatPreset } from '../types/timeFormatPreset';
import type { CultureConfig } from '../types/cultureTypes';

export const DEFAULT_CULTURE: CultureConfig = {
  mode: CultureMode.Auto,
  locale: 'en-US',
  dateFormat: DateFormatPreset.Auto,
  customDateFormat: '',
  timeFormat: TimeFormatPreset.Auto,
  showSeconds: false,
  firstDayOfWeek: null,
};
```

### 2. Update Defaults Barrel
**File to modify**: `src/stores/theme/defaults/index.ts`
- Add `export { DEFAULT_CULTURE } from './defaultCulture';`

### 3. Update All 18 Presets
**Files to modify** (all in `src/stores/theme/presets/`):
1. `fremen.ts`
2. `oceanBlue.ts`
3. `forestGreen.ts`
4. `royalPurple.ts`
5. `sunsetOrange.ts`
6. `rosePink.ts`
7. `midnight.ts`
8. `arctic.ts`
9. `copper.ts`
10. `emerald.ts`
11. `lavender.ts`
12. `slate.ts`
13. `gold.ts`
14. `oceanus.ts`
15. `voyager.ts`
16. `cyberWatch.ts`

Plus any additional presets that may exist. Check the directory for the complete list.

For each preset:
- Import `DEFAULT_CULTURE` from `../defaults`
- Add `culture: DEFAULT_CULTURE` to the `ThemeConfig` object

**Note**: `defaultTheme.ts` spreads `FREMEN_THEME`, so it inherits `culture` automatically once `fremen.ts` is updated.

## Files to Create

- `src/stores/theme/defaults/defaultCulture.ts`

## Files to Modify

- `src/stores/theme/defaults/index.ts`
- 18 preset files in `src/stores/theme/presets/`

## Acceptance Criteria

- [ ] `DEFAULT_CULTURE` follows `defaultAnimations.ts` pattern (named export, typed)
- [ ] All 18 presets include `culture: DEFAULT_CULTURE`
- [ ] Default theme inherits culture from its base preset
- [ ] `npm run lint:fix` — no new errors
- [ ] `npx tsc --noEmit` — passes
