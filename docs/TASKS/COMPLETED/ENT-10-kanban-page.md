# ENT-10: Kanban Board Page

## Status: COMPLETED
## Priority: Medium
## Depends on: None
## Agent: frontend-dev + backend-dev
## Completed: 2026-03-04

## Objective

Add a Kanban board page for project/task management using Syncfusion's Kanban component. This is a staple of enterprise dashboards (Jira-style).

## Syncfusion Package

- `@syncfusion/ej2-react-kanban`

## Implementation Summary

### Backend (MockServer) - DONE

1. **Entity**: `MockServer.Core.Entities.KanbanTask` with Id, Title, Summary, Status, Priority, Assignee, Tags, Color, CreatedAt, DueDate
2. **DTO**: `MockServer.UseCases.DTOs.KanbanTaskDto` record
3. **Use Cases** (MediatR CQRS pattern):
   - `ListKanbanTasksQuery` / `ListKanbanTasksHandler`
   - `CreateKanbanTaskCommand` / `CreateKanbanTaskHandler`
   - `UpdateKanbanTaskCommand` / `UpdateKanbanTaskHandler`
   - `DeleteKanbanTaskCommand` / `DeleteKanbanTaskHandler`
4. **FastEndpoints**:
   - `GET /api/kanban/tasks` (List)
   - `GET /api/kanban/tasks/{id}` (GetById)
   - `POST /api/kanban/tasks` (Create)
   - `PUT /api/kanban/tasks/{id}` (Update)
   - `DELETE /api/kanban/tasks/{id}` (Delete)
5. **DtoMapper**: Added `ToDto(KanbanTask)` extension method
6. **MockDbContext**: Added `DbSet<KanbanTask> KanbanTasks`
7. **SeedData**: 22 tasks across all 4 columns, 5 assignees, varied priorities and tags

### Frontend (SyncfusionThemeStudio) - DONE

1. **Feature structure**: `src/features/kanban/` with proper module organization
2. **Enums** (separate files per code standards):
   - `kanbanStatus.ts` - Backlog, InProgress, Review, Done
   - `kanbanPriority.ts` - Low, Normal, High, Critical
3. **Types**: `types.ts` - KanbanTaskItem interface
4. **Constants**: `constants.ts` - KANBAN_COLUMNS, WIP_LIMITS, PRIORITY_OPTIONS, STATUS_OPTIONS, PRIORITY_COLORS, KANBAN_API_BASE
5. **Hook**: `hooks/useKanbanTasks.ts` - React Query CRUD operations with cache invalidation
6. **Components**:
   - `KanbanBoard.tsx` - Syncfusion KanbanComponent with drag-and-drop, WIP limits, search filtering
   - `TaskCard.tsx` - Custom card template with title, assignee avatar, priority badge, tags, due date
   - `TaskDialog.tsx` - Create/edit form with all fields
   - `KanbanToolbar.tsx` - Search input + Add Task button
   - `PriorityBadge.tsx` - Color-coded priority indicator
7. **Routing**: Added RouteSegment.Kanban, RoutePath.Kanban, RoutePrefix.Kanban, lazy page import, router entry
8. **Sidebar**: Added kanban nav item with IconName.Kanban mapped to IconClipboard
9. **i18n**: Full `kanban.*` key set in en.json
10. **TestIds**: KANBAN_PAGE, KANBAN_BOARD, KANBAN_SEARCH, KANBAN_ADD_BTN, KANBAN_DIALOG, KANBAN_SAVE_BTN, NAV_KANBAN

## Verification Results

- `dotnet build MockServer.Web.csproj` - 0 warnings, 0 errors
- `npx eslint "src/features/kanban/"` - 0 errors, 0 warnings
- `npx tsc --noEmit` - 0 kanban-related errors
- `npm run build` - Build succeeded (tsc-b + vite build + PWA)

## Success Criteria

- [x] Kanban board with 4 columns renders
- [x] Drag-and-drop moves cards and updates API
- [x] Custom card template with priority, assignee, tags
- [x] Create/edit/delete tasks via dialog
- [x] WIP limits show visual warning
- [x] Respects dark/light theme

## Files Created/Modified

### New Backend Files
- `MockServer/src/MockServer.Core/Entities/KanbanTask.cs`
- `MockServer/src/MockServer.UseCases/DTOs/KanbanTaskDto.cs`
- `MockServer/src/MockServer.UseCases/KanbanTasks/List/ListKanbanTasksQuery.cs`
- `MockServer/src/MockServer.UseCases/KanbanTasks/List/ListKanbanTasksHandler.cs`
- `MockServer/src/MockServer.UseCases/KanbanTasks/Create/CreateKanbanTaskCommand.cs`
- `MockServer/src/MockServer.UseCases/KanbanTasks/Create/CreateKanbanTaskHandler.cs`
- `MockServer/src/MockServer.UseCases/KanbanTasks/Update/UpdateKanbanTaskCommand.cs`
- `MockServer/src/MockServer.UseCases/KanbanTasks/Update/UpdateKanbanTaskHandler.cs`
- `MockServer/src/MockServer.UseCases/KanbanTasks/Delete/DeleteKanbanTaskCommand.cs`
- `MockServer/src/MockServer.UseCases/KanbanTasks/Delete/DeleteKanbanTaskHandler.cs`
- `MockServer/src/MockServer.Web/KanbanTasks/List.cs`
- `MockServer/src/MockServer.Web/KanbanTasks/Create.cs`
- `MockServer/src/MockServer.Web/KanbanTasks/GetById.cs`
- `MockServer/src/MockServer.Web/KanbanTasks/Update.cs`
- `MockServer/src/MockServer.Web/KanbanTasks/Delete.cs`

### Modified Backend Files
- `MockServer/src/MockServer.UseCases/Mappers/DtoMapper.cs` - Added ToDto(KanbanTask)
- `MockServer/src/MockServer.Infrastructure/Data/MockDbContext.cs` - Added KanbanTasks DbSet
- `MockServer/src/MockServer.Infrastructure/Data/SeedData.cs` - Added 22 kanban tasks

### New Frontend Files
- `src/features/kanban/kanbanStatus.ts`
- `src/features/kanban/kanbanPriority.ts`
- `src/features/kanban/types.ts`
- `src/features/kanban/constants.ts`
- `src/features/kanban/pages/KanbanPage/index.tsx`
- `src/features/kanban/pages/KanbanPage/hooks/useKanbanTasks.ts`
- `src/features/kanban/pages/KanbanPage/components/KanbanBoard.tsx`
- `src/features/kanban/pages/KanbanPage/components/TaskCard.tsx`
- `src/features/kanban/pages/KanbanPage/components/TaskDialog.tsx`
- `src/features/kanban/pages/KanbanPage/components/KanbanToolbar.tsx`
- `src/features/kanban/pages/KanbanPage/components/PriorityBadge.tsx`

### Modified Frontend Files
- `src/app/routes/routeSegment.ts` - Added Kanban
- `src/app/routes/routePath.ts` - Added Kanban
- `src/app/routes/routePrefix.ts` - Added Kanban
- `src/app/routes/lazyPages.ts` - Added KanbanPage lazy import
- `src/app/router.tsx` - Added kanban route
- `src/components/layout/Sidebar/utils/iconName.ts` - Added Kanban
- `src/components/layout/Sidebar/utils/iconMap.ts` - Added Kanban mapping
- `src/components/layout/Sidebar/sidebarNavData.ts` - Added kanban nav item
- `src/shared/testIds.ts` - Added kanban test IDs
- `src/localization/locales/en.json` - Added kanban i18n keys
