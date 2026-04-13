# ENT-06: Admin Role Management (Full)

## Status: COMPLETED
## Priority: High
## Depends on: ENT-02

## Problem Statement

The Admin Role Management page was a stub (renders NotImplementedPage). Implemented a full permissions matrix editor with CRUD for custom roles, backed by MockServer endpoints.

## Implementation Plan

### Backend (MockServer)

1. **Core Entity**: `Role` entity with `Name`, `Description`, `IsBuiltIn`, `Permissions` (JSON list)
2. **DTO**: `RoleDto` record
3. **CQRS**: ListRoles, GetRoleById, CreateRole, UpdateRole, DeleteRole
4. **Endpoints**: REST CRUD under `/api/roles`
5. **Seed Data**: Pre-seed Admin, Manager, Viewer, Analyst as built-in roles

### Frontend

1. **Page**: `src/features/admin/pages/RoleManagementPage/index.tsx`
2. **Components**:
   - `RolesTable.tsx` -- DataGrid listing roles
   - `PermissionsMatrix.tsx` -- Roles x permissions checkbox grid
   - `RoleDialog.tsx` -- Create/Edit role dialog
   - `RoleBadge.tsx` -- Built-in/Custom badge
3. **Hooks**: `useRoleManagement.ts` -- API calls via manual fetch (since no orval generation)
4. **Types**: `types.ts` -- Role/Permission interfaces
5. **Constants**: `constants.ts` -- Permission categories
6. **i18n**: Add roleManagement keys to en.json
7. **TestIds**: Add role management test IDs

## Files Created

### Backend
- `MockServer/src/MockServer.Core/Entities/Role.cs`
- `MockServer/src/MockServer.UseCases/DTOs/RoleDto.cs`
- `MockServer/src/MockServer.UseCases/Roles/List/ListRolesQuery.cs`
- `MockServer/src/MockServer.UseCases/Roles/List/ListRolesHandler.cs`
- `MockServer/src/MockServer.UseCases/Roles/GetById/GetRoleByIdQuery.cs`
- `MockServer/src/MockServer.UseCases/Roles/GetById/GetRoleByIdHandler.cs`
- `MockServer/src/MockServer.UseCases/Roles/Create/CreateRoleCommand.cs`
- `MockServer/src/MockServer.UseCases/Roles/Create/CreateRoleHandler.cs`
- `MockServer/src/MockServer.UseCases/Roles/Update/UpdateRoleCommand.cs`
- `MockServer/src/MockServer.UseCases/Roles/Update/UpdateRoleHandler.cs`
- `MockServer/src/MockServer.UseCases/Roles/Delete/DeleteRoleCommand.cs`
- `MockServer/src/MockServer.UseCases/Roles/Delete/DeleteRoleHandler.cs`
- `MockServer/src/MockServer.Web/Roles/List.cs`
- `MockServer/src/MockServer.Web/Roles/GetById.cs`
- `MockServer/src/MockServer.Web/Roles/Create.cs`
- `MockServer/src/MockServer.Web/Roles/Update.cs`
- `MockServer/src/MockServer.Web/Roles/Delete.cs`

### Frontend
- `src/features/admin/pages/RoleManagementPage/types.ts`
- `src/features/admin/pages/RoleManagementPage/constants.ts`
- `src/features/admin/pages/RoleManagementPage/hooks/useRoleManagement.ts`
- `src/features/admin/pages/RoleManagementPage/components/RoleBadge.tsx`
- `src/features/admin/pages/RoleManagementPage/components/RolesTable.tsx`
- `src/features/admin/pages/RoleManagementPage/components/PermissionsMatrix.tsx`
- `src/features/admin/pages/RoleManagementPage/components/RoleDialog.tsx`
- `src/features/admin/pages/RoleManagementPage/index.tsx`

### Modified Files
- `MockServer/src/MockServer.UseCases/Mappers/DtoMapper.cs` -- Added Role ToDto mapping
- `MockServer/src/MockServer.Infrastructure/Data/MockDbContext.cs` -- Added Roles DbSet
- `MockServer/src/MockServer.Infrastructure/Data/SeedData.cs` -- Added GetRoles() seed method
- `src/features/admin/pages/AdminRoleManagementPage.tsx` -- Re-export from RoleManagementPage
- `src/localization/locales/en.json` -- Added roleManagement i18n keys
- `src/shared/testIds.business.ts` -- Added role management test IDs

## Verification Results

- [x] `npm run lint:fix` -- 0 errors, 4 pre-existing warnings (none from our files)
- [x] `npm run build` -- Build succeeds (tsc + vite)
- [x] `dotnet build MockServer.Web.csproj` -- 0 errors, 0 warnings
- [x] Targeted ESLint on all RoleManagement files -- 0 errors, 0 warnings

## Success Criteria

- [x] Permissions matrix displays roles x permissions grid
- [x] Can create custom roles (via RoleDialog with optional clone-from)
- [x] Can edit permissions for custom roles (checkbox toggles with save/discard)
- [x] Built-in roles are read-only (disabled checkboxes)
- [x] Changes persist via MockServer (CRUD endpoints)
- [x] Only visible to Admin role (RBAC gating via useHasPermission)
- [x] lint:fix passes
- [x] Build succeeds
