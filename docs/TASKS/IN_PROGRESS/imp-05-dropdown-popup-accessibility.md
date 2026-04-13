# IMP-05: Fix Dropdown/Popup Accessibility (Keyboard + ARIA)

## Status: IN PROGRESS

## Problem
Three dropdown/popup components lack proper keyboard support and ARIA attributes, failing WAI-ARIA menu pattern compliance.

## Components to Fix

### 1. TableActionMenu (`src/features/components/shared/TableActionMenu.tsx`)
- Missing: `aria-expanded`, `aria-haspopup="menu"`, `aria-label` on trigger
- Missing: `role="menu"` on dropdown, `role="menuitem"` on items
- Missing: Escape key handler, arrow key navigation, focus management

### 2. TableColumnFilter (`src/features/components/shared/TableColumnFilter.tsx`)
- Missing: `aria-expanded`, `aria-haspopup="dialog"` on trigger
- Missing: `aria-label` on `<select>` and `<input>`
- Missing: Escape key handler, focus management on open/close

### 3. DropdownSection (`src/features/components/pages/NativeButtonShowcase/sections/DropdownSection.tsx`)
- Already has: `aria-expanded`, `role="menu"`, `role="menuitem"`
- Missing: Escape handler, arrow key navigation, focus management

## Implementation Plan

1. Add translation keys to `en.json` for aria-labels
2. Fix TableActionMenu with full WAI-ARIA menu pattern
3. Fix TableColumnFilter with dialog pattern
4. Fix DropdownSection with keyboard navigation
5. Run typecheck and tests

## Translation Keys Needed
- `accessibility.moreActionsMenu` - "More actions menu"
- `accessibility.columnFilterDialog` - "Column filter"
- `accessibility.filterOperatorSelect` - "Filter operator"
- `accessibility.filterValueInput` - "Filter value"
- `accessibility.dropdownMenu` - "Dropdown menu"

## Files Modified
- `src/localization/locales/en.json`
- `src/features/components/shared/TableActionMenu.tsx`
- `src/features/components/shared/TableColumnFilter.tsx`
- `src/features/components/pages/NativeButtonShowcase/sections/DropdownSection.tsx`

## Reference
- `src/components/ui/native/MenuNative/components/TopLevelItem.tsx` (WAI-ARIA menu pattern)
- `src/components/ui/native/MenuNative/components/SubMenuItem.tsx` (keyboard navigation)

## Success Criteria
- All three components have proper ARIA attributes
- Escape closes all dropdowns
- Arrow keys navigate menu items
- Focus moves to first item on open, returns to trigger on close
- `npx tsc --noEmit` passes
- `npm test` passes
- Files stay under size limits
