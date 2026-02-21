# BC-IMP-02: Deploy ErrorBoundary Around Routes and Critical Components

## Status: TODO
## Priority: Medium (crash resilience for free)
## Depends on: None
## Agent: frontend-dev

## Problem

`ErrorBoundary` is fully built at `src/components/ErrorBoundary/ErrorBoundary.tsx` and exported, but has **zero consumers** anywhere in the codebase. If any lazy import fails or a component throws a runtime error, the entire app crashes with no recovery path.

Reference implementation: `SyncfusionThemeStudio/src/components/common/components/ErrorBoundary.tsx`

## Solution

1. Wrap the App root with a top-level ErrorBoundary for catastrophic failures
2. Wrap the route outlet/navigator with ErrorBoundary for page-level errors
3. Consider per-screen ErrorBoundary for complex pages (template editor, menu editor, dynamic forms)

## Files to Change

- `App.tsx` or root component — wrap with ErrorBoundary
- Route/navigation configuration — wrap route content with ErrorBoundary
- Critical pages: `TemplateEditorModal`, `MenuEditorModal`, `DynamicForm`

## Benefits

- Crash resilience for free — the component already exists
- Failed lazy imports show a recovery UI instead of a white screen
- Runtime errors in one page don't bring down the entire app
- Users see an actionable error message instead of nothing
