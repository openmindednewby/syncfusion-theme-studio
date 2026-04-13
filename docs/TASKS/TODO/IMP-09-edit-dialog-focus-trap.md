# IMP-09: Fix EditDialog Focus Trap for Keyboard Accessibility

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Problem

`TableNative/components/EditDialog.tsx` is a custom `div`-based modal with `role="dialog"`, `aria-modal="true"`, `tabIndex={-1}`, and handles Escape — but does **not implement focus trapping**. A keyboard user can Tab out of the dialog into background content, which violates WCAG 2.4.3 (Focus Order) and the WAI-ARIA dialog pattern.

`DialogNative` uses the native `<dialog>` element which gets focus trapping for free. `EditDialog` does not.

## Solution

**Option A (preferred)**: Refactor `EditDialog` to use the native `<dialog>` element (like `DialogNative` does), gaining browser-native focus trapping and backdrop.

**Option B**: Add a focus trap utility:
1. On open: save previously focused element, focus first focusable child
2. On Tab at last focusable: wrap to first focusable
3. On Shift+Tab at first focusable: wrap to last focusable
4. On close: restore focus to previously focused element

Consider extracting a shared `useFocusTrap(ref)` hook if other custom modals need it.

## Files to Change

- `src/components/ui/native/TableNative/components/EditDialog.tsx`
- Possibly create `src/hooks/useFocusTrap.ts` if reusable

## Benefits

- Keyboard users stay within the dialog while it's open
- WCAG 2.4.3 compliance (Focus Order)
- Consistent with `DialogNative` behavior
- Prevents accidental interaction with background content while editing
