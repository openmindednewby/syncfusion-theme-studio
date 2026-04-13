# IMP-02: Deploy ErrorBoundary Around Routes and Syncfusion Components

## Status: TODO
## Priority: High (crash resilience for free)
## Depends on: None
## Agent: frontend-dev

## Problem

`ErrorBoundary` is fully built at `common/components/ErrorBoundary.tsx` and exported from the barrel, but has **zero consumers**. If any lazy import fails or a Syncfusion component throws a runtime error, the entire app crashes with no recovery path. The router wraps pages in `<Suspense>` but no `<ErrorBoundary>`.

## Solution

1. Wrap the App root (`App.tsx`) with a top-level ErrorBoundary for catastrophic failures
2. Wrap the route outlet in `router.tsx` with ErrorBoundary for page-level errors
3. Wrap Syncfusion-heavy pages (DataGrid, Dialog, DatePicker showcases) with ErrorBoundary since Syncfusion components interact with external JS libraries that can throw

## Files to Change

- `src/app/App.tsx` — wrap root with ErrorBoundary
- `src/app/router.tsx` — wrap route content with ErrorBoundary
- Consider per-page ErrorBoundary for DataGrid showcase and forms pages

## Benefits

- Crash resilience for free — the component already exists and is tested
- Failed lazy imports show a recovery UI instead of a white screen
- Syncfusion runtime errors (common during theme switching) are caught gracefully
- Users see an actionable error message instead of nothing
