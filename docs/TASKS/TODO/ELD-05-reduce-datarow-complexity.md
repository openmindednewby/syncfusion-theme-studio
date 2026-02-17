# ELD-05: Reduce DataRow Complexity

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Objective

Remove the `eslint-disable-next-line complexity` from `src/components/ui/native/TableNative/DataRow.tsx:43`. The component handles selection state, edit mode, delete state, and command buttons in a single render function.

## Current State

File is 143 lines. The `DataRow` component destructures ~14 props and computes 5+ derived boolean states (`isSelected`, `isDeleted`, `isEditingRow`, `isOddRow`, `showCommand`) before rendering cells conditionally.

## Implementation Plan

### Step 1: Extract derived state into a custom hook
Create `useRowState(row, rowIndex, ...)` that returns the computed booleans. This moves the conditional logic out of the render function.

### Step 2: Extract cell rendering logic
The cell mapping (`columns.map(...)`) with its edit/readonly branching can be extracted to a `DataRowCells` helper (partially done already with `EditableCell`/`ReadOnlyCell`), but the orchestration logic around them can be simplified.

### Step 3: Simplify conditional className building
Use a helper function or `cn()` utility more aggressively to collapse the multi-branch className construction.

### Step 4: Remove the eslint-disable
After extraction, complexity should be under 15.

## Notes

This task pairs well with ELD-04 (TableContent complexity). Both are in the same `TableNative/` directory and share similar patterns. Consider doing them together.

## Verification

- [ ] `eslint-disable-next-line complexity` removed
- [ ] `npm run lint:fix` — no errors
- [ ] `npm run test:coverage` — all TableNative tests pass
- [ ] Visual check: Table rows render correctly in all states (selected, editing, deleted, striped)
