# ELD-06: Fix Breadcrumb InteractiveSection Accessibility

## Status: COMPLETED
## Priority: Low
## Agent: frontend-dev

## Problem

`InteractiveSection.tsx` wrapped `BreadcrumbNative` in a plain `<div onClick>` for event delegation, which violated two jsx-a11y rules:
1. `click-events-have-key-events` -- no keyboard handler
2. `no-static-element-interactions` -- `<div>` is not interactive

An `eslint-disable-next-line` suppressed these warnings.

## Solution

Added an `onItemClick` callback prop to `BreadcrumbNative` that fires when a non-current breadcrumb item's `<a>` element is clicked. This is the correct approach because:
- The `<a>` elements are already interactive and keyboard-accessible (focusable via Tab, activatable via Enter)
- No wrapper `<div>` is needed -- click handling happens at the semantically correct element level
- The eslint-disable comment is removed entirely

## Files Modified

### `src/components/ui/native/BreadcrumbNative/index.tsx`
- Added optional `onItemClick?: (item: BreadcrumbItem, event: React.MouseEvent<HTMLAnchorElement>) => void` to `Props`
- Updated `<a>` element's `onClick` to call `onItemClick?.(item, e)` after `e.preventDefault()`

### `src/features/components/pages/NativeBreadcrumbShowcase/sections/InteractiveSection.tsx`
- Removed `eslint-disable-next-line` comment
- Removed wrapper `<div onClick={handleItemClick}>`
- Simplified `handleItemClick` to accept `BreadcrumbItem` directly instead of doing DOM traversal
- Added `onItemClick={handleItemClick}` prop to `BreadcrumbNative`

## Verification

- [x] `eslint-disable-next-line` removed
- [x] Breadcrumb items keyboard-navigable (Tab + Enter) via native `<a>` behavior
- [x] `npx eslint` passes on both files -- 0 errors
- [x] `npx vitest run` -- 927/928 pass (1 pre-existing failure in unrelated `cyberWatch.test.ts`)
