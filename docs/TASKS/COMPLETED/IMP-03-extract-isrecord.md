# IMP-03: Extract isRecord/isPlainObject to @/utils/is

## Status: COMPLETED
## Priority: High (fixes a real bug + eliminates 5 duplications)
## Depends on: None
## Agent: frontend-dev

## Problem

`isPlainObject` / `isRecord` is duplicated in 5 files:
- `stores/useThemeStore.ts` (line 32)
- `stores/theme/actions/themeActions.ts` (line 13)
- `lib/api/interceptors/responseNormalizer.ts` (line 21) — **BUG: missing `!Array.isArray()` check**
- `lib/api/errors/errorClassifier.ts` (line 23)
- `lib/api/errors/errorMatcher.ts` (line 66)

The `responseNormalizer.ts` version is **buggy**: an array passes its `isRecord` guard because `typeof [] === 'object'`, but an array is NOT a `Record<string, unknown>`.

## Solution

1. Add `isRecord(value: unknown): value is Record<string, unknown>` to `src/utils/is.ts` with the correct implementation including `!Array.isArray(value)`
2. Export from `utils/index.ts`
3. Replace all 5 local implementations with the shared import
4. Add tests for `isRecord` in `is.test.ts` covering: `null`, `undefined`, arrays, plain objects, class instances

## Files to Change

- `src/utils/is.ts` — add `isRecord`
- `src/utils/is.test.ts` — add tests
- `src/stores/useThemeStore.ts` — replace local `isPlainObject`
- `src/stores/theme/actions/themeActions.ts` — replace local definition
- `src/lib/api/interceptors/responseNormalizer.ts` — replace buggy `isRecord`
- `src/lib/api/errors/errorClassifier.ts` — replace local definition
- `src/lib/api/errors/errorMatcher.ts` — replace local definition

## Benefits

- Fixes a real bug in `responseNormalizer.ts` where arrays incorrectly pass the record check
- Single source of truth for a fundamental type guard
- Eliminates 5 duplications across unrelated modules

## Linter Enforcement

Add a `no-restricted-syntax` ESLint rule to flag inline `typeof value === 'object'` guard patterns that look like `isRecord` reimplementations. Alternatively, add a comment to `is.ts` documenting available guards so developers find them.
