# IMP-05: Fix Dropdown/Popup Accessibility (Keyboard + ARIA)

## Status: TODO
## Priority: Medium
## Depends on: IMP-08 (hardcoded ARIA labels should use FM() from the start)
## Agent: frontend-dev

## Problem

3 dropdown/popup components all lack proper keyboard support and ARIA attributes:

### TableActionMenu (`features/components/shared/TableActionMenu.tsx`)
- Trigger button missing `aria-expanded={isOpen}`, `aria-haspopup="menu"`, `aria-label`
- Dropdown container missing `role="menu"`; items missing `role="menuitem"`
- No Escape key handler to close dropdown
- No arrow key navigation between items
- Focus not moved to first item on open

### TableColumnFilter (`features/components/shared/TableColumnFilter.tsx`)
- Trigger missing `aria-expanded={isOpen}`, `aria-haspopup="dialog"`
- Popup `<select>` and `<input>` have no `aria-label` or associated `<label>`
- No Escape key handler
- Focus not moved to first control on open, not returned to trigger on close

### DropdownSection (`NativeButtonShowcase/sections/DropdownSection.tsx`)
- No Escape handler, no arrow key navigation, no focus management

## Solution

For each component:
1. Add `aria-expanded`, `aria-haspopup`, `aria-label` (using `FM()`) to trigger buttons
2. Add `role="menu"` to dropdown containers, `role="menuitem"` to items
3. Add `onKeyDown` handler: Escape closes, ArrowDown/ArrowUp navigates items
4. Move focus to first item on open, return to trigger on close
5. Reference the WAI-ARIA menu pattern used correctly in `MenuNative/components/TopLevelItem.tsx`

## Files to Change

- `src/features/components/shared/TableActionMenu.tsx`
- `src/features/components/shared/TableColumnFilter.tsx`
- `src/features/components/pages/NativeButtonShowcase/sections/DropdownSection.tsx`
- Locale JSON files (for new `FM()` translation keys)

## Benefits

- Screen reader users can understand and operate dropdown menus
- Keyboard-only users can navigate and dismiss popups
- WCAG 2.1 AA compliance for interactive widgets
- Consistent with the existing `MenuNative` component which already implements this correctly

## Linter Enforcement

- Ensure `jsx-a11y/click-events-have-key-events` is enabled (not overridden)
- Consider a custom ESLint rule: any component that manages `isOpen` state + renders a popup must have `aria-expanded` on its trigger
