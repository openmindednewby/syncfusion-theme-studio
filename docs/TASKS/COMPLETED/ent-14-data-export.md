# ENT-14: Data Export (CSV / Excel / PDF)

## Status: COMPLETED
## Priority: Medium
## Agent: frontend-dev

## Problem Statement

Syncfusion DataGrid has built-in export support for CSV, Excel, and PDF. This task wires it up consistently across all existing Syncfusion grid pages with a shared hook and toolbar component.

## Implementation Summary

### Files Created
1. **`src/hooks/useGridExport.ts`** - Shared hook with `exportToExcel`, `exportToCsv`, `exportToPdf` + `buildExportFileName` and `buildPdfProps` utilities
2. **`src/hooks/useGridExport.test.ts`** - 12 unit tests covering all hook functions and edge cases
3. **`src/components/ui/shared/ExportToolbar.tsx`** - Reusable toolbar with CSV/Excel/PDF buttons, inline SVG icons, i18n labels, testIDs, a11y attributes
4. **`src/features/products/pages/ProductsListPage/components/CategoryFilter.tsx`** - Extracted sub-component
5. **`src/features/products/pages/ProductsListPage/components/ErrorMessage.tsx`** - Extracted sub-component
6. **`src/features/products/pages/ProductsListPage/components/EmptyState.tsx`** - Extracted sub-component
7. **`src/features/products/pages/ProductsListPage/components/index.ts`** - Barrel export

### Files Modified
1. **`src/components/ui/syncfusion/DataGrid/index.tsx`** - Added `allowExcelExport` and `allowPdfExport` props to `<GridComponent>`
2. **`src/components/ui/shared/index.ts`** - Added `ExportToolbar` export
3. **`src/shared/testIds.ts`** - Added `EXPORT_TOOLBAR`, `EXPORT_CSV_BTN`, `EXPORT_EXCEL_BTN`, `EXPORT_PDF_BTN` test IDs
4. **`src/localization/locales/en.json`** - Added `dataExport` namespace with i18n keys
5. **`src/features/products/pages/ProductsListPage/index.tsx`** - Wired up export (gridRef, ExportToolbar, gridConfig.export)
6. **`src/features/alerts-incidents/pages/AlertsManagementPage/index.tsx`** - Wired up export (gridRef, ExportToolbar, allowExcelExport/allowPdfExport)

### Key Design Decisions
- **CSV export uses Syncfusion's ExcelExport service**: `csvExport()` method is part of the `ExcelExport` module, so enabling `allowExcelExport` also enables CSV export
- **Separated hook from component**: `useGridExport` handles the export logic, `ExportToolbar` handles the UI, promoting reuse
- **PDF customization**: Header includes page title + export date, footer includes Arabic page numbers; configurable via `PdfExportOptions`
- **File naming convention**: `pageName_YYYY-MM-DD.ext` for consistent, identifiable exports
- **Guard against double-export**: Uses a ref-based lock to prevent concurrent exports

## Verification Results
- [x] `npx eslint` - 0 errors, 2 warnings (unavoidable function/constant ordering conflict)
- [x] `npx tsc --noEmit` - 0 errors
- [x] `npx vitest run` - 88 test files, 1285 tests passed (including 12 new tests)
- [x] `npm run build` - build succeeded in 36s
