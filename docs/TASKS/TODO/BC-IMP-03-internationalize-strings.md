# BC-IMP-03: Internationalize Hardcoded English Strings with t()

## Status: TODO
## Priority: High
## Depends on: None
## Agent: frontend-dev

## Problem

~65+ instances of hardcoded English strings in `accessibilityLabel`, `aria-label`, and `placeholder` attributes that should use the `t()` translation function.

### Hardcoded `accessibilityLabel` strings (~50+ across ~25 files)

| Area | Files | Examples |
|------|-------|---------|
| Users | `UserListItem.tsx`, `PasswordResetModal.tsx`, `TenantSelector.tsx` | "Edit user", "Reset password", "Delete user", "New password" |
| Content | `ContentPreview.tsx`, `UploadProgress.tsx` | "Delete content", "Cancel upload" |
| Templates | `TemplateForm.tsx`, `TemplateJsonEditor.tsx`, `SkipConditions.tsx`, `AnswerEditor.tsx`, `QuestionEditor.tsx`, `OptionEditor.tsx` | "Text input field" (x10+), "Active status" |
| Menus | `GlobalStylingControls.tsx`, `FullMenuEditor.tsx`, `MenuContentEditor.tsx`, `MenuItemEditor.tsx`, `MetadataTab.tsx`, `CategoryEditor.tsx`, `MenuHeader.tsx` | "Background color input", "Menu item price input", "Add category" |
| Shared | `PageSkeleton.tsx`, `LoadingFallback.tsx` | "Loading page content", "Loading content" |
| Notifications | `RealTimeToastContainer.tsx`, `NotificationPermissionBanner.tsx`, `NotificationBellButton.tsx` | "Dismiss", "Enable notifications" |
| Settings | `DisplayPreferenceDropdown.tsx` | "Close dropdown" |
| Topbar | `Topbar.tsx`, `MobileTopbar.tsx` | "Tag Heuer" |
| Forms | `DynamicForm/TextQuestion.tsx` | "Text input field" |
| Styling | `TypographyMenuPicker.tsx` | "Search options" |

### Hardcoded `placeholder` strings (~16 instances)

| File | Examples |
|------|---------|
| `UserFormFields.tsx` | "Enter username", "John", "Doe", "Enter password" |
| `PasswordResetModal.tsx` | "Enter new password" |
| Showcase forms | "Enter your name", "Enter your email", etc. |

## Solution

1. Add translation keys to locale JSON files grouped logically:
   - `common.loading`, `common.dismiss`, `common.cancel`
   - `users.actions.*`, `content.actions.*`
   - `forms.placeholders.*`
   - `menus.editor.*`
2. Replace each hardcoded string with `t('...')` call
3. Verify all keys exist in the locale files

## Benefits

- i18n-ready — the app can be localized without code changes
- Consistent with the existing `t()` pattern used elsewhere in the codebase
- Accessibility improvement — screen readers in non-English locales get translated labels

## Linter Enforcement

Add `eslint-plugin-i18next` with `no-literal-string` rule configured for JSX attributes:
- Flag string literals in `accessibilityLabel`, `accessibilityHint`, `aria-label`, `placeholder`, `title`
- Exclude `testID`, `className`, `type`, `role`, `style`
