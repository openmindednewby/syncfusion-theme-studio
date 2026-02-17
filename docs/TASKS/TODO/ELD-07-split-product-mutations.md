# ELD-07: Split useProductMutations Hook

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Objective

Remove the `eslint-disable-next-line smart-max-lines/smart-max-lines` from `src/features/forms/pages/SyncfusionFormsPage/sections/ProductCrudSection/useProductMutations.ts:42`.

## Current State

The `useProductMutations` function (lines 43-87, ~45 lines) combines 3 mutations (create, update, delete) with query invalidation and editing state management. The `smart-max-lines` rule flags it because it exceeds the 50-line function max when including the function signature and internal `useCallback` hooks.

The file is 87 lines total, which is under the 200-line file max. The issue is specifically the single function being too long.

## Implementation Plan

### Option A: Extract invalidation helper (simplest)
Move the `invalidate` callback and the query client logic into a separate `useInvalidateProducts` hook. This reduces `useProductMutations` by ~5-10 lines, likely bringing it under 50.

### Option B: Split into individual mutation hooks
Create `useCreateProduct`, `useUpdateProduct`, `useDeleteProduct` as thin wrappers that each handle their own mutation + invalidation. The parent hook composes them:
```ts
export function useProductMutations(...): ProductMutationResult {
  const create = useCreateProduct(invalidate);
  const update = useUpdateProduct(editingProduct, setEditingProduct, invalidate);
  const del = useDeleteProduct(editingProduct, setEditingProduct, invalidate);
  return { isMutating: create.isPending || update.isPending || del.isPending, ... };
}
```

### Recommendation
Option A is sufficient. The function is only slightly over the limit and the logic is cohesive. A small extraction should bring it into compliance without over-engineering.

## Verification

- [ ] `eslint-disable-next-line smart-max-lines` removed
- [ ] `npm run lint:fix` — no errors
- [ ] `npm run test:coverage` — all tests pass
- [ ] Manual test: Product CRUD operations work (create, edit, delete)
