# BC-IMP-06: Export Debounce Hooks and Remove Inline Reimplementation

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Problem

`src/utils/debounce.ts` contains `useDebouncedCallback` and `useThrottledCallback` hook implementations that are **defined but not exported** (suppressed with `@typescript-eslint/no-unused-vars`). Meanwhile, `TableToolbar.tsx` manually reimplements the debounce pattern with `useRef<setTimeout>` + `clearTimeout` + `setTimeout`.

## Solution

1. Export `useDebouncedCallback` and `useThrottledCallback` from `src/utils/debounce.ts` (remove the eslint-disable suppression)
2. Refactor `src/components/ui/TableNative/TableToolbar.tsx` to use `useDebouncedCallback` instead of the inline reimplementation
3. Search for any other inline debounce patterns and replace them

## Files to Change

- `src/utils/debounce.ts` — export the hooks
- `src/components/ui/TableNative/TableToolbar.tsx` — use the shared hook

## Benefits

- DRY — eliminates inline reimplementation
- Existing hooks are already written and just need to be exported
- Bug fixes propagate to all consumers
