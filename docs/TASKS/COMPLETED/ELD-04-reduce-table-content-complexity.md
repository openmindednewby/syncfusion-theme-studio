# ELD-04: Reduce TableContent Complexity

## Status: COMPLETED
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Problem

`TableContent.tsx` had an `eslint-disable-next-line complexity` suppression on line 87.
The component function had cyclomatic complexity of 26 (max allowed: 15) due to:
- 6+ ternary expressions for `showColumnMenu` props passed to `TableHeader`
- 8+ optional chaining expressions (`?.`) for pagination config props
- 4 conditional JSX rendering blocks (GroupDropArea, TableFooter, TablePagination, EditDialog)
- Multiple derived boolean/string computations with conditionals

## Implementation

### Changes Made

1. **Created `tableContentUtils.ts`** - Extracted helper functions and interfaces:
   - `calcColSpan()` - column span calculation
   - `shouldShowFilter()` - filter visibility check
   - `resolveOptionalHandlers()` - conditional handler resolution
   - `buildColumnMenuProps()` - consolidates 6 `showColumnMenu ? x : undefined` ternaries into 1
   - `extractPaginationConfig()` - consolidates 8 `gridConfig?.pagination?.x` optional chains into 1
   - `resolveTableLayout()` - extracts table layout class resolution
   - `isDialogEditing()` - extracts dialog editing mode check
   - `COMPACT_TEXT`, `DEFAULT_TEXT` constants

2. **Refactored `TableContent.tsx`**:
   - Replaced 6 inline `showColumnMenu ? x : undefined` ternaries with single `buildColumnMenuProps()` call + spread
   - Replaced 4x `gridConfig?.pagination?.x` with `extractPaginationConfig()` pre-computation
   - Replaced inline `gridConfig?.tableLayout === 'auto'` with `resolveTableLayout()`
   - Replaced inline `flags.editingEnabled && editConfig?.mode === 'Dialog'` with `isDialogEditing()`
   - Removed `eslint-disable-next-line complexity` comment
   - Removed unused `isValueDefined` import
   - File reduced from 202 to 181 lines

### Files Modified
- `src/components/ui/native/TableNative/TableContent.tsx` - refactored, eslint-disable removed

### Files Created
- `src/components/ui/native/TableNative/tableContentUtils.ts` - extracted helpers (89 lines)

## Verification

- [x] `eslint-disable-next-line complexity` removed
- [x] `npx eslint TableContent.tsx` - no errors, no warnings (complexity now under 15)
- [x] `npx eslint tableContentUtils.ts` - no errors
- [x] `npx vitest run` - all TableNative tests pass (1 pre-existing failure in unrelated cyberWatch.test.ts)
- [x] `npx vite build` - build succeeds
- [x] Public API unchanged (same Props interface, same default export)
