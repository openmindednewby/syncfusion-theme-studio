# ENT-30: Multi-Tenant Org Switcher

## Status: COMPLETED
## Agent: frontend-dev

## Problem Statement

Add multi-tenant organization switching so users can belong to multiple organizations and switch between them.

## Changes Made

### Backend (MockServer)

1. Added `Organization` entity (`MockServer.Core/Entities/Organization.cs`)
2. Added `OrganizationDto` record (`MockServer.UseCases/DTOs/OrganizationDto.cs`)
3. Added `DtoMapper.ToDto(Organization)` mapping
4. Added `DbSet<Organization>` to `MockDbContext`
5. Seeded 3 orgs: Acme Corp (Enterprise, 150), Globex Inc (Pro, 45), Initech (Free, 12)
6. Created `ListOrganizationsQuery` + `ListOrganizationsHandler`
7. Created `GetOrganizationByIdQuery` + `GetOrganizationByIdHandler`
8. Created 3 FastEndpoints: GET /organizations, GET /organizations/{id}, POST /organizations/{id}/switch

### Frontend

1. Created `src/features/multi-tenant/` feature directory with full structure
2. Types: `Organization` interface
3. Constants: API URL, query key, store key, default org ID
4. Zustand store: `useOrgStore` with persist + devtools middleware
5. Hooks: `useOrganizations` (React Query), `useCurrentOrg` (auto-select + switch + invalidate)
6. Components: `OrgAvatar`, `OrgBadge`, `OrgSwitcherMenu`, `OrgSwitcher`
7. Integrated `OrgSwitcher` into `SidebarHeader`
8. Added i18n keys under `orgSwitcher.*` in `en.json`
9. Added test IDs to `testIds.sidebar.ts`

### Additional Frontend Work (2026-03-04)

1. **Lint fixes**: Added missing `isValueDefined` imports to OrgSwitcher.tsx, OrgBadge.tsx, useCurrentOrg.ts
2. **OrgBadge refactor**: Extracted `PLAN_KEY_MAP` constant out of function scope (enforce-function-style rule)
3. **Test IDs restructure**:
   - Created `src/shared/testIds.org.ts` (ORG_SWITCHER, ORG_SWITCHER_BUTTON, ORG_SWITCHER_MENU, ORG_SWITCHER_ITEM, ORG_AVATAR, ORG_BADGE)
   - Created `src/shared/testIds.features.ts` (AI, PWA, Export, Diagram, Spreadsheet, PDF IDs) to keep testIds.ts under 200-line limit
4. **i18n**: Added orgSwitcher keys to de.json, es.json, he.json
5. **Sidebar integration**: Added OrgSwitcher between SidebarHeader and SidebarSearch
6. **Seed data**: Updated to match requirements (Acme=Enterprise/150, Globex=Pro/45, Initech=Free/12)
7. **Unit test**: Created useOrgStore.test.ts (4 tests: initial state, setActiveOrg, switching, shared state)

## Verification

- [x] `dotnet build` - passes (0 errors)
- [x] ESLint lint - passes on all changed files (0 errors)
- [x] TypeScript - 0 errors (`tsc --noEmit` clean)
- [x] Unit tests - 91 files, 1306 tests all passing
- [x] Vite compilation - succeeds (pre-existing PWA workbox limit issue unrelated)

## Notes

- ESLint full run OOMs - this is a known project issue; targeted lint on changed files passes
