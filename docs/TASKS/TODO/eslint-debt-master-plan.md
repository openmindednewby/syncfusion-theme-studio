# ESLint Debt: Eliminate eslint-disable Suppressions

## Status: TODO
## Priority: Medium

## Background

An audit of all `eslint-disable` comments across `SyncfusionThemeStudio/src/` found **46 suppressions** across **30 files**. After analysis, **28 are justified** (narrowly scoped, with valid reasons) and **7 need remediation** via dedicated tasks. The remaining 11 are in test files where rules are already relaxed globally.

## Audit Summary

### Justified Suppressions (keep as-is)

These are narrowly scoped, well-commented, and represent genuine edge cases:

| Category | Count | Examples |
|----------|-------|---------|
| `consistent-type-assertions` for EventTarget narrowing | 6 | TableColumnFilter, TableActionMenu, TopLevelItem, useClickOutside |
| `consistent-type-assertions` for Syncfusion API bridging | 7 | useTanStackQueryAdapter, columns.ts, useGridCallbacks, Select, themeActions |
| `react-compiler` for imperative Syncfusion API | 3 | useSyncfusionFilters, useSyncfusionDefaultSort, DataGrid ref |
| `prefer-const-enum` for isolatedModules compat | 2 | logger.ts, errorTypes.ts |
| `no-null-check` on the utility that defines null checks | 1 | utils/is.ts |
| `no-param-reassign` for Syncfusion event.cancel pattern | 1 | SyncfusionBreadcrumbShowcase InteractiveSection |
| `jsx-a11y` for WAI-ARIA menu/listbox/dialog patterns | 6 | MenuNative (3), SelectNative (2), EditDialog (1) |
| `no-non-null-assertion` with modulo index reasoning | 2 | alertData.ts, sampleData.ts |

### Tasks to Remediate (7 tasks)

| # | File | Problem | Severity |
|---|------|---------|----------|
| ELD-01 | `DataGrid/index.tsx` | 1010 lines, 10 rules disabled at file level | Critical |
| ELD-02 | `componentTypes.ts` | 238-line types file with `max-lines` disabled | Low |
| ELD-03 | `useFormWithSchema.ts` | Triple `any`/assertion disable for RHF+Zod typing | Medium |
| ELD-04 | `TableContent.tsx` | `complexity` disabled on 202-line render function | Medium |
| ELD-05 | `DataRow.tsx` | `complexity` disabled on render function | Medium |
| ELD-06 | `NativeBreadcrumbShowcase InteractiveSection.tsx` | Missing keyboard handler, wrong element for click | Low |
| ELD-07 | `useProductMutations.ts` | `smart-max-lines` disabled, function too large | Low |

## Execution Order

1. **ELD-01** first (highest impact, unblocks others)
2. **ELD-04 + ELD-05** together (both TableNative complexity)
3. **ELD-03** (form typing)
4. **ELD-02, ELD-06, ELD-07** in any order (low severity)

## Success Criteria

- All 7 `eslint-disable` comments removed
- Zero new ESLint errors introduced
- All existing tests continue passing
- No visual regressions
