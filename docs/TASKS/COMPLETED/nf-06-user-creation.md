# NF-06: Native User Creation Form

## Status: COMPLETED
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Objective

Wire the existing native Contact Form to create users in the MockServer via the Users Create API. The form already collects name, email, subject, and message -- we map `name` and `email` to `CreateUserRequest` fields and show the created user's details on success.

## Implementation Summary

### Files Modified
1. **`src/features/forms/pages/NativeFormsPage/forms/ContactForm/index.tsx`** -- Added optional `isSubmitting` prop for external loading state
2. **`src/features/forms/pages/NativeFormsPage/index.tsx`** -- Replaced inline ContactForm + FormResult with UserCreationSection
3. **`src/localization/locales/en.json`** -- Added `forms.userCreation.*` localization keys

### Files Created
4. **`src/features/forms/pages/NativeFormsPage/sections/UserCreationSection/index.tsx`** -- New section component

### Key Decisions
- The native ContactForm schema has `name`, `email`, `subject`, `message` (no `phone` field). The task doc mentioned phone but the actual schema doesn't include it. The mapping uses `name` (split into firstName/lastName) and `email`.
- Used `useMemo` for the list params to avoid infinite re-renders from inline objects.
- Used `.catch(() => undefined)` instead of `void` for fire-and-forget invalidation (project ESLint forbids `void`).
- Sub-components (`CreatedUserCard`, `RecentUsersShell`, `RecentUsersTable`) defined before the main `UserCreationSection` to satisfy `no-use-before-define`.
- Used `isValueDefined()` from `@/utils/is` per project convention (custom ESLint rule auto-replaces null checks).

### Field Mapping
```
ContactForm.name -> split(' ') -> firstName (first part), lastName (remaining parts or firstName)
ContactForm.email -> email + username (part before @)
```

## Verification Results

- [x] ESLint: 0 errors on modified files
- [x] TypeScript: 0 errors on modified files
- [x] Unit tests: 43 suites, 773 tests all pass
- [x] Vite build: succeeds
- [x] Files under 300 lines (UserCreationSection: 204 lines)
- [x] Components under 200 lines
- [x] All user-facing text via FM()
- [x] No Syncfusion components -- native HTML + Tailwind only
- [x] No files in src/api/generated/ modified

## Acceptance Criteria

- [x] Contact form creates users via MockServer API
- [x] Created user details shown on success
- [x] Recent users list displayed below
- [x] Query invalidation after creation
- [x] Loading state during mutation
- [x] Error handling for failed requests
- [x] All native HTML, no Syncfusion components
- [x] Files under 300 lines, components under 200 lines
