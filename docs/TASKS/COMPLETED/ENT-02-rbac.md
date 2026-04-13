# ENT-02: RBAC (Role-Based Access Control)

## Status: COMPLETED
## Priority: Critical
## Depends on: ENT-01 (completed)

## Problem Statement

Implement role-based access control so different user roles (Admin, Manager, Viewer, Analyst) see different navigation items and have different permissions. This is the foundation for future Admin User/Role management pages.

## Changes Made

### Backend (MockServer)

1. **User entity** (`MockServer.Core/Entities/User.cs`): Added `PasswordHash` and `Role` fields
2. **Login endpoint** (`MockServer.Web/Auth/Login.cs`): Now looks up users by email in the database, validates password, and returns role-specific data with proper user info (instead of hardcoded "Demo User")
3. **Permissions endpoint** (`MockServer.Web/Auth/Permissions.cs`): New `GET /api/auth/permissions` endpoint returning the full role-to-permission mapping
4. **Seed data** (`MockServer.Infrastructure/Data/SeedData.cs`): Added 4 demo users for RBAC testing:
   - `demo@example.com` / `demo123` -- Admin (backwards compatible)
   - `admin@example.com` / `admin123` -- Admin
   - `manager@example.com` / `manager123` -- Manager
   - `viewer@example.com` / `viewer123` -- Viewer
   - All 20 existing users now have `PasswordHash` and `Role` fields

### Frontend

1. **Permission enum** (`src/shared/permissions/utils/Permission.ts`): 22 granular permissions
2. **Role enum** (`src/shared/permissions/utils/Role.ts`): Admin, Manager, Viewer, Analyst
3. **Role-permission mapping** (`src/shared/permissions/utils/rolePermissions.ts`): Maps each role to its allowed permissions
4. **Auth store** (`src/stores/useAuthStore.ts`): Added `permissions` array to state, derived from role on login and rehydration. Storage version bumped to 2.
5. **Permission hooks** (`src/shared/hooks/`):
   - `useHasPermission(permission)` -- returns boolean
   - `useHasRole(role)` -- returns boolean
6. **IfPermission component** (`src/components/common/components/IfPermission.tsx`): Conditionally renders children based on permission
7. **Enhanced ProtectedRoute** (`src/components/common/components/ProtectedRoute.tsx`): Accepts optional `requiredPermission` and `requiredRole` props; redirects to 403 when missing
8. **Sidebar filtering** (`src/components/layout/Sidebar/`):
   - Added `requiredPermission` field to nav item interfaces
   - Each nav item now specifies its required permission
   - `SidebarMainNav` and `SidebarBottomItems` pass user permissions to filter functions
   - `sidebarFilterUtils.ts` filters items by both search query and permissions
9. **Login page** (`src/features/auth/pages/LoginPage/`):
   - New `LoginDemoCredentials` component shows quick-login buttons for Admin, Manager, Viewer
   - `useLoginForm` hook exposes `setCredentials` to pre-fill form fields
10. **Header user menu** (`src/components/layout/Header/components/HeaderUserMenu.tsx`): Now displays user role below their name
11. **i18n** (`src/localization/locales/en.json`): Added `login.demoAccountsLabel`, `login.useCredentials`, `login.role.admin/manager/viewer/analyst` keys
12. **Test IDs** (`src/shared/testIds.ts`): Added `LOGIN_DEMO_CREDENTIALS`

## Verification Results

- [x] MockServer builds: `dotnet build` -- 0 errors, 0 warnings
- [x] MockServer tests: `dotnet test` -- 27 passed
- [x] Frontend TypeScript: `tsc --noEmit` -- 0 errors
- [x] Frontend lint: `eslint` -- 0 errors, 0 warnings on changed files
- [x] Frontend tests: `vitest run` -- 1285 passed across 88 files
- [x] Frontend build: `npm run build` -- successful

## Success Criteria

- [x] Admin sees all menu items; Viewer sees subset
- [x] Navigating to admin-only route as Viewer shows 403
- [x] Role persists in auth store across refresh (via checkAuth rehydration)
- [x] Login page shows demo credentials for each role
- [x] Sidebar dynamically filters based on role
- [x] All code passes lint, build, and tests
