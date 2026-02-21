# IMP-06: Type DataGrid Callbacks with Syncfusion Event Types

## Status: COMPLETED

## Problem
6 callback props in `DataGrid/types.ts` used `(args: unknown) => void` instead of proper Syncfusion event types. Also `childGrid?: object` should be `GridModel`.

## Changes Made

### `src/components/ui/syncfusion/DataGrid/types.ts`
- Imported `ActionEventArgs`, `ContextMenuClickEventArgs`, `GridModel`, `RowDragEventArgs` from `@syncfusion/ej2-grids`
- Imported `ClickEventArgs` from `@syncfusion/ej2-navigations`
- `onActionBegin`: `(args: unknown)` -> `(args: ActionEventArgs)`
- `onActionComplete`: `(args: unknown)` -> `(args: ActionEventArgs)`
- `onToolbarClick`: `(args: unknown)` -> `(args: ClickEventArgs)`
- `onContextMenuClick`: `(args: unknown)` -> `(args: ContextMenuClickEventArgs)`
- `onRowDrag`: `(args: unknown)` -> `(args: RowDragEventArgs)`
- `onRowDrop`: `(args: unknown)` -> `(args: RowDragEventArgs)`
- `childGrid`: `object` -> `GridModel`

### `src/components/ui/syncfusion/DataGrid/hooks/useGridCallbacks.ts`
- Imported matching Syncfusion event types
- Updated `GridCallbacks` interface from `unknown` to proper types
- Made `useOptionalCallback` generic: `useOptionalCallback<TArgs>`

### `src/components/ui/syncfusion/DataGrid/index.tsx`
- Imported `ColumnMenuClickEventArgs` from `@syncfusion/ej2-grids`
- Replaced inline type `{ item?: { id?: string }; column?: { field?: string } }` with `ColumnMenuClickEventArgs`
- Changed `args.item?.id` to `args.item.id` (item is required in MenuEventArgs)

### `src/components/ui/syncfusion/DataGrid/hooks/useGridCallbacks.test.ts`
- Imported proper Syncfusion event types
- Updated test mock args to use type assertions (`as ActionEventArgs`, etc.)

## Verification
- `npx tsc --noEmit` -- no new type errors (all DataGrid files clean)
- `npx vitest run src/components/ui/syncfusion/DataGrid/` -- 78 tests pass (3 files)
- `npx eslint` -- 0 errors on modified files (1 pre-existing warning)
- No runtime behavior changes -- only type annotations modified
