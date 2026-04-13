# ENT-02: RBAC — Role-Based Access Control

## Status: COMPLETED (see COMPLETED/ENT-02-rbac.md)
## Priority: Critical
## Depends on: ENT-01
## Agent: frontend-dev + backend-dev

## Objective

Implement role-based access control so different user roles see different navigation items and have different permissions. This is the foundation for the Admin User/Role management pages.

## Implementation Plan

### Backend (MockServer)

1. **Roles enum**: Define roles — `Admin`, `Manager`, `Viewer`, `Analyst`
2. **Update User entity**: Add `Role` field to User model
3. **Update Login endpoint**: Return role in the mock JWT payload / response
4. **Seed data**: Create demo users for each role:
   - `admin@example.com` / `admin123` → Admin (full access)
   - `manager@example.com` / `manager123` → Manager (CRUD, no admin)
   - `viewer@example.com` / `viewer123` → Viewer (read-only)
   - `demo@example.com` / `demo123` → Admin (backwards compatible)
5. **Permissions matrix endpoint**: `GET /api/auth/permissions` — returns role→permission mapping

### Frontend

1. **Permission types**: Create `src/shared/types/permissions.ts`
   - `const enum Role { Admin, Manager, Viewer, Analyst }`
   - `const enum Permission { ViewDashboard, ManageUsers, ManageRoles, EditProducts, ViewProducts, ManageSettings, ... }`
   - Role→Permission mapping

2. **Update Auth Store**: Add `role` and `permissions` to auth state

3. **Permission hooks**:
   - `useHasPermission(permission: Permission): boolean`
   - `useHasRole(role: Role): boolean`
   - `useRequirePermission(permission: Permission)` — redirects if missing

4. **ProtectedRoute enhancement**: Accept optional `requiredPermission` or `requiredRole` prop
   - No permission → 403 Forbidden page

5. **Sidebar filtering**: Hide nav items user doesn't have permission for

6. **UI permission gating**: `<IfPermission permission={Permission.ManageUsers}>` wrapper component

7. **Login page**: Add role selector or show demo credentials for each role

## Success Criteria

- [ ] Admin sees all menu items; Viewer sees subset
- [ ] Navigating to admin-only route as Viewer shows 403
- [ ] Role persists in auth store across refresh
- [ ] Login page shows demo credentials for each role
- [ ] Sidebar dynamically filters based on role
