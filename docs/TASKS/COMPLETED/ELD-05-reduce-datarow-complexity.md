# ELD-05: Reduce DataRow Complexity

## Status: COMPLETED
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Objective

Remove the `eslint-disable-next-line complexity` from `src/components/ui/native/TableNative/DataRow.tsx:43`. The component handles selection state, edit mode, delete state, and command buttons in a single render function with ~20+ conditional branches.

## Root Cause Analysis

The complexity came from:
1. Derived state computations (5 boolean evaluations with short-circuit operators)
2. Conditional className construction in the `<tr>` element
3. Conditional rendering of checkbox `<td>` with nested guard checks
4. The `columns.map` closure with edit mode and dirty state branching
5. Conditional rendering of command `<td>` with guard check

## Changes Made

### DataRow.tsx (refactored from 143 to 156 lines)
- **Removed** `eslint-disable-next-line complexity` comment
- **Extracted** `computeRowState()` helper: computes all derived booleans (`isSelected`, `isDeleted`, `isEditingRow`, `isOddRow`, `showCommand`) and the `editCtx` into a single pure function with an object parameter (to satisfy max-params: 4)
- **Extracted** `getRowBackgroundStyle()` helper: moves the striped/odd row ternary out of JSX
- **Delegated** checkbox rendering to `CheckboxCell` sub-component
- **Delegated** command column rendering to `CommandCellWrapper` sub-component
- **Delegated** per-column cell rendering (edit/readonly branching) to `DataCell` sub-component
- The `DataRow` component itself now has minimal branching: 3 cn() boolean operands + 2 ternary guards + 1 guard in handleRowClick

### DataRowParts.tsx (new file, 132 lines)
- **CheckboxCell**: renders the selection checkbox `<td>` with the `isValueDefined(selection)` guard
- **CommandCellWrapper**: wraps `CommandCell` in a `<td>` with styling
- **DataCell**: handles the editable vs read-only branching per column, including dirty state computation

### Public API
- **Unchanged**: same `Props` interface, same default export (`memo(DataRow)`), same type re-exports (`SelectionHandlers`, `EditingHandlers`, `DataRowColumn`)

## Verification

- [x] `eslint-disable-next-line complexity` removed
- [x] `npx eslint DataRow.tsx DataRowParts.tsx` passes with 0 errors
- [x] `npx vitest run` - 927/928 tests pass (1 pre-existing failure in cyberWatch.test.ts unrelated to this change)
- [x] Public API unchanged (same props, same exports)
