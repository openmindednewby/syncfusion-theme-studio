# ELD-02: Split componentTypes.ts

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Objective

Remove the `/* eslint-disable max-lines */` from `src/stores/theme/types/componentTypes.ts` (238 lines) by splitting the large interfaces into dedicated files.

## Current State

The file contains 10 large interfaces (`HeaderComponentConfig`, `SidebarComponentConfig`, `ButtonStateColors`, `ButtonsComponentConfig`, `InputsConfig`, `DataGridConfig`, `CardsConfig`, `ModalsConfig`, `BadgesConfig`, `ComponentConfigSingle`) plus re-exports from sibling type files.

The directory already uses a split pattern — `feedbackComponentTypes.ts`, `navigationComponentTypes.ts`, `dataDisplayComponentTypes.ts` exist as separate files. `componentTypes.ts` is the remaining monolith that should follow the same pattern.

## Implementation Plan

### Step 1: Create `layoutComponentTypes.ts`
Move `HeaderComponentConfig` and `SidebarComponentConfig` here (~46 lines).

### Step 2: Create `formComponentTypes.ts`
Move `ButtonStateColors`, `ButtonsComponentConfig`, and `InputsConfig` here (~36 lines).

### Step 3: Create `dataComponentTypes.ts`
Move `DataGridConfig` here (~62 lines). This is the largest single interface.

### Step 4: Create `displayComponentTypes.ts`
Move `CardsConfig`, `ModalsConfig`, and `BadgesConfig` here (~48 lines).

### Step 5: Slim down `componentTypes.ts`
Keep only `ComponentConfigSingle`, `ComponentsConfig`, and the re-exports. Should drop well under 200 lines.

### Step 6: Remove `eslint-disable`
Delete line 1, verify lint passes.

## Verification

- [ ] `eslint-disable max-lines` removed
- [ ] All imports still resolve (update barrel exports)
- [ ] `npm run lint:fix` — no errors
- [ ] `npm run test:coverage` — all tests pass
- [ ] `npx vite build` — build succeeds
