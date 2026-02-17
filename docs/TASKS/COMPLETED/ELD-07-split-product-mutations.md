# ELD-07: Split useProductMutations Hook

## Status: COMPLETED
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Objective

Remove the `eslint-disable-next-line smart-max-lines/smart-max-lines` from `src/features/forms/pages/SyncfusionFormsPage/sections/ProductCrudSection/useProductMutations.ts:42`.

## Investigation Findings

The `smart-max-lines` rule has two thresholds:
- `functionMax: 50` — hard error
- `functionWarn: 30` — warning (but reported at `error` severity since the rule is configured as `['error', {...}]`)

The original function was **39 non-blank, non-comment lines** — under the 50-line hard limit but over the 30-line warning threshold. The eslint-disable was suppressing the "exceeds recommended limit of 30" warning-as-error.

To remove the disable comment, the function needed to be reduced to 30 lines or fewer (a reduction of 9 lines).

## Implementation

Used a hybrid of Option A and Option B from the original plan:

1. **Extracted `useInvalidateProducts` hook** — encapsulates `useQueryClient()` + the `invalidate` callback. Saved ~5 lines from the main function.

2. **Extracted `useProductDelete` hook** — encapsulates `useMockServerWebProductsDelete()` + the `handleDelete` callback with editing state cleanup. Saved ~4 more lines from the main function.

Both extracted hooks are private (non-exported) and live in the same file, keeping the refactoring minimal and the module's public API unchanged.

### Result
- `useProductMutations` main function: reduced from 39 to ~26 non-blank non-comment lines
- `useInvalidateProducts`: ~10 lines (well under limit)
- `useProductDelete`: ~16 lines (well under limit)
- File total: 108 lines (well under 200-line file max)
- Public API: identical — `useProductMutations(editingProduct, setEditingProduct)` returning `ProductMutationResult`

## Files Modified

- `src/features/forms/pages/SyncfusionFormsPage/sections/ProductCrudSection/useProductMutations.ts` — refactored

## Verification

- [x] `eslint-disable-next-line smart-max-lines` removed
- [x] `npx eslint` on the file — 0 errors
- [x] `npx eslint` on the entire ProductCrudSection directory — 0 errors
- [x] `npx vitest run` — 927/928 tests pass (1 pre-existing failure in unrelated `cyberWatch.test.ts`)
