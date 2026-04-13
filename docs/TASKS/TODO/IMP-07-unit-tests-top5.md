# IMP-07: Add Unit Tests for Top 5 Untested Utility Files

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Problem

Several files with non-trivial pure logic have zero test coverage. These are high-ROI test targets because they're pure functions (easy to test, no mocking needed) that underpin critical features.

## Files to Test (priority order)

### 1. `src/utils/animationUtils.ts` (59 lines)
- `parseDurationMs()` — parses "300ms", "0.3s", bare numbers; multiple code paths
- `scaleDuration()` — combines parsing + multiplication + rounding
- `toSyncfusionEffect()`, `toKeyframeName()` — enum-to-string mappers
- **Risk**: parsing bugs silently break all animations app-wide
- **Test file**: `src/utils/animationUtils.test.ts`

### 2. `src/components/ui/syncfusion/DataGrid/utils/pageSettingsHelpers.ts` (109 lines)
- `normalizePositiveInt()` — parses to positive integers with fallback
- `parsePageSizeOptions()` — handles string/array/unknown inputs
- `computeThemePageSettings()`, `mergeFallbackPageSettings()` — settings merging
- **Risk**: NaN, negative numbers, empty arrays silently break grid pagination
- **Test file**: `src/components/ui/syncfusion/DataGrid/utils/pageSettingsHelpers.test.ts`

### 3. `src/components/ui/native/TableNative/hooks/groupingUtils.ts` (117 lines)
- `groupDataByColumns()` — recursive multi-level data grouping
- `buildGroupKey()`, `partitionByField()`, `collectGroupKeys()`
- **Risk**: recursive algorithm bugs corrupt table data display
- **Test file**: `src/components/ui/native/TableNative/hooks/groupingUtils.test.ts`

### 4. `src/stores/theme/actions/themeActions.ts` (69 lines)
- `deepMerge()` — recursive object merge for theme import
- `isValidThemeConfig()` — validates user-provided JSON structure
- **Risk**: malformed JSON or missing fields could corrupt theme state
- **Test file**: `src/stores/theme/actions/themeActions.test.ts`

### 5. `src/components/ui/native/TableNative/utils/tableContentUtils.ts` (142 lines)
- `calcColSpan()` — drives table layout correctness
- `buildFeatureProps()` — 12+ conditional spreads
- **Risk**: wrong column count breaks table rendering
- **Test file**: `src/components/ui/native/TableNative/utils/tableContentUtils.test.ts`

## Test Approach

- All pure functions — zero mocking needed, tests run in <1ms each
- Focus on edge cases: NaN, empty strings, negative numbers, empty arrays, nested objects
- For recursive functions: test 0, 1, 2, 3 levels of nesting
- Follow existing project patterns (see `paletteGenerator.test.ts` for good example)

## Benefits

- Catches parsing edge cases before they reach users
- Recursive algorithms are notoriously tricky — tests prevent regressions
- Incrementally raises coverage threshold above current 50%
