# CUL-03: Store Actions & Schema v5

## Status: TODO
## Priority: High
## Depends on: CUL-01, CUL-02, CUL-04, CUL-05
## Agent: frontend-dev

## Objective

Create the Zustand store action for culture config updates, wire it into the store, and bump the schema version to v5. On hydration, apply the persisted culture settings.

## Implementation Plan

### 1. Create CultureActions Type
**File to modify**: `src/stores/theme/actions/types.ts`

Add the `CultureActions` interface:
```ts
import type { CultureConfig } from '../types/cultureTypes';

export interface CultureActions {
  updateCultureConfig: (updates: Partial<CultureConfig>) => void;
}
```

### 2. Create Culture Actions
**File to create**: `src/stores/theme/actions/cultureActions.ts`

Follow the pattern of `animationActions.ts`:
```ts
// createCultureActions(set, get) returning CultureActions
// Single action: updateCultureConfig(updates)
//   1. Merges updates into state.theme.culture
//   2. Calls injectThemeVariables() (existing helper)
//   3. Calls applySyncfusionCulture(mergedConfig) from src/config/syncfusionCulture
//   4. Calls setActiveCulture(mergedConfig) from src/localization/cultureResolver
```

### 3. Update Actions Barrel
**File to modify**: `src/stores/theme/actions/index.ts`
- Export `createCultureActions` from `./cultureActions`

### 4. Wire Into Store Actions
**File to modify**: `src/stores/theme/storeActions.ts`
- Import `createCultureActions`
- Spread `...createCultureActions(set, get)` into the returned actions object

### 5. Bump Schema Version & Wire Hydration
**File to modify**: `src/stores/useThemeStore.ts`
- Change `THEME_SCHEMA_VERSION` from `4` to `5`
  - This triggers stale data auto-discard on version mismatch (existing behavior)
- In `onRehydrateStorage` callback, add:
  - `applySyncfusionCulture(state.theme.culture)` — applies persisted culture on reload
  - `setActiveCulture(state.theme.culture)` — updates cultureResolver module state

## Files to Create

- `src/stores/theme/actions/cultureActions.ts`

## Files to Modify

- `src/stores/theme/actions/types.ts`
- `src/stores/theme/actions/index.ts`
- `src/stores/theme/storeActions.ts`
- `src/stores/useThemeStore.ts`

## Acceptance Criteria

- [ ] `createCultureActions` follows `animationActions.ts` pattern
- [ ] `updateCultureConfig` merges partial updates (not full replacement)
- [ ] Syncfusion culture and resolver are both called on update
- [ ] `THEME_SCHEMA_VERSION` is `5`
- [ ] Hydration applies persisted culture settings
- [ ] `npm run lint:fix` — no new errors
- [ ] `npx tsc --noEmit` — passes
- [ ] Existing tests pass (schema bump doesn't break anything)
