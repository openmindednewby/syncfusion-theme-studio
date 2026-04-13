# ENT-14: Data Export (CSV / Excel / PDF)

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Objective

Add data export capabilities to all DataGrid pages — export to CSV, Excel, and PDF. Syncfusion grids have built-in export support; this task wires it up consistently across all grid pages.

## Syncfusion Packages (already available via ej2-react-grids)

- Excel export: built into `@syncfusion/ej2-react-grids`
- PDF export: built into `@syncfusion/ej2-react-grids`
- CSV export: built into `@syncfusion/ej2-react-grids`

## Implementation Plan

### 1. Shared Export Hook

Create `src/shared/hooks/useGridExport.ts`:
- `exportToExcel(gridRef, fileName)` — triggers Excel download
- `exportToCsv(gridRef, fileName)` — triggers CSV download
- `exportToPdf(gridRef, fileName, options?)` — triggers PDF download with optional header/footer
- Handles grid ref typing, loading state, error handling

### 2. Shared Export Toolbar Component

Create `src/components/ui/shared/ExportToolbar.tsx`:
- Three buttons: CSV, Excel, PDF (with icons)
- Accept grid ref as prop
- i18n labels
- Consistent styling across all pages

### 3. Wire Up to All Grid Pages

Add ExportToolbar to:
- Products page (both native and Syncfusion)
- Orders page (ENT-04)
- Customers page
- Invoices page
- Inventory page
- User Management (ENT-05)
- Alerts Management
- Activity Log

### 4. PDF Customization

- Company logo/name in header
- Page numbers in footer
- Date of export
- Column headers styled

## Success Criteria

- [ ] Export buttons visible on all grid pages
- [ ] CSV export downloads valid CSV file
- [ ] Excel export downloads valid .xlsx file
- [ ] PDF export downloads formatted PDF
- [ ] Exports respect current grid filters/sorting
- [ ] File names include page name + date
