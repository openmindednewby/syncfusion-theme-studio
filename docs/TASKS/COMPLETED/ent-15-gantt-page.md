# ENT-15: Gantt Chart Page

## Status: COMPLETED
## Priority: Low
## Agent: frontend-dev

## Problem Statement

Add a Gantt chart page for project timeline visualization using Syncfusion's Gantt component. This requires both backend (MockServer) and frontend work.

## Implementation Summary

### Backend (MockServer) — Completed by previous agent
- Entity: `GanttTask` in Core/Entities
- DTO: `GanttTaskDto` in UseCases/DTOs
- Mapper: `ToDto(GanttTask)` in DtoMapper
- UseCases: CRUD operations (List, Create, Update, Delete)
- Endpoints: FastEndpoints in Web/GanttTasks (GET, POST, PUT, DELETE at /api/gantt/tasks)
- Seed Data: 18 tasks with hierarchy, dependencies, varied progress
- DbContext: `DbSet<GanttTask>` added

### Frontend (SyncfusionThemeStudio) — Completed
1. Installed `@syncfusion/ej2-react-gantt@^32.2.3`
2. Created feature structure:
   - `src/features/gantt/types.ts` — GanttTaskItem interface
   - `src/features/gantt/ganttPriority.ts` — GanttPriority const enum
   - `src/features/gantt/constants.ts` — Priority options, colors, API base
   - `src/features/gantt/pages/GanttPage/index.tsx` — Main page component
   - `src/features/gantt/pages/GanttPage/components/GanttView.tsx` — Syncfusion Gantt wrapper
   - `src/features/gantt/pages/GanttPage/components/GanttToolbar.tsx` — Priority filter toolbar
   - `src/features/gantt/pages/GanttPage/hooks/useGanttTasks.ts` — TanStack Query hook
3. Route: Added `gantt` to RouteSegment, RoutePath, RoutePrefix
4. Lazy page: Added to lazyPages.ts
5. Router: Added route to router.tsx
6. Sidebar: Added Gantt entry between Kanban and Editor
7. Permission: Added ViewGantt, ManageGantt to Permission enum and rolePermissions
8. TestIds: Added GANTT_PAGE, GANTT_CHART, GANTT_TOOLBAR, GANTT_FILTER_ALL, NAV_GANTT
9. i18n: Added gantt translations to en.json
10. Breadcrumbs: Added gantt segment label
11. IconName + iconMap: Added Gantt icon (mapped to BarChart)

## Verification Results

- TypeScript compilation: PASSED (no errors, excluding pre-existing ChatPage import)
- ESLint: PASSED (gantt files + all modified files clean)
- MockServer build: PASSED (0 errors, 0 warnings)
- Vite build: FAILED (pre-existing PWA workbox error for syncfusion-grid chunk at 5.22 MB — not caused by gantt changes)

## Files Created
- `src/features/gantt/types.ts`
- `src/features/gantt/ganttPriority.ts`
- `src/features/gantt/constants.ts`
- `src/features/gantt/pages/GanttPage/index.tsx`
- `src/features/gantt/pages/GanttPage/components/GanttView.tsx`
- `src/features/gantt/pages/GanttPage/components/GanttToolbar.tsx`
- `src/features/gantt/pages/GanttPage/hooks/useGanttTasks.ts`

## Files Modified
- `src/app/routes/routeSegment.ts` — Added Gantt segment
- `src/app/routes/routePath.ts` — Added /gantt path
- `src/app/routes/routePrefix.ts` — Added /gantt prefix
- `src/app/routes/lazyPages.ts` — Added GanttPage lazy import
- `src/app/router.tsx` — Added Gantt route
- `src/components/layout/Sidebar/sidebarNavData.ts` — Added Gantt nav item
- `src/components/layout/Sidebar/utils/iconName.ts` — Added Gantt icon name
- `src/components/layout/Sidebar/utils/iconMap.ts` — Added Gantt icon mapping
- `src/components/layout/Header/hooks/useHeaderBreadcrumbs.tsx` — Added gantt breadcrumb
- `src/shared/testIds.ts` — Added Gantt test IDs
- `src/shared/permissions/utils/Permission.ts` — Added ViewGantt, ManageGantt
- `src/shared/permissions/utils/rolePermissions.ts` — Added permissions to all roles
- `src/localization/locales/en.json` — Added gantt translations + sidebar label
- `package.json` — Added @syncfusion/ej2-react-gantt dependency
