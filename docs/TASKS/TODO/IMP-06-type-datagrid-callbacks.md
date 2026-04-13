# IMP-06: Type DataGrid Callbacks with Syncfusion Event Types

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Problem

6 callback props in `DataGrid/types.ts` use `(args: unknown) => void`:
- `onActionBegin` (line 74) — should be `ActionEventArgs`
- `onActionComplete` (line 76) — should be `ActionEventArgs`
- `onToolbarClick` (line 96) — should be `ClickEventArgs`
- `onContextMenuClick` (line 102) — should be `ContextMenuClickEventArgs`
- `onRowDrag` (line 116) — should be `RowDragEventArgs`
- `onRowDrop` (line 118) — should be `RowDragEventArgs`

Additionally `childGrid?: object` (line 108) should be `GridModel`.

The `handleColumnMenuClick` in `DataGrid/index.tsx` already manually types its arg as `{ item?: { id?: string }; column?: { field?: string } }`, proving the need for proper types.

## Solution

1. Import event types from `@syncfusion/ej2-grids` (or `@syncfusion/ej2-react-grids`)
2. Replace `unknown` with specific event types in `DataGrid/types.ts`
3. Replace `object` with `GridModel` for `childGrid`
4. Update any downstream hooks/callbacks that pass through these types

## Files to Change

- `src/components/ui/syncfusion/DataGrid/types.ts`
- `src/components/ui/syncfusion/DataGrid/index.tsx` (remove inline type on `handleColumnMenuClick`)
- Any hook files that forward these callbacks

## Benefits

- Consumers get autocomplete for event properties (e.g., `args.requestType`, `args.rows`)
- TypeScript catches typos in property access at compile time
- No more need for manual inline type annotations at call sites

## Linter Enforcement

Consider adding a project-level ESLint rule flagging `(args: unknown) =>` in interface definitions. The `@typescript-eslint/no-unsafe-argument` rule can help catch downstream issues where `unknown` args are used unsafely.
