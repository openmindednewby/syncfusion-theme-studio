# ELD-01: Decompose DataGrid/index.tsx

## Status: TODO
## Priority: Critical
## Depends on: None
## Agent: frontend-dev

## Objective

Refactor `src/components/ui/syncfusion/DataGrid/index.tsx` (1010 lines, 45KB) to comply with project ESLint rules. Currently disables **10 rules** via a file-level `eslint-disable`:

```
max-lines, smart-max-lines/smart-max-lines, max-params, no-restricted-syntax,
@typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unnecessary-type-assertion,
@typescript-eslint/strict-boolean-expressions, no-magic-numbers, curly,
@typescript-eslint/array-type, @typescript-eslint/no-unnecessary-condition
```

## Current File Structure

The file has 3 distinct sections that can be extracted:

### 1. Popup/DOM utility functions (lines ~52-488, ~30 functions)
Pure DOM manipulation helpers for repositioning Syncfusion popups (filter, column menu, context menu, pager dropdown). These have **zero React dependencies** — they're plain functions operating on HTMLElement/DOMRect.

Key functions: `applyFixedPopupStyle`, `cleanupZombies`, `repositionPagerDropdownPopup`, `repositionFilterPopup`, `repositionColumnMenuPopup`, `repositionColumnSubmenuPopup`, `repositionGridContextMenuPopup`, plus ~20 helper functions.

### 2. Constants (lines ~52-62, 10 constants)
`PAGER_BUTTON_APPROX_WIDTH`, `POPUP_REPOSITION_DELAY_MS`, etc. Some are already in `constants.ts` but many are still inline.

### 3. DataGridComponent (lines ~490-1010, the actual React component)
The component itself with refs, effects, callbacks, and JSX. After extracting sections 1 and 2, this should be closer to the 200-line limit but may need further decomposition of effects into custom hooks.

## Implementation Plan

### Step 1: Extract popup utilities → `popupPositioning.ts`
- Move all ~30 pure DOM functions to a new file
- These functions are purely imperative DOM manipulation, not React
- Export only the 5 top-level functions called by the component:
  - `repositionPagerDropdownPopup`
  - `repositionFilterDropdownPopups`
  - `repositionColumnMenuPopup`
  - `repositionColumnSubmenuPopup`
  - `repositionGridContextMenuPopup`
  - `cleanupZombies`
- Keep internal helpers as unexported module-level functions

### Step 2: Move constants → `constants.ts`
- Move the ~10 inline constants to the existing `constants.ts`
- Replace magic numbers with named constants throughout

### Step 3: Extract effects → `useGridPopupEffects.ts`
- The 3 `useEffect` hooks (lines ~547, ~559, ~837) that handle popup repositioning, resize observers, and cleanup can be extracted into a custom hook
- This hook returns the refs needed by the component

### Step 4: Fix remaining rule violations in index.tsx
- After extraction, the component should be ~200-300 lines
- Address remaining `consistent-type-assertions` with proper Syncfusion type narrowing
- Replace `strict-boolean-expressions` violations with explicit checks
- Fix `no-unnecessary-condition` by adjusting types
- Remove the file-level `eslint-disable` comment

### Step 5: Remove the eslint-disable
- Delete line 1 entirely
- If any individual lines still need suppression (e.g., Syncfusion API type assertions), use narrow `eslint-disable-next-line` with a comment explaining why

## Target File Structure After Refactor

```
src/components/ui/syncfusion/DataGrid/
├── __tests__/
├── constants.ts              # All named constants (expanded)
├── index.tsx                 # DataGridComponent (~200-250 lines)
├── popupPositioning.ts       # Pure DOM popup utilities (~400 lines, OK for non-React utilities)
├── types.ts                  # Existing types
├── useGridCallbacks.ts       # Existing callbacks hook
├── useGridFeatures.ts        # Existing features hook
├── useGridFeatures.test.ts   # Existing tests
└── useGridPopupEffects.ts    # New: effect hooks for popup management
```

## Verification

- [ ] `eslint-disable` at line 1 is completely removed
- [ ] `npm run lint:fix` — no new errors from DataGrid files
- [ ] `npm run test:coverage` — all DataGrid tests pass
- [ ] `npx vite build` — build succeeds
- [ ] Visual check: DataGrid renders correctly with column menus, filters, pagination, and context menus
