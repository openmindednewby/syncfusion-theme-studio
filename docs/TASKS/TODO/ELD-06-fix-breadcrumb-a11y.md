# ELD-06: Fix Breadcrumb InteractiveSection Accessibility

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev

## Objective

Remove the `eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions` from `src/features/components/pages/NativeBreadcrumbShowcase/sections/InteractiveSection.tsx:92`.

## Current State

```tsx
{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
<div onClick={handleItemClick}>
  <BreadcrumbNative ... />
</div>
```

A plain `<div>` wraps the breadcrumb to intercept clicks. This violates two a11y rules:
1. `click-events-have-key-events` — no `onKeyDown`/`onKeyUp` handler
2. `no-static-element-interactions` — `<div>` is not interactive

## Implementation Plan

### Option A: Move click handler into BreadcrumbNative (preferred)
If `BreadcrumbNative` supports an `onItemClick` prop, use that instead of wrapping with a `<div>`. The breadcrumb items are already interactive `<button>`/`<a>` elements.

### Option B: Use proper interactive element
Replace the `<div>` with a semantic element:
```tsx
<nav role="navigation" onKeyDown={handleItemKeyDown} onClick={handleItemClick}>
  <BreadcrumbNative ... />
</nav>
```
Add a `handleItemKeyDown` that triggers the same action on Enter/Space.

### Option C: Use event delegation on the breadcrumb's own click
If this is a showcase demo, the click handler may only exist for demonstration purposes. In that case, add keyboard support for completeness.

## Verification

- [ ] `eslint-disable-next-line` removed
- [ ] Breadcrumb items are keyboard-navigable (Tab + Enter)
- [ ] `npm run lint:fix` — no errors
- [ ] Visual check: Interactive breadcrumb demo works with mouse and keyboard
