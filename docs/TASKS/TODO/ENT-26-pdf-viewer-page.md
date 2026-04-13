# ENT-26: PDF Viewer Page

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Objective

Add a PDF Viewer page using Syncfusion's PdfViewer component — view, annotate, and print PDF documents in-app.

## Syncfusion Package

- `@syncfusion/ej2-react-pdfviewer`

## Implementation Plan

### 1. Page Structure

```
src/features/pdf-viewer/
├── pages/
│   └── PdfViewerPage/
│       ├── index.tsx
│       ├── components/
│       │   ├── PdfView.tsx           # Syncfusion PdfViewer wrapper
│       │   ├── DocumentPicker.tsx    # Select from sample PDFs
│       │   └── ViewerToolbar.tsx     # Custom toolbar additions
│       └── hooks/
│           └── usePdfViewer.ts
├── data/
│   └── sampleDocuments.ts          # List of sample PDFs
├── types.ts
└── constants.ts
```

### 2. Features

- View PDF documents with zoom, scroll, page navigation
- Toolbar: zoom, fit-to-page, page navigation, search, print, download
- Text selection and copy
- Annotation: highlight, underline, strikethrough, freehand draw, text notes
- Bookmark panel
- Thumbnail panel
- Form filling (if PDF has form fields)
- 3-4 sample PDFs bundled (invoice, report, user manual, contract)

### 3. Route + Navigation

- Add `/pdf-viewer` route
- Add "PDF Viewer" to sidebar under "Apps" section

## Success Criteria

- [ ] PDF renders with proper formatting
- [ ] Zoom, pan, page navigation work
- [ ] Annotation tools work
- [ ] Print and download work
- [ ] Search within PDF works
- [ ] Theme-aware toolbar
