# ENT-06: Admin Role Management (Full)

## Status: TODO
## Priority: High
## Depends on: ENT-02
## Agent: frontend-dev

## Objective

Replace the stub Admin Role Management page with a full permissions matrix editor — view roles, edit permissions, create custom roles.

## Implementation Plan

### Backend (MockServer additions)

1. **Roles CRUD endpoints**:
   - `GET /api/roles` — list all roles with permissions
   - `GET /api/roles/{id}` — single role
   - `POST /api/roles` — create custom role
   - `PUT /api/roles/{id}` — update role permissions
   - `DELETE /api/roles/{id}` — delete custom role (not built-in)

2. **Seed data**: Pre-seed Admin, Manager, Viewer, Analyst with sensible default permissions

### Frontend

### 1. Page Structure

```
src/features/admin/pages/RoleManagementPage/
├── index.tsx
├── components/
│   ├── RolesTable.tsx           # DataGrid listing roles
│   ├── PermissionsMatrix.tsx    # Grid: roles × permissions checkboxes
│   ├── RoleDialog.tsx           # Create/Edit role
│   └── RoleBadge.tsx
├── hooks/
│   └── useRoleManagement.ts
├── types.ts
└── constants.ts
```

### 2. PermissionsMatrix

- Rows: permission categories (Dashboard, Products, Orders, Users, Settings, Admin)
- Columns: roles (Admin, Manager, Viewer, Analyst, + custom)
- Cells: checkboxes showing granted/denied
- Built-in roles are read-only; custom roles are editable
- "Save Changes" button applies permission updates

### 3. RolesTable

- Columns: Role Name, Description, User Count, Type (Built-in/Custom), Actions
- Actions: Edit Permissions, Delete (custom only)

### 4. RoleDialog

- Name, Description, base permissions (clone from existing role)

## Success Criteria

- [ ] Permissions matrix displays roles × permissions grid
- [ ] Can create custom roles
- [ ] Can edit permissions for custom roles
- [ ] Built-in roles are read-only
- [ ] Changes persist via MockServer
- [ ] Only visible to Admin role
