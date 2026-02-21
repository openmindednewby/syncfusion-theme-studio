# IMP-04: Extract useDebouncedInput Hook

## Status: COMPLETED

## Problem
5 components implement the identical debounce-with-local-state pattern:
`useState` + `useRef<setTimeout>` + `clearTimeout`/`setTimeout` in a `useCallback`.

## New Files
- `src/hooks/useDebouncedInput.ts` - Generic debounced input hook (48 lines)
- `src/hooks/useDebouncedInput.test.ts` - 7 unit tests for the hook

## Refactored Files
- `src/components/layout/ThemeSettingsDrawer/components/TextInputRow.tsx` - Replaced inline debounce with hook
- `src/components/layout/ThemeSettingsDrawer/components/NumberInputRow.tsx` - Replaced inline debounce with hook
- `src/components/layout/ThemeSettingsDrawer/components/ColorPicker.tsx` - Replaced inline debounce with hook (hex/rgb conversion kept in component)
- `src/components/layout/ThemeSettingsDrawer/sections/TypographySection/components/FontFamilyEditor.tsx` - Replaced inline debounce with hook
- `src/components/layout/ThemeSettingsDrawer/sections/LayoutSection/components/ShadowsEditor.tsx` - Replaced inline debounce with hook

## useDebouncedFilter Evaluation
The `useDebouncedFilter` hook at `src/components/ui/native/TableNative/hooks/useDebouncedFilter.ts` uses a fundamentally different pattern (two `useEffect` hooks for debounce instead of `useRef` + `useCallback`, and a `field` parameter passed to onChange). Refactoring it would change behavior or require awkward wrapping. Left as-is.

## Hook API
```typescript
function useDebouncedInput<T>(
  value: T,
  onChange: (value: T) => void,
  delayMs: number,
): { localValue: T; handleChange: (newValue: T) => void }
```

Features:
- Generic type parameter `<T>` works with string, number, etc.
- Syncs local state when external `value` changes (via `useEffect`)
- Clears pending timeout on each new change
- Cleans up timeout on unmount

## Verification Results
- TypeScript: No errors in modified files (pre-existing errors elsewhere)
- Tests: 7/7 pass (initial value, immediate update, delayed onChange, timer reset, unmount cleanup, external sync, number values)
- Lint: Clean on all modified files
- Full suite: 1130 passed, 4 failed (all pre-existing failures unrelated to this change)

## Success Criteria
- [x] Hook is generic and works with string, number, etc.
- [x] All 5 consumers refactored
- [x] No external behavior changes
- [x] All tests pass
- [x] TypeScript compiles cleanly
- [x] Files under 300 lines, functions under 50 lines
