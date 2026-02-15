# CUL-14: Visual QA

## Status: TODO
## Priority: Medium
## Depends on: CUL-11, CUL-12
## Agent: visual-qa

## Objective

Perform visual QA on the Culture settings feature using the Chrome extension browser automation. Verify visual correctness, responsiveness, accessibility, and functional behavior in the running application.

## QA Checklist

### 1. Culture Tab Appearance
- [ ] Globe icon is visible and properly aligned in the tab list
- [ ] Tab label "Culture" is readable and properly styled
- [ ] Tab highlight/active state matches other tabs
- [ ] Tab is responsive (no overflow or clipping on smaller screens)

### 2. CultureSection Layout
- [ ] Section header (icon + title + description) matches other sections' style
- [ ] Sub-editors are properly spaced and aligned
- [ ] Preview component is visually distinct from editors
- [ ] No horizontal overflow on any viewport width

### 3. CultureModeEditor
- [ ] Auto/Manual toggle is visually clear
- [ ] Active state is obvious (highlighted, different color, etc.)
- [ ] Locale dropdown animates in/out smoothly when toggling modes
- [ ] Locale dropdown shows readable locale names with tags

### 4. DateFormatEditor
- [ ] Dropdown opens/closes cleanly
- [ ] Example dates are visible and correctly formatted for each option
- [ ] Custom format input appears/disappears smoothly
- [ ] Input has proper placeholder text

### 5. TimeFormatEditor
- [ ] Three options are clearly distinguishable
- [ ] ShowSeconds checkbox is properly aligned
- [ ] Example times update correctly

### 6. FirstDayOfWeekEditor
- [ ] Dropdown has all 4 options
- [ ] Labels are readable

### 7. CulturePreview
- [ ] Preview updates in real-time (no noticeable delay)
- [ ] Date, Time, and Date & Time rows are clearly labeled
- [ ] Preview formatting is correct for the selected culture
- [ ] Preview is visually bounded (card or bordered container)

### 8. Cross-Culture Verification
Test with multiple cultures and verify:

| Culture | Date looks correct? | Calendar shows localized names? | RTL handled? |
|---------|--------------------|---------------------------------|-------------|
| en-US | | | N/A |
| en-GB | | | N/A |
| de | | | N/A |
| fr | | | N/A |
| ja | | | N/A |
| ar | | | Check |

**Arabic (ar) special attention**: If the app supports RTL, verify that the Culture section layout doesn't break. If RTL is not supported, just verify the date/time formatting works.

### 9. Console & Network Checks
- [ ] No JavaScript errors in console when switching cultures
- [ ] No 404s for CLDR data files
- [ ] CLDR files load only when a new culture is selected (check network tab)
- [ ] No duplicate CLDR requests when switching back and forth

### 10. Accessibility Spot Check
- [ ] All form controls have visible labels
- [ ] Tab navigation works through all editors
- [ ] Focus indicators are visible
- [ ] Screen reader announcements make sense (check aria attributes)

### 11. Responsiveness
- [ ] Settings drawer at default width: everything fits
- [ ] Browser window at 1024px: no overflow
- [ ] Browser window at 768px: still usable (if drawer is responsive)

### 12. Integration with Other Features
- [ ] Changing culture doesn't break other Settings tabs
- [ ] Switching back to Auto mode restores browser default formatting
- [ ] Theme preset switching preserves culture as DEFAULT_CULTURE
- [ ] Export/import of theme config includes culture settings

## Expected Output

Return one of:
- **QA_PASSED** — all visual checks pass
- **QA_FAILED** — with screenshots/evidence and delegation to the appropriate agent for fixes

## Notes

- Take screenshots of key states (Auto mode, Manual + German, preview with different formats)
- If visual issues are found, describe them precisely with coordinates/elements
- If functional issues are found, delegate to `frontend-dev` with reproduction steps
