# ENT-27: Spreadsheet Page

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Objective

Add a Spreadsheet page using Syncfusion's Spreadsheet component — Excel-like editing experience in the browser.

## Syncfusion Package

- `@syncfusion/ej2-react-spreadsheet`

## Implementation Plan

### 1. Page Structure

```
src/features/spreadsheet/
├── pages/
│   └── SpreadsheetPage/
│       ├── index.tsx
│       ├── components/
│       │   ├── SpreadsheetView.tsx    # Syncfusion Spreadsheet wrapper
│       │   ├── SheetSelector.tsx      # Sample data sheets
│       │   └── SpreadsheetToolbar.tsx
│       └── hooks/
│           └── useSpreadsheet.ts
├── data/
│   └── sampleSheets.ts             # Pre-loaded spreadsheet data
├── types.ts
└── constants.ts
```

### 2. Features

- Cell editing with formatting (bold, italic, colors, borders)
- Formulas (SUM, AVERAGE, COUNT, IF, VLOOKUP, etc.)
- Multiple sheets (tabs)
- Sorting, filtering, freeze panes
- Cell merge, conditional formatting
- Charts from data ranges
- Import/Export Excel (.xlsx)
- Print
- 2-3 pre-loaded sample sheets (sales data, budget template, employee roster)

### 3. Route + Navigation

- Add `/spreadsheet` route
- Add "Spreadsheet" to sidebar under "Apps" section

## Success Criteria

- [ ] Spreadsheet renders with toolbar and formula bar
- [ ] Cell editing and formatting work
- [ ] Formulas calculate correctly
- [ ] Multiple sheet tabs work
- [ ] Import/Export Excel works
- [ ] Theme-aware
