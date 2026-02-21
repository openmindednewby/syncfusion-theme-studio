# IMP-03: Extract isRecord/isPlainObject to @/utils/is

## Problem
`isPlainObject` / `isRecord` is duplicated in 5 files with inconsistent implementations. The `responseNormalizer.ts` and `errorClassifier.ts` and `errorMatcher.ts` versions have a **BUG** where arrays pass the guard because they only check `typeof value === 'object'` without `!Array.isArray(value)`.

## Affected Files
1. `src/stores/useThemeStore.ts` - `isPlainObject` (correct, uses `isValueDefined` + `!Array.isArray`)
2. `src/stores/theme/actions/themeActions.ts` - `isPlainObject` (correct, same as above)
3. `src/lib/api/interceptors/responseNormalizer.ts` - `isRecord` (**BUGGY**, missing `!Array.isArray`)
4. `src/lib/api/errors/errorClassifier.ts` - `isRecord` (**BUGGY**, missing `!Array.isArray`)
5. `src/lib/api/errors/errorMatcher.ts` - `isRecord` (**BUGGY**, missing `!Array.isArray`)

## Implementation Plan
1. Add `isRecord` to `src/utils/is.ts` with the correct implementation
2. Export `isRecord` from `src/utils/index.ts`
3. Replace all 5 local implementations with imports from `@/utils/is`
4. Add tests to `src/utils/is.test.ts`
5. Run `npx tsc --noEmit` and `npm test`

## Success Criteria
- Single shared `isRecord` in `@/utils/is`
- All 5 files import from `@/utils/is` instead of defining locally
- `isRecord([])` returns `false` (bug fix)
- All tests pass, no type errors
