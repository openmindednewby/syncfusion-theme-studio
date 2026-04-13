# ENT-05: Admin User Management (Full)

## Status: TODO
## Priority: High
## Depends on: ENT-02
## Agent: frontend-dev

## Objective

Replace the stub Admin User Management page with a full-featured user management interface — CRUD grid, role assignment, status toggling, search, and bulk actions.

## Existing Backend

Full CRUD at `/api/users` — List (paginated), Get, Search, Create, Update, Delete.

## Implementation Plan

### 1. Page Structure

```
src/features/admin/pages/UserManagementPage/
├── index.tsx
├── components/
│   ├── UsersTable.tsx          # Syncfusion DataGrid
│   ├── UsersToolbar.tsx        # Search, filters, bulk actions, add button
│   ├── UserDialog.tsx          # Create/Edit user dialog
│   ├── UserDetailPanel.tsx     # Side panel with full user details
│   ├── UserStatusBadge.tsx     # Active/Inactive/Suspended
│   └── UserRoleBadge.tsx       # Role badge with color
├── hooks/
│   └── useUserManagement.ts
├── types.ts
└── constants.ts
```

### 2. UsersTable

- Columns: Avatar, Name, Email, Role, Status, Last Active, Actions
- Features: Server-side paging, sorting, filtering, column resize, column chooser
- Row selection (checkbox) for bulk actions
- Inline status toggle
- Row actions: Edit, View Details, Deactivate, Delete

### 3. UserDialog

- Create/Edit form:
  - First Name, Last Name, Email, Phone
  - Role dropdown (Admin, Manager, Viewer, Analyst)
  - Status toggle (Active/Inactive)
  - Avatar upload (mock)
- React Hook Form + Zod schema
- i18n for all labels and validation messages

### 4. Bulk Actions

- Select multiple users → toolbar actions: Deactivate, Change Role, Delete
- Confirmation dialog for destructive actions

### 5. UserDetailPanel

- Slide-out panel (or dialog) showing full user profile
- Activity history, role history (mock data)

## Success Criteria

- [ ] Full CRUD for users via DataGrid + Dialog
- [ ] Role assignment works and updates immediately
- [ ] Bulk selection and bulk actions functional
- [ ] Search filters users in real-time
- [ ] Accessible: all interactive elements have testID + a11y labels
- [ ] Only visible to Admin role (RBAC gated)
