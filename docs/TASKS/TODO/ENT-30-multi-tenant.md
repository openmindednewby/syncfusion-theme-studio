# ENT-30: Multi-Tenant Org Switcher

## Status: TODO
## Priority: Low
## Depends on: ENT-02
## Agent: frontend-dev + backend-dev

## Objective

Add multi-tenant organization switching — users can belong to multiple organizations and switch between them. This is a key enterprise SaaS pattern.

## Implementation Plan

### Backend (MockServer)

1. **Organization entity**: Id, Name, Slug, Logo, Plan (Free/Pro/Enterprise), MemberCount
2. **Endpoints**:
   - `GET /api/organizations` — list user's organizations
   - `GET /api/organizations/{id}` — org details
   - `POST /api/organizations/{id}/switch` — switch active org (updates context)
3. **Seed data**: 2-3 orgs per demo user ("Acme Corp", "Globex Inc", "Initech")

### Frontend

### 1. Component Structure

```
src/features/multi-tenant/
├── components/
│   ├── OrgSwitcher.tsx           # Dropdown in header/sidebar
│   ├── OrgSwitcherMenu.tsx       # Dropdown menu with org list
│   ├── OrgAvatar.tsx             # Org logo/initials
│   └── OrgBadge.tsx              # Current org indicator
├── hooks/
│   ├── useOrganizations.ts       # Fetch user's orgs
│   └── useCurrentOrg.ts          # Current active org
├── stores/
│   └── useOrgStore.ts            # Active org state (Zustand + localStorage)
├── types.ts
└── constants.ts
```

### 2. Features

- Org switcher dropdown in the sidebar header (above nav items)
- Shows: org avatar, org name, plan badge
- Dropdown lists all orgs with checkmark on active
- Switching org: updates store, re-fetches relevant data, shows transition
- Org name/logo visible in header
- URL doesn't change (org is context, not route)

### 3. Data Scoping

- When org changes, all data queries should theoretically be scoped
- MockServer can return different seed data per org (or same data — it's a demo)
- Dashboard stats, user list, etc. could show different numbers per org

## Success Criteria

- [ ] Org switcher visible in sidebar
- [ ] Can switch between 2-3 orgs
- [ ] Active org persists across refresh
- [ ] Org name/logo displayed in sidebar header
- [ ] Switching orgs triggers data refresh
- [ ] Theme-aware
