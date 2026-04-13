# BC-IMP-04: Add Focus Trapping to Modal Components for Web Platform

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Problem

12 modal/dialog components use React Native's `<Modal>` with `accessibilityViewIsModal` but have **no keyboard focus trapping**. On native mobile, `<Modal>` handles focus containment natively. On **web** (Expo web export), `<Modal>` does NOT implement focus trapping, making keyboard users able to Tab into background content — violating WCAG 2.4.3.

### Affected components (12)

| # | Component | File |
|---|-----------|------|
| 1 | `ModalShell` | `src/components/Shared/ModalShell.tsx` |
| 2 | `ConfirmDialog` | `src/components/Shared/ConfirmDialog.tsx` |
| 3 | `ApiErrorModal` | `src/components/feedback/ApiErrorModal.tsx` |
| 4 | `PasswordResetModal` | `src/components/Users/PasswordResetModal.tsx` |
| 5 | `TemplateEditorModal` | `src/components/QuestionerTemplates/TemplateEditorModal.tsx` |
| 6 | `MenuEditorModal` | `src/components/OnlineMenus/MenuEditorModal.tsx` |
| 7 | `MenuPreviewModal` | `src/components/OnlineMenus/MenuPreviewModal.tsx` |
| 8 | `PWAInstallPrompt` | `src/pwa/PWAInstallPrompt.tsx` |
| 9 | `IOSAddToHomePrompt` | `src/pwa/IOSAddToHomePrompt.tsx` |
| 10 | `DisplayPreferenceDropdown` | `src/components/Settings/components/DisplayPreferenceDropdown.tsx` |
| 11 | `ImportExportButtons` | `src/components/OnlineMenus/Styling/components/ImportExportButtons.tsx` |
| 12 | `TypographyMenuPicker` | `src/components/OnlineMenus/Styling/components/TypographyMenuPicker.tsx` |

## Solution

**Option A (preferred)**: Add focus trap logic to `ModalShell` (the base modal) so all modals that use it get focus trapping automatically. Most modals likely compose `ModalShell`.

**Option B**: Install `focus-trap-react` and wrap modal content:
```tsx
import { FocusTrap } from 'focus-trap-react';
// wrap modal content with <FocusTrap> on web platform only
```

**Option C**: Create a `useFocusTrap(ref)` hook (Platform.OS === 'web' only):
1. On open: save previously focused element, focus first focusable child
2. On Tab at last focusable: wrap to first focusable
3. On Shift+Tab at first focusable: wrap to last focusable
4. On close: restore focus to previously focused element

## Benefits

- Keyboard users stay within the modal while it's open (web platform)
- WCAG 2.4.3 compliance (Focus Order)
- Prevents accidental interaction with background content while a modal is open
- Native platform behavior is unchanged

## Linter Enforcement

Consider a custom ESLint rule that flags `<Modal>` usage without an accompanying focus trap wrapper (web platform).
