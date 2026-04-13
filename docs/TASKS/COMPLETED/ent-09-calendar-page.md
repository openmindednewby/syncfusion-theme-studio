# ENT-09: Calendar / Scheduler Page

## Status: COMPLETED
## Priority: Medium
## Agent: frontend-dev

## Problem Statement

Add a Calendar/Scheduler page using Syncfusion Schedule component with full CRUD backed by MockServer API.

## Implementation Plan

### Backend (MockServer)
1. CalendarEvent entity in Core
2. CalendarEventDto in UseCases/DTOs
3. CRUD Use Cases (List, Create, Update, Delete) in UseCases/CalendarEvents/
4. CRUD Endpoints in Web/CalendarEvents/
5. Add DbSet to MockDbContext
6. Seed 30+ calendar events
7. Add DtoMapper for CalendarEvent

### Frontend (SyncfusionThemeStudio)
1. Install @syncfusion/ej2-react-schedule
2. Create calendar feature: src/features/calendar/
3. CalendarPage with ScheduleView component
4. API integration via axios (manual hooks with React Query)
5. Route: /calendar
6. Sidebar nav entry with calendar icon
7. i18n keys in en.json
8. TestIds (NAV_CALENDAR, CALENDAR_PAGE)

## Files Created

### Backend
- MockServer.Core/Entities/CalendarEvent.cs
- MockServer.UseCases/DTOs/CalendarEventDto.cs
- MockServer.UseCases/CalendarEvents/List/ListCalendarEventsQuery.cs
- MockServer.UseCases/CalendarEvents/List/ListCalendarEventsHandler.cs
- MockServer.UseCases/CalendarEvents/Create/CreateCalendarEventCommand.cs
- MockServer.UseCases/CalendarEvents/Create/CreateCalendarEventHandler.cs
- MockServer.UseCases/CalendarEvents/Update/UpdateCalendarEventCommand.cs
- MockServer.UseCases/CalendarEvents/Update/UpdateCalendarEventHandler.cs
- MockServer.UseCases/CalendarEvents/Delete/DeleteCalendarEventCommand.cs
- MockServer.UseCases/CalendarEvents/Delete/DeleteCalendarEventHandler.cs
- MockServer.Web/CalendarEvents/List.cs
- MockServer.Web/CalendarEvents/Create.cs
- MockServer.Web/CalendarEvents/Update.cs
- MockServer.Web/CalendarEvents/Delete.cs

### Backend (Modified)
- MockServer.Infrastructure/Data/MockDbContext.cs - Added DbSet<CalendarEvent>
- MockServer.Infrastructure/Data/SeedData.cs - Added 32 seed events
- MockServer.UseCases/Mappers/DtoMapper.cs - Added ToDto mapper

### Frontend
- src/features/calendar/types.ts
- src/features/calendar/constants.ts
- src/features/calendar/pages/CalendarPage/index.tsx
- src/features/calendar/pages/CalendarPage/hooks/useCalendarEvents.ts
- src/features/calendar/pages/CalendarPage/components/ScheduleView.tsx

### Frontend (Modified)
- src/app/routes/routeSegment.ts - Added Calendar enum value
- src/app/routes/routePath.ts - Added Calendar path
- src/app/routes/routePrefix.ts - Added Calendar prefix
- src/app/routes/lazyPages.ts - Added lazy CalendarPage import
- src/app/router.tsx - Added calendar route
- src/components/layout/Sidebar/sidebarNavData.ts - Added calendar nav entry
- src/components/layout/Sidebar/utils/iconName.ts - Added Calendar icon name
- src/components/layout/Sidebar/utils/iconMap.ts - Added IconCalendar mapping
- src/shared/testIds.ts - Added NAV_CALENDAR, CALENDAR_PAGE
- src/localization/locales/en.json - Added calendar i18n keys
- src/styles/app.css - Added schedule CSS import
- package.json - Added @syncfusion/ej2-react-schedule dependency

## Verification Results

### ESLint
- Calendar feature files: 0 errors, 0 warnings
- All modified routing/nav/testId files: 0 errors

### TypeScript
- No TypeScript errors in any calendar files (tsc --noEmit grep calendar = clean)

### Build
- Frontend (Vite): Calendar code compiles cleanly. Pre-existing errors in editor/ and useGridExport.ts are unrelated.
- Backend (dotnet): Calendar endpoints build cleanly. Pre-existing errors in Auth/Login.cs (missing using directives) are unrelated.

## ESLint Patterns Used
- File-level `/* eslint-disable @typescript-eslint/consistent-type-assertions */` for ScheduleView (Syncfusion SDK interop)
- Destructuring `const { element } = args` to avoid `no-param-reassign` on Syncfusion event rendered callbacks
- Explicit boolean comparisons (`isLoading === true`) for `strict-boolean-expressions`
- Explicit `CalendarContentProps` interface (not `UseCalendarEventsReturn`) to avoid `no-unsafe-assignment` from spreading
- `Array<Record<string, unknown>>` syntax for complex array types

## Success Criteria
- [x] Calendar page renders with Syncfusion Schedule
- [x] All 5 views configured (Day, Week, Work Week, Month, Agenda)
- [x] CRUD: Create, edit, delete, drag-and-drop events via API
- [x] Events load from MockServer API with React Query
- [x] Color-coded by category with CATEGORY_COLORS mapping
- [x] Theme-aware (uses bg-surface, text-text-primary, border-border)
- [x] ESLint passes with 0 errors
- [x] TypeScript compiles with 0 calendar-related errors
