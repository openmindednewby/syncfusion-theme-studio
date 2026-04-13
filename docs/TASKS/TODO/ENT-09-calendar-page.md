# ENT-09: Calendar / Scheduler Page

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev + backend-dev

## Objective

Add a Calendar/Scheduler page using Syncfusion's Schedule component — one of the most requested features in enterprise admin templates. Events backed by MockServer API.

## Syncfusion Package

- `@syncfusion/ej2-react-schedule`

## Implementation Plan

### Backend (MockServer)

1. **Event entity**: `CalendarEvent` — Id, Title, Description, StartTime, EndTime, Location, IsAllDay, RecurrenceRule, Category (Meeting, Task, Reminder, Holiday), Color, CreatedBy
2. **CRUD endpoints**:
   - `GET /api/calendar/events` — list events (date range filter)
   - `POST /api/calendar/events` — create event
   - `PUT /api/calendar/events/{id}` — update event
   - `DELETE /api/calendar/events/{id}` — delete event
3. **Seed data**: 30+ events spread across current month — meetings, tasks, holidays, recurring standup

### Frontend

### 1. Page Structure

```
src/features/calendar/
├── pages/
│   └── CalendarPage/
│       ├── index.tsx
│       ├── components/
│       │   ├── ScheduleView.tsx        # Syncfusion Schedule wrapper
│       │   ├── EventDialog.tsx         # Custom event create/edit
│       │   ├── CalendarToolbar.tsx     # View switcher, date navigation
│       │   └── EventCategoryBadge.tsx
│       └── hooks/
│           └── useCalendarEvents.ts
├── types.ts
└── constants.ts
```

### 2. Schedule Features

- Views: Day, Week, Work Week, Month, Agenda
- Drag-and-drop event rescheduling
- Resize events to change duration
- Click to create new event
- Color-coded by category
- Recurring events support
- Theme-aware (dark/light)

### 3. Route + Navigation

- Add `/calendar` route
- Add "Calendar" to sidebar under a "Productivity" or "Apps" section

## Success Criteria

- [ ] Calendar page renders with Syncfusion Schedule
- [ ] All 5 views work (Day, Week, Work Week, Month, Agenda)
- [ ] CRUD: Create, edit, delete, drag-and-drop events
- [ ] Events load from MockServer API
- [ ] Recurring events display correctly
- [ ] Respects dark/light theme
