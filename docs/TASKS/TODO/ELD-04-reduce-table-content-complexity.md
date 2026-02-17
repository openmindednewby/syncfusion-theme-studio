# ELD-04: Reduce TableContent Complexity

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Objective

Remove the `eslint-disable-next-line complexity` from `src/components/ui/native/TableNative/TableContent.tsx:87`. The component's render function handles too many concerns: filtering, grouping, editing, aggregation, pagination, column menu, and empty state.

## Current State

File is 202 lines. The component destructures ~20 props and conditionally renders 7+ feature sections in a single function body. The `complexity` disable is on the component function signature itself.

## Implementation Plan

### Step 1: Extract conditional sections into sub-components
Each feature section can be a small focused component:

- `TableFilterRow` — renders the filter row when `filterConfig` is active
- `TableGroupHeader` — renders group headers when `groupConfig` is active
- `TableAggregateFooter` — renders aggregate row when `aggregates` is defined

### Step 2: Use a config-driven rendering pattern
Instead of nested conditionals, create a features array and map over it:
```ts
const sections = [
  filterConfig && <TableFilterRow ... />,
  groupConfig && <TableGroupHeader ... />,
  // etc.
].filter(Boolean);
```

### Step 3: Simplify prop threading
Consider a TableContext to avoid passing 20+ props through multiple levels. This also reduces the parameter count.

### Step 4: Remove the eslint-disable
After extraction, the main component should have cyclomatic complexity under 15.

## Verification

- [ ] `eslint-disable-next-line complexity` removed
- [ ] `npm run lint:fix` — no errors
- [ ] `npm run test:coverage` — all TableNative tests pass
- [ ] Visual check: Table renders correctly with all feature combinations
