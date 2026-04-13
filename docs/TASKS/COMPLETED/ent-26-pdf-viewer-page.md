# ENT-26: PDF Viewer Page

## Status: COMPLETED
## Agent: frontend-dev

## Problem Statement
Add a PDF Viewer page using Syncfusion's standalone PdfViewer component (no server dependency).

## Implementation Plan

1. Install `@syncfusion/ej2-react-pdfviewer`
2. Add route enums: `RoutePath.PdfViewer`, `RouteSegment.PdfViewer`
3. Add permission: `Permission.ViewPdfViewer`
4. Add test IDs for PDF viewer
5. Add i18n keys
6. Create feature files:
   - `src/features/pdf-viewer/pages/PdfViewerPage/index.tsx`
   - `src/features/pdf-viewer/pages/PdfViewerPage/components/PdfView.tsx`
   - `src/features/pdf-viewer/pages/PdfViewerPage/components/DocumentPicker.tsx`
   - `src/features/pdf-viewer/data/sampleDocuments.ts`
   - `src/features/pdf-viewer/types.ts`
   - `src/features/pdf-viewer/constants.ts`
7. Add lazy import in `lazyPages.ts`
8. Add route in `router.tsx`
9. Add sidebar nav entry
10. Add breadcrumb segment label
11. Add SyncfusionCssModule for PdfViewer
12. Add permission to role mappings

## Files to Modify
- `package.json` - add dependency
- `src/app/routes/routePath.ts` - add PdfViewer path
- `src/app/routes/routeSegment.ts` - add PdfViewer segment
- `src/app/routes/lazyPages.ts` - add lazy import
- `src/app/router.tsx` - add route
- `src/shared/permissions/utils/Permission.ts` - add permission
- `src/shared/permissions/utils/rolePermissions.ts` - add to roles
- `src/shared/testIds.ts` - add test IDs
- `src/components/layout/Sidebar/sidebarNavData.ts` - add nav item
- `src/components/layout/Header/hooks/useHeaderBreadcrumbs.tsx` - add label
- `src/localization/locales/en.json` - add translations
- `src/utils/loadSyncfusionCss.ts` - add PdfViewer module

## Success Criteria
- [ ] PDF renders with Syncfusion standalone viewer
- [ ] Document picker allows switching between sample PDFs
- [ ] Route accessible at /pdf-viewer
- [ ] Sidebar nav entry present
- [ ] Lint, build pass
