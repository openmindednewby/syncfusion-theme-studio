# ENT-20: Audit Log Wired to API

## Status: COMPLETED
## Priority: Medium
## Completed: 2026-03-04

## Problem Statement

The Activity Log page currently uses hardcoded `SEED_DATA` in the component file. It needs to be wired to real MockServer API endpoints with filtering, pagination, and a stats endpoint for dashboard integration.

## Implementation Plan

### Backend (MockServer)

1. **AuditEntry entity** in Core/Entities:
   - Id, UserId, UserName, Action (enum), EntityType, EntityId, Details, Timestamp, IpAddress

2. **AuditAction enum** in Core/Entities:
   - Created, Updated, Deleted, Viewed, LoggedIn, LoggedOut

3. **AuditEntryDto** in UseCases/DTOs

4. **AuditLogStatsDto** in UseCases/DTOs

5. **ListAuditLog query + handler** in UseCases/AuditLog/List:
   - Supports pagination, filtering by action, entityType, userId, date range

6. **GetAuditLogStats query + handler** in UseCases/AuditLog/Stats

7. **DtoMapper.ToDto** extension for AuditEntry

8. **Endpoints** in Web/AuditLog:
   - GET /api/audit-log (paginated, filterable)
   - GET /api/audit-log/stats

9. **MockDbContext** - add DbSet<AuditEntry>

10. **SeedData** - 110 audit entries spanning 30 days across 10 users

### Frontend

1. **API hook** - Hand-written React Query hook following Orval patterns (useAuditLog, useAuditLogStats)

2. **Updated ActivityLogPage** - Replaced SEED_DATA with useAuditLog hook
   - Server-side filtering by action type and entity type
   - Client-side text search on userName, details, entityId
   - Loading/empty states

3. **Updated ActivityLogGrid** - Matches AuditEntryDto shape with colored action badges (ACTION_BADGE_CLASS map)

4. **Updated ActivityLogFilters** - Action type dropdown (7 options), entity type dropdown (7 options), text search

5. **RecentActivityWidget** - Dashboard card showing 5 most recent audit entries with relative timestamps and action-based icons

6. **i18n** - Added all new keys to en.json (filter labels, column headers, action names, entity names, loading/error/empty states)

### Files Created

**Backend (new files):**
- MockServer.Core/Entities/AuditEntry.cs
- MockServer.Core/Entities/AuditAction.cs
- MockServer.UseCases/DTOs/AuditEntryDto.cs
- MockServer.UseCases/DTOs/AuditLogStatsDto.cs
- MockServer.UseCases/AuditLog/List/ListAuditLogQuery.cs
- MockServer.UseCases/AuditLog/List/ListAuditLogHandler.cs
- MockServer.UseCases/AuditLog/Stats/GetAuditLogStatsQuery.cs
- MockServer.UseCases/AuditLog/Stats/GetAuditLogStatsHandler.cs
- MockServer.Web/AuditLog/List.cs
- MockServer.Web/AuditLog/Stats.cs

**Frontend (new files):**
- src/api/hooks/useAuditLog.ts
- src/features/dashboard/pages/DashboardPage/components/RecentActivityWidget.tsx

### Files Modified

**Backend (modified files):**
- MockServer.Infrastructure/Data/MockDbContext.cs - Added DbSet<AuditEntry>
- MockServer.Infrastructure/Data/SeedData.cs - Added 110 seed audit entries
- MockServer.UseCases/Mappers/DtoMapper.cs - Added ToDto(AuditEntry) mapper

**Frontend (modified files):**
- src/features/activity-log/ActivityLogPage/index.tsx - Replaced static data with API hook
- src/features/activity-log/ActivityLogPage/sections/ActivityLogFilters.tsx - Rewrote with action/entity dropdowns
- src/features/activity-log/ActivityLogPage/sections/ActivityLogGrid.tsx - Updated for AuditEntryDto with colored badges
- src/features/activity-log/ActivityLogPage/sections/index.ts - Updated barrel exports
- src/features/activity-log/ActivityLogPage/index.test.ts - 6 tests for applyLocalSearch
- src/features/activity-log/ActivityLogPage/sections/ActivityLogFilters.test.ts - 4 tests for type guards
- src/features/dashboard/pages/DashboardPage/index.tsx - Replaced hardcoded activity with RecentActivityWidget
- src/features/dashboard/pages/DashboardPage/components/index.ts - Added RecentActivityWidget export
- src/localization/locales/en.json - Added all i18n keys

## Verification Results

### Backend
- `dotnet build MockServer.Web.csproj` - **PASSED** (0 errors, 0 warnings)

### Frontend
- `npx eslint` (all changed files) - **PASSED** (0 errors)
- `npx vitest run src/features/activity-log/` - **PASSED** (10 tests, 2 test files)
- `npx vite build` - **PASSED** (build succeeded)

## Success Criteria

- [x] Activity Log page loads data from MockServer API
- [x] Filters work (action type, entity type, text search)
- [x] Dashboard shows recent activity widget with real data
- [x] MockServer builds successfully (0 errors, 0 warnings)
- [x] Frontend builds and lints successfully (0 errors)
- [x] All unit tests pass (10/10)

## Key Decisions

1. **Hand-written hooks instead of Orval generation**: Since the swagger spec would need to be regenerated from the running MockServer, the hooks were written manually following the exact same patterns as Orval-generated hooks (mockserverInstance mutator, query key factories, response wrapper types).

2. **Client-side search, server-side filtering**: Action type and entity type filters are sent as query params to the API. Text search is applied client-side since it needs to search across multiple fields (userName, details, entityId).

3. **In-memory LINQ filtering in handler**: EF Core InMemory provider does not support complex LINQ translations, so all entries are fetched and filtered in-memory. This is acceptable for a mock server.

4. **Spread pattern for optional AbortSignal**: TypeScript's exactOptionalPropertyTypes required `...(isValueDefined(signal) ? { signal } : {})` instead of `signal: signal` to avoid `undefined` vs `null` type mismatch.

## Notes

- The `useAuditLogFilters` hook mentioned in the original plan was not needed; filter state is managed directly in ActivityLogPage with useState
- testIds.ts was not modified as ACTIVITY_LOG_PAGE, ACTIVITY_LOG_FILTERS, and ACTIVITY_LOG_GRID already existed
- Future enhancements: CSV/Excel export, automatic audit recording middleware, date range filters
