# ENT-01: Auth Guards + Protected Routes

## Status: COMPLETED
## Priority: Critical
## Agent: frontend-dev

## Problem Statement

The app had no route protection. All routes were publicly accessible without authentication. A login page existed with a mock API call but tokens were not managed properly, there was no auth state, and no route guards.

## Implementation Summary

### Files Created
1. `src/stores/useAuthStore.ts` - Zustand auth store with persist middleware (token, user, isAuthenticated, isLoading, login/logout/checkAuth actions)
2. `src/stores/useAuthStore.test.ts` - 7 unit tests covering login, logout, checkAuth, initial state
3. `src/app/providers/AuthProvider.tsx` - Calls checkAuth on mount to rehydrate from localStorage
4. `src/components/common/components/ProtectedRoute.tsx` - Redirects unauthenticated users to /login
5. `src/components/common/components/PublicRoute.tsx` - Redirects authenticated users to /dashboard
6. `src/components/layout/Header/components/HeaderUserMenu.tsx` - User avatar/name + logout button

### Files Modified
1. `src/lib/api/interceptors/authInterceptor.ts` - Now attaches Bearer token from auth store, handles 401 responses
2. `src/lib/api/interceptors/authInterceptor.test.ts` - Updated tests for new auth behavior (6 tests)
3. `src/lib/api/interceptors/index.ts` - Registers auth response interceptor for 401 handling
4. `src/app/router.tsx` - Root and /login wrapped in PublicRoute, layout wrapped in ProtectedRoute
5. `src/app/App.tsx` - Added AuthProvider wrapper
6. `src/features/auth/pages/LoginPage/hooks/useLoginForm.ts` - Uses auth store instead of manual fetch/localStorage
7. `src/components/layout/Header/index.tsx` - Imports and renders HeaderUserMenu
8. `src/components/common/index.ts` - Exports ProtectedRoute and PublicRoute
9. `src/localization/locales/en.json` - Added auth i18n keys (logout, session expired, user menu)
10. `src/shared/testIds.ts` - Added HEADER_USER_MENU and HEADER_LOGOUT test IDs

### Verification Results
- ESLint: 0 errors, 2 warnings (conflicting enforce-function-style vs no-use-before-define)
- Unit Tests: 86 files, 1266 tests, all passing
- Build: Vite build succeeds cleanly

## Success Criteria
- [x] Visiting any protected route without login redirects to `/login`
- [x] After login, user is redirected to `/dashboard`
- [x] Token persists across page refresh (localStorage via Zustand persist)
- [x] Logout clears token and redirects to `/login`
- [x] 401 API response triggers automatic logout
- [x] Login page redirects to `/dashboard` if already authenticated
