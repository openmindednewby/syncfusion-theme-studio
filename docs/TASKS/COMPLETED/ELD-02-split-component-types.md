# ELD-02: Split componentTypes.ts

## Status: COMPLETED
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Objective

Remove the `/* eslint-disable max-lines */` from `src/stores/theme/types/componentTypes.ts` (238 lines) by splitting the large interfaces into dedicated files.

## Current State

The file contains 10 large interfaces (`HeaderComponentConfig`, `SidebarComponentConfig`, `ButtonStateColors`, `ButtonsComponentConfig`, `InputsConfig`, `DataGridConfig`, `CardsConfig`, `ModalsConfig`, `BadgesConfig`, `ComponentConfigSingle`) plus re-exports from sibling type files.

The directory already uses a split pattern -- `feedbackComponentTypes.ts`, `navigationComponentTypes.ts`, `dataDisplayComponentTypes.ts` exist as separate files. `componentTypes.ts` is the remaining monolith that should follow the same pattern.

## Implementation Plan

### Step 1: Create `layoutComponentTypes.ts`
Move `HeaderComponentConfig` and `SidebarComponentConfig` here (~38 lines).

### Step 2: Create `formComponentTypes.ts`
Move `ButtonStateColors`, `ButtonsComponentConfig`, and `InputsConfig` here (~40 lines).

### Step 3: Create `dataComponentTypes.ts`
Move `DataGridConfig` here (~63 lines). This is the largest single interface.

### Step 4: Create `displayComponentTypes.ts`
Move `CardsConfig`, `ModalsConfig`, `BadgeVariant`, and `BadgesConfig` here (~48 lines).

### Step 5: Slim down `componentTypes.ts`
Keep only `ComponentConfigSingle`, `ComponentsConfig`, and the re-exports. Dropped from 238 to 76 lines.

### Step 6: Remove `eslint-disable`
Deleted line 1, lint passes.

## Changes Made

### New Files Created
- `src/stores/theme/types/layoutComponentTypes.ts` -- `HeaderComponentConfig`, `SidebarComponentConfig`
- `src/stores/theme/types/formComponentTypes.ts` -- `ButtonStateColors`, `ButtonsComponentConfig`, `InputsConfig`
- `src/stores/theme/types/dataComponentTypes.ts` -- `DataGridConfig`
- `src/stores/theme/types/displayComponentTypes.ts` -- `CardsConfig`, `ModalsConfig`, `BadgeVariant`, `BadgesConfig`

### Modified Files
- `src/stores/theme/types/componentTypes.ts` -- Removed all interface definitions, replaced with `import type` + `export type` re-exports. Removed `/* eslint-disable max-lines */`. File reduced from 238 to 76 lines.

### Unchanged Files
- `src/stores/theme/types/index.ts` -- No changes needed; it imports from `componentTypes.ts` which still re-exports everything.
- `src/stores/theme/types/themeTypes.ts` -- No changes needed; imports from `componentTypes.ts` still resolve.
- All 37 consumer files across the codebase -- No changes needed; all imports still resolve through the barrel re-exports.

## Verification

- [x] `eslint-disable max-lines` removed
- [x] All imports still resolve (barrel re-exports maintained)
- [x] `npx eslint src/stores/theme/types/` -- no errors
- [x] `npx vitest run` -- all tests pass (1 pre-existing failure in `cyberWatch.test.ts` unrelated to this change)
- [x] `npx vite build` -- build succeeds
