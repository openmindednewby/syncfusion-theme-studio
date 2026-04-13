# NF-05: Native User Lookup Form

## Status: COMPLETED
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Objective

Wire the existing Login Form to the MockServer Users Search API. Instead of a static form, the login form will search for users by email and display the found user's details -- showcasing how a native HTML form connects to a read API.

## Current State

- `src/features/forms/pages/NativeFormsPage/forms/LoginForm/` -- existing form
- Schema: `email`, `password`, `rememberMe`
- On submit: stores in local state with password masked

## Target State

1. **Form searches users by email** via `useMockServerWebUsersSearch({ q: email })`
2. **Display found user details** below the form (name, email, phone, username)
3. **Show "user not found"** if no results
4. **Loading state** during search
5. **Keep password field** for visual completeness (not sent to API -- it's a showcase)

## Implementation Steps

### 1. Create User Lookup Section Component
**File**: `src/features/forms/pages/NativeFormsPage/sections/UserLookupSection/index.tsx` (new)
- Wraps existing LoginForm + search results display
- Uses `useMockServerWebUsersSearch` (enabled only when search is triggered)
- On form submit: set search query to email value
- Display found user as a card/details view (native HTML)
- Show "not found" if empty results

### 2. Minimal LoginForm Changes
**File**: `src/features/forms/pages/NativeFormsPage/forms/LoginForm/index.tsx`
- Accept `isSearching` prop for loading state on submit button
- Accept `submitLabel` prop for overriding button text
- No other changes needed -- the form itself stays the same

### 3. User Details Display
- Show as a simple card with native HTML: `<div>`, `<dl>`, `<dt>`, `<dd>`
- Fields: First Name, Last Name, Email, Phone, Username
- Styled with Tailwind (no Syncfusion components)

### 4. NativeFormsPage Changes
- Replaced direct LoginForm + FormResult rendering with UserLookupSection
- Removed login state management (handleLoginSubmit, PASSWORD_MASK, login results)
- Wrapped UserLookupSection in FormSection for consistent layout

### 5. Localization Keys Added
- `forms.native.userFound` - "User Found"
- `forms.native.userNotFound` - "No user found matching that email address."
- `forms.native.searching` - "Searching..."
- `forms.actions.searchUser` - "Search User"
- `common.firstName` - "First Name"
- `common.lastName` - "Last Name"
- `common.phone` - "Phone"
- `common.username` - "Username"

## Files Modified

| File | Action | Description |
|------|--------|-------------|
| `src/features/forms/pages/NativeFormsPage/sections/UserLookupSection/index.tsx` | NEW | Section wrapping LoginForm + user search API |
| `src/features/forms/pages/NativeFormsPage/forms/LoginForm/index.tsx` | MODIFIED | Added `isSearching` and `submitLabel` optional props |
| `src/features/forms/pages/NativeFormsPage/index.tsx` | MODIFIED | Replaced LoginForm with UserLookupSection |
| `src/localization/locales/en.json` | MODIFIED | Added 8 new localization keys |

## Verification Results

- Lint: 0 errors, 2 warnings (inline objects to hook -- same as existing sections)
- TypeScript: 0 errors in modified files (pre-existing errors in other files)
- Build: Vite build succeeds
- Tests: 773 passed, 0 failed (43 test files)
- File sizes: UserLookupSection 95 lines, LoginForm 67 lines, NativeFormsPage 92 lines

## Acceptance Criteria

- [x] Login form searches users by email via MockServer API
- [x] Found user details displayed below form
- [x] "User not found" message when no results
- [x] Loading state during search
- [x] Password field preserved for visual showcase (not sent to API)
- [x] All native HTML, no Syncfusion components
- [x] Files under 300 lines, components under 200 lines
